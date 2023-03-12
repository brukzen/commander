// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{Manager, UserAttentionType};

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            let commander = app.get_window("commander").expect("Commander window not found");
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![init_search])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn init_search() {
    println!("Initializing search");
}

