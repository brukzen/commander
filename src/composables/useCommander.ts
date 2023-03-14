import defaultModules from '../modules';
import {useState} from "./useState";

const {modules, commands} = useState();

export function useCommander() {
    async function initialize() {
        for (const mod of defaultModules) {
            console.log("Registered module " + mod.name)
            modules.value.push(new mod({registerCommand}));
        }
    }

    function registerCommand(executor: Function, options: { prefix: string }) {
        commands.value.push({
            prefix: options.prefix,
            executor,
        });
    }

    function prefixMatch(input: string) {
        const results = [];
        for (let i = 0; i < commands.value.length; i++) {
            if (commands.value[i].prefix.startsWith(input)) {
                results.push(commands.value[i]);
            }
        }
        return results;
    }

    function commandMatch(input: string) {
        const results: Command[] = [];
        for (let i = 0; i < commands.value.length; i++) {
            if (commands.value[i].prefix === input) {
                results.push(commands.value[i]);
                return results;
            }
        }
        return results;
    }

    function suggestCommands(input: string) {
        let results: Command[] = [];
        results = results.concat(commandMatch(input));
        if (results.length === 0) {
            results = prefixMatch(input);
        }
        return results;
    }


    return {
        initialize,
        suggestCommands,
    }
}