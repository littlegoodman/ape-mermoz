mod platform;

use platform::db::migrations::get_migrations;
use platform::db::seeds::get_seeds;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let mut migrations: Vec<_> = get_migrations().into_iter().chain(get_seeds().into_iter()).collect();
    migrations.sort_by_key(|m| m.version);

    tauri::Builder::default()
        .plugin(tauri_plugin_sql::Builder::default().add_migrations("sqlite:ape-mermoz.db", migrations).build())
        .plugin(tauri_plugin_opener::init())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
