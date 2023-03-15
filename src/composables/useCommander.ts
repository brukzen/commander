import defaultModules from '../modules';
import {useState} from "./useState";

const {modules, commandManager} = useState();


export function useCommander() {
    async function initialize() {
        modules.value = [];
        for (const moduleClass of defaultModules) {
            const module = new moduleClass(commandManager);
            modules.value.push(module);
            console.log("Registered module " + moduleClass.name);
        }

        for (const module of modules.value) {
            await module.onInitialize(commandManager);
        }
    }

    return {
        initialize,
        commandManager,
    }
}