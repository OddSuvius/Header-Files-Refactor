import * as path from 'path';
import * as vscode from 'vscode';
import { Settings } from "./settings";

export class Refactorer {
    private static readonly headerFileExtRegex = /\.(hpp|h|hxx)$/i;

    public async refactor(renamedFiles: ReadonlyArray<{ readonly oldUri: vscode.Uri, readonly newUri: vscode.Uri }>): Promise<void> {
        for (const file of renamedFiles) {
            if (Refactorer.headerFileExtRegex.test(file.oldUri.path)) {
                // Find and update references in C/C++ source files
                await this.updateReferencingFiles(file);
            }
        }
    }

    private async updateReferencingFiles(file: { oldUri: vscode.Uri, newUri: vscode.Uri }): Promise<void> {
        const pattern = '**/*.{c,cpp}';
        const files = await vscode.workspace.findFiles(pattern);
        const workspaceEdit = new vscode.WorkspaceEdit();

        for (const filePath of files) {
            const document = await vscode.workspace.openTextDocument(filePath);
            const text = document.getText();
            const oldBaseName = path.basename(file.oldUri.path);
            const regex = new RegExp(`#include\\s+["<].*?${oldBaseName}[">]`, 'g');

            let match;
            while ((match = regex.exec(text)) !== null) {
                let newPath = path.relative(path.dirname(document.uri.fsPath), file.newUri.fsPath).replace(/\\/g, '/');
                Settings.removeFolderFromPath.forEach(removeFolder => {
                    const pattern = new RegExp(`^(\\.\\.\\/)+${removeFolder}\\/`);
                    if (newPath.match(pattern)) {
                        // Extract the relative traversal part (e.g., "../../")
                        const traversalMatch = newPath.match(/^(\.+\/)+/);
                        if (traversalMatch) {
                            const traversalPart = traversalMatch[0];
                            // Count the number of "../" segments to determine the depth
                            const depth = traversalPart.match(/\.\.\//g)?.length || 0;
                            // Construct a regex to remove the specified folder based on the calculated depth
                            const depthAdjustedPattern = new RegExp(`(\\.\\.\\/){${depth}}${removeFolder}\\/`);
                            newPath = newPath.replace(depthAdjustedPattern, '');
                        }
                    }
                });


                const newIncludeStatement = `#include "${newPath}"`;

                const startPos = document.positionAt(match.index);
                const endPos = document.positionAt(match.index + match[0].length);
                workspaceEdit.replace(document.uri, new vscode.Range(startPos, endPos), newIncludeStatement);
            }
        }

        // DEBUG
        if (!await vscode.workspace.applyEdit(workspaceEdit)) {
            // vscode.window.showErrorMessage('Failed to refactor.');
        } else {
            // vscode.window.showInformationMessage('Refactoring completed successfully.');
        }
    }

}