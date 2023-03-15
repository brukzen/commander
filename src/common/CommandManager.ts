export class CommandManager implements ICommandManager {
    private readonly commands: Array<ICommand>;

    constructor() {
        this.commands = new Array<ICommand>();
    }

    registerCommand(command: ICommand) {
        this.commands.push(command);
    }

    prefixMatch(input: string) {
        const results = [];
        for (let i = 0; i < this.commands.length; i++) {
            if (this.commands[i].prefix.toLowerCase().startsWith(input.toLowerCase())) {
                results.push(this.commands[i]);
            }
        }
        return results;
    }

    commandMatch(input: string) {
        const results: ICommand[] = [];
        for (let i = 0; i < this.commands.length; i++) {
            if (this.commands[i].prefix.toLowerCase() === input.toLowerCase()) {
                results.push(this.commands[i]);
                return results;
            }
        }
        return results;
    }

    suggestCommands(input: string) {
        let results: ICommand[] = [];
        results = results.concat(this.commandMatch(input));
        if (results.length === 0) {
            results = this.prefixMatch(input);
        }
        return results;
    }
}