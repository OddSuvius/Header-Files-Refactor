import * as vscode from 'vscode';
import { Refactorer } from './refactorer';

export function activate(context: vscode.ExtensionContext) {
	console.log('"header-refactor" is now active!');

	let disposable = vscode.workspace.onDidRenameFiles((ev: vscode.FileRenameEvent) => {
		const refactorer = new Refactorer();
		refactorer.refactor(ev.files).catch(err => console.error(err));
	});

	context.subscriptions.push(disposable);
}

export function deactivate() { }
