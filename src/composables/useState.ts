import {ref} from "vue";
import {CommandManager} from "../common/CommandManager";

const state = ref<State>({
    overlayOpen: false
});

const modules = ref<CommanderModule[]>([]);
const commandManager = new CommandManager();

export function useState() {
    return {
        state,
        modules,
        commandManager,
    }
}