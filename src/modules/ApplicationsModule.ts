import {invoke} from "@tauri-apps/api/tauri";
import {Command} from "@tauri-apps/api/shell";
import {ApplicationResponse} from "@bindings/ApplicationResponse";

export default class ApplicationsModule implements CommanderModule {
    private applications: Array<ApplicationResponse> = [];

    async onInitialize(commandManager: ICommandManager) {
        this.applications = await invoke('get_installed_apps');
        for (const app of this.applications) {
            const cmd: ICommand = {
                executor: () => this.openApplication(app),
                icon: app.icon,
                prefix: app.display_name,
            }
            commandManager.registerCommand(cmd);
        }
    }

    async openApplication(application: ApplicationResponse) {
        console.log('[Application] Opening', application.path)
        await new Command(`explorer`, [`file://${application.path}`]).execute();
    }
}