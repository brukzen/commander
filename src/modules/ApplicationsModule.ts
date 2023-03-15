import {invoke} from "@tauri-apps/api/tauri";
import {Command} from "@tauri-apps/api/shell";

export default class ApplicationsModule implements CommanderModule {
    private applications = [];

    async onInitialize(commandManager: ICommandManager) {
        this.applications = await invoke('get_installed_apps');
        for (const app of this.applications) {
            const cmd: ICommand = {
                executor: () => this.openApplication(app),
                icon: "",
                prefix: app[0],
            }
            commandManager.registerCommand(cmd);
        }
    }

    async openApplication(application: any) {
        console.log('[Application] Opening', application[1])
        await new Command(`explorer`, [`file://${application[1]}`]).execute();
    }
}