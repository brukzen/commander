import {ref} from "vue";

const state = ref<State>({
    overlayOpen: false
});

const modules = ref<CommanderModule[]>([]);

export function useState() {
    return {
        state,
        modules,
    }
}