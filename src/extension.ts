// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { HelloWorldPanel } from './HelloWorldPanel';
import { SidebarProvider } from './SidebarProvider';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "vstodo" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	context.subscriptions.push(
		vscode.commands.registerCommand('vstodo.helloWorld', () => {
			// The code you place here will be executed every time your command is executed
			// Display a message box to the user
			// vscode.window.showInformationMessage('Hello from VSTodo!');
			HelloWorldPanel.createOrShow(context.extensionUri);
		})
	);

	// vscode.window.showInformationMessage("you are in extension")
	const sidebarProvider = new SidebarProvider(context.extensionUri);
	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider(
			"vstodo-sidebar",
			sidebarProvider
		)
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('vstodo.refresh', () => {
			HelloWorldPanel.kill();
			HelloWorldPanel.createOrShow(context.extensionUri);
		}));

	context.subscriptions.push(
		vscode.commands.registerCommand("vstodo.askQuestion", async () => {
			const ans = await vscode.window.showInformationMessage("how was your day?", "good", "bad");

			if (ans === "bad") {
				vscode.window.showInformationMessage("Sorry to head that");
			} else {
				vscode.window.showInformationMessage("good to go");
				console.log({ ans });
			}
		}))
}

// this method is called when your extension is deactivated
export function deactivate() { }
