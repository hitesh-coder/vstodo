// import Vue from 'vue';
import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

// import SideBar from "./components/SideBar.vue"
// Vue.mixin({
//     data() {
//         return {
//             baseUri: '',
//         };
//     },
//     mounted() {
//         const dataUri = document.querySelector('input[data-uri]');
//         if (!dataUri) return;

//         this.baseUri = dataUri.getAttribute('data-uri');
//     },
// });

// createApp(SideBar).use(store).use(router).mount('#sidebar')
createApp(App).use(store).use(router).mount('#app')
