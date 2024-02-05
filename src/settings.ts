import { workspace } from "vscode";

export class Settings {
    private static getConfig<T>(key: string, defaultValue: T): T {
        const config = workspace.getConfiguration("HeaderFilesRefactor");
        return config.get<T>(key, defaultValue);
    }

    public static get excludeDirs(): string[] {
        return this.getConfig<string[]>("excludeDirs", []);
    }

    public static get removeFolderFromPath(): string[] {
        return this.getConfig<string[]>("removeFolderFromPath", []);
    }
}