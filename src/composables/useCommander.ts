import defaultModules from '../modules';
import {useState} from "./useState";

const {modules, commands} = useState();

export function useCommander() {
    async function initialize() {
        commands.value = [];
        modules.value = [];
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
        try {
            for (let i = 0; i < commands.value.length; i++) {
                if (commands.value[i].prefix.toLowerCase().startsWith(input.toLowerCase())) {
                    results.push(commands.value[i]);
                }
            }
            return results;
        } catch (error) {
            console.error('Failed search', error);
            console.log(commands.value);
        }
    }

    function commandMatch(input: string) {
        const results: Command[] = [];
        for (let i = 0; i < commands.value.length; i++) {
            if (commands.value[i].prefix.toLowerCase() === input.toLowerCase()) {
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