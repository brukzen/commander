import defaultModules from '../modules';
import {useState} from "./useState";

const {modules, commands} = useState();
let initialized = false;

export async function useCommander() {
    async function initialize() {
        modules.value.push(defaultModules);
    }

    if (!initialized) {
        await initialize();
    }
}