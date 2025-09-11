// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
struct Contact {
    name: String,
    phone: String,
}

#[tauri::command]
fn find_chocolate_commands() -> Vec<Contact> {
    vec![
        Contact {
            name: "John Doe".to_string(),
            phone: "06 11 22 33 44".to_string(),
        },
        Contact {
            name: "Jane Doe".to_string(),
            phone: "06 11 22 33 44".to_string(),
        },
    ]
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_sql::Builder::new().build())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![find_chocolate_commands])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
