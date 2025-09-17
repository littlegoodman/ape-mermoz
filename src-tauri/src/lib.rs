mod platform;

use platform::db_migrations::get_migrations;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let migrations = get_migrations();

    tauri::Builder::default()
        .plugin(tauri_plugin_sql::Builder::default().add_migrations("sqlite:ape-mermoz.db", migrations).build())
        .plugin(tauri_plugin_opener::init())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
