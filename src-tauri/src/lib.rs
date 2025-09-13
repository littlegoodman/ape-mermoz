use tauri_plugin_sql::{ Migration, MigrationKind };

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let migrations = vec![
        Migration {
            version: 1,
            description: "create_teachers_table",
            sql: "CREATE TABLE teachers (id INTEGER PRIMARY KEY, name TEXT, phone TEXT);",
            kind: MigrationKind::Up,
        }
    ];

    tauri::Builder::default()
        .plugin(tauri_plugin_sql::Builder::default().add_migrations("sqlite:ape-mermoz.db", migrations).build())
        .plugin(tauri_plugin_opener::init())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
