import {invoke} from "@tauri-apps/api/tauri";
import {shell} from "@tauri-apps/api";
import {Command} from "@tauri-apps/api/shell";

export default class Applications implements Module {
    name = 'Applications';
    private applications = [];

    constructor(commander: any) {
        this.registerCommands(commander).then(r => console.log(`[Application] Registered commands for ${this.applications.length} applications`));
    }

    async registerCommands(commander: any) {
        this.applications = await invoke('get_installed_apps');

        for (const app of this.applications) {
            commander.registerCommand(() => this.openApplication(app), {prefix: app[0]});
        }
    }

    async openApplication(application: any) {
        console.log('[Application] Opening', application[1])
        const output = await new Command(`explorer`, [`file://${application[1]}`]).execute();
        console.log(output);
    }
}