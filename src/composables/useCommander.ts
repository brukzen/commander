import defaultModules from '../modules';
import {useState} from "./useState";

const {modules, commandManager} = useState();


export function useCommander() {
    async function initialize() {
        modules.value = [];
        for (const mod of defaultModules) {
            console.log("Registered module " + mod.name)
            modules.value.push(new mod(commandManager.value));
        }
    }

    return {
        initialize,
        commandManager,
    }
}