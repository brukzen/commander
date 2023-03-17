#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod ipc;
mod windows;

use crate::windows::application::get_installed_apps;
use tauri::Manager;

fn main() {
    get_installed_apps();

    tauri::Builder::default()
        .setup(|app| {
            let commander = app
                .get_window("commander")
                .expect("Commander window not found");

            #[cfg(debug_assertions)] // only include this code on debug builds
            {
                commander.open_devtools();
            }

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![init_search, get_installed_apps])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn init_search() {
    println!("Initializing search");
}
