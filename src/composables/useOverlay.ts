import {useState} from "./useState";
import {useShortcuts} from "./useShortcuts";
import { appWindow } from '@tauri-apps/api/window';



const { state } = useState();
const {registerShortcut } = useShortcuts();

export function useOverlay() {

    async function initialize() {
        await registerShortcut("esc", hide);
        await registerShortcut("CommandOrControl+Space", show);
    }

    async function show() {
        if (state.value.overlayOpen) {
            await hide();
        }

        await appWindow.show();
        await appWindow.center();
        await appWindow.setFocus();
        state.value.overlayOpen = true;
    }

    async function hide() {
        if (!state.value.overlayOpen) {
            return;
        }

        await appWindow.hide();
        state.value.overlayOpen = false;
    }

    return {
        initialize,
        show,
        hide,
    }
}