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

// fn extract_icon_from_exe(exe_path: &str) -> Option<HICON> {
//     let mut icon_handle: HICON = ptr::null_mut();
//     let result = unsafe {
//         ExtractIconExW(
//             exe_path.encode_utf16().collect::<Vec<_>>().as_ptr(),
//             0,
//             &mut icon_handle as *mut HICON,
//             ptr::null_mut(),
//             1,
//         )
//     };
//     if result > 0 {
//         Some(icon_handle)
//     } else {
//         None
//     }
// }

// fn icon_to_base64(icon_handle: HICON) -> Option<String> {
//     let mut bitmap_info = BITMAPINFO {
//         bmiHeader: BITMAPINFOHEADER {
//             biSize: std::mem::size_of::<BITMAPINFOHEADER>() as u32,
//             biWidth: 0,
//             biHeight: 0,
//             biPlanes: 1,
//             biBitCount: 32,
//             biCompression: 0,
//             biSizeImage: 0,
//             biXPelsPerMeter: 0,
//             biYPelsPerMeter: 0,
//             biClrUsed: 0,
//             biClrImportant: 0,
//         },
//         bmiColors: [0; 256],
//     };
//
//     let mut icon_info = ICONINFO {
//         fIcon: 0,
//         xHotspot: 0,
//         yHotspot: 0,
//         hbmMask: ptr::null_mut(),
//         hbmColor: ptr::null_mut(),
//     };
//
//     if unsafe { GetIconInfo(icon_handle, &mut icon_info) } != 0 {
//         if let Some(hbmp) = icon_info.hbmColor {
//             let mut bitmap: BITMAP = BITMAP::default();
//             if unsafe {
//                 winapi::um::wingdi::GetObjectW(
//                     hbmp as _,
//                     std::mem::size_of::<BITMAP>() as c_int,
//                     &mut bitmap as *mut BITMAP as *mut _,
//                 )
//             } > 0
//             {
//                 bitmap_info.bmiHeader.biWidth = bitmap.bmWidth;
//                 bitmap_info.bmiHeader.biHeight = -(bitmap.bmHeight as i32);
//                 let mut icon_bytes = Vec::new();
//                 icon_bytes.resize(bitmap.bmWidth as usize * bitmap.bmHeight as usize * 4, 0);
//                 let result = unsafe {
//                     GetDIBits(
//                         winapi::um::winuser::GetDC(ptr::null_mut()),
//                         hbmp as _,
//                         0,
//                         bitmap.bmHeight as u32,
//                         icon_bytes.as_mut_ptr() as *mut _,
//                         &mut bitmap_info as *mut _,
//                         DIB_RGB_COLORS,
//                     )
//                 };
//                 if result > 0 {
//                     let encoded = base64::engine::Engine::encode(&icon_bytes, STANDARD_NO_PAD);
//                     return Some(encoded);
//                 }
//             }
//         }
//         unsafe {
//             winapi::um::wingdi::DeleteObject(icon_info.hbmColor as _);
//         }
//         unsafe {
//             winapi::um::wingdi::DeleteObject(icon_info.hbmMask as _);
//         }
//     }
//
//     None
// }
