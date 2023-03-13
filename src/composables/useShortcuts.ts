import {isRegistered, register, ShortcutHandler, unregister} from "@tauri-apps/api/globalShortcut";

export function useShortcuts() {
    async function registerShortcut(hotkey: string, callback: ShortcutHandler) {
        if (await isRegistered(hotkey)) {
            await unregister(hotkey);
        }

        await register(hotkey, callback);
    }

    return {
        registerShortcut,
    }
}