use tauri_plugin_sql::{Builder, Migration, MigrationKind};
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
    let migrations = vec![
        // Define your migrations here
        Migration {
            version: 1,
            description: "create_initial_tables",
            sql: "CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT);",
            kind: MigrationKind::Up,
        }
    ];

    tauri::Builder::default()
        .plugin(tauri_plugin_sql::Builder::default().add_migrations("sqlite:ape-mermoz.db", migrations).build())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![find_chocolate_commands])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
