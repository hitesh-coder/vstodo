import path from "path";
import fs from "fs";

import alias from '@rollup/plugin-alias';
import commonjs from 'rollup-plugin-commonjs';
import esbuild from 'rollup-plugin-esbuild';
import filesize from 'rollup-plugin-filesize';
import image from '@rollup/plugin-image';
import json from '@rollup/plugin-json';
import postcss from 'rollup-plugin-postcss';
import postcssImport from 'postcss-import';
import replace from '@rollup/plugin-replace';
import resolve from '@rollup/plugin-node-resolve';
import requireContext from 'rollup-plugin-require-context';
import { terser } from 'rollup-plugin-terser';
import vue from 'rollup-plugin-vue';

const production = !process.env.ROLLUP_WATCH;

const postCssPlugins = [
    postcssImport(),
];

// console.log("in rollup")
export default fs
    .readdirSync(path.join(__dirname,"src", "views"))
    .map((input) => {
        const name = input.split(".")[ 0 ].toLowerCase();
        return {
            input: `src/views/${input}`,
            output: {
                file: `../dist-web/js/${name}.js`,
                format: 'iife',
                name: 'app',
                sourcemap: false,
            },
            plugins: [
                vue({
                    css: false
                }),
                commonjs(),
                json(),
                alias({
                    entries: [ {
                        find: '@',
                        replacement: __dirname + '/web/'
                    } ],
                }),
                image(),
                postcss({
                    extract: `${name}.css`,
                    plugins: postCssPlugins
                }),
                requireContext(),
                resolve({
                    jsnext: true,
                    main: true,
                    browser: true,
                    dedupe: [ "vue" ],
                }),
                replace({
                    'process.env.NODE_ENV': production ?
                        '"production"' : '"development"',
                    preventAssignment: true,
                }),
                esbuild({
                    minify: production,
                    target: 'es2015',
                }),
                production && terser(),
                production && filesize(),
            ],
            watch: {
                clearScreen: false,
                exclude: [ 'node_modules/**' ],
            },
        };
    });
