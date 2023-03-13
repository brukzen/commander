import {ref} from "vue";

const state = ref<State>({
    overlayOpen: false
});

const modules = ref<Module[]>([]);
const commands = ref<Command[]>([]);

export function useState() {
    return {
        state,
        modules,
        commands,
    }
}