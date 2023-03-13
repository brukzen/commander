import {ref} from "vue";

const state = ref({
    overlayOpen: false,
})

export function useState() {
    return {
        state,
    }
}