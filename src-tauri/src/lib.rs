mod platform;

use platform::db::migrations::get_migrations;
use platform::db::seeds::get_seeds;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let migrations = get_migrations().into_iter().chain(get_seeds().into_iter()).collect();

    tauri::Builder::default()
        .plugin(tauri_plugin_sql::Builder::default().add_migrations("sqlite:ape-mermoz.db", migrations).build())
        .plugin(tauri_plugin_opener::init())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
