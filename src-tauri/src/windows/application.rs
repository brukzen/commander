use crate::ipc::ApplicationResponse;
use crate::windows::icons::get_icon;
use base64::engine::general_purpose::STANDARD_NO_PAD;
use base64::Engine;
use std::env;
use std::fs;
use std::ops::Add;
use std::path::Path;

#[tauri::command]
pub fn get_installed_apps() -> Vec<ApplicationResponse> {
    let mut apps = Vec::new();
    let home_dir = env::var("USERPROFILE").unwrap_or_else(|_| ".".to_string());
    let program_dir = env::var("ProgramData").expect("Environment variable Program Data not found");
    let desktop_dir = Path::new(&home_dir).join("Desktop");
    let start_menu_dir = Path::new(&home_dir)
        .join("AppData")
        .join("Roaming")
        .join("Microsoft")
        .join("windows")
        .join("Start Menu")
        .join("Programs");
    let common_start_menu_dir = Path::new(&program_dir)
        .join("Microsoft")
        .join("windows")
        .join("Start Menu")
        .join("Programs");

    let dirs_to_search = vec![desktop_dir, start_menu_dir, common_start_menu_dir];

    for dir in dirs_to_search {
        apps.extend(get_installed_apps_recursive(&dir));
    }

    apps
}

fn get_installed_apps_recursive(dir: &Path) -> Vec<ApplicationResponse> {
    let mut apps = Vec::new();

    if let Ok(entries) = fs::read_dir(dir) {
        for entry in entries {
            if let Ok(entry) = entry {
                let path = entry.path();
                if path.is_file() {
                    let ext = path.extension().and_then(|e| e.to_str());
                    if ext == Some("exe") || ext == Some("lnk") {
                        if let Some(name) = path.file_stem().and_then(|n| n.to_str()) {
                            let icon = get_icon(path.to_str().unwrap(), 32).ok().unwrap();
                            let base64icon = STANDARD_NO_PAD.encode(&icon);
                            apps.push(ApplicationResponse {
                                display_name: name.to_string(),
                                icon: "data:image/png;base64, "
                                    .to_string()
                                    .add(&*base64icon.to_string()),
                                path,
                            });
                        }
                    }
                } else if path.is_dir() {
                    apps.extend(get_installed_apps_recursive(&path));
                }
            }
        }
    }

    apps
}
