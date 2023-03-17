import {useState} from "./useState";
import {useShortcuts} from "./useShortcuts";
import { appWindow } from '@tauri-apps/api/window';
import {useObserver} from "./useObserver";



const { state } = useState();
const {registerShortcut } = useShortcuts();
const onShow = useObserver();
export function useOverlay() {

    async function initialize() {
        await registerShortcut("CommandOrControl+Backquote", show);
    }

    async function show() {
        if (state.value.overlayOpen) {
            await hide();
            return;
        }

        await appWindow.show();
        await appWindow.center();
        await appWindow.setFocus();
        state.value.overlayOpen = true;
        onShow.notify();
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
        onShow,
    }
}