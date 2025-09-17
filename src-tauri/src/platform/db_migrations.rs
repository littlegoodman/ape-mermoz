use tauri_plugin_sql::{ Migration, MigrationKind };

pub fn get_migrations() -> Vec<Migration> {
    vec![
        Migration {
            version: 1,
            description: "create_teachers_table",
            sql: "CREATE TABLE teachers (id INTEGER PRIMARY KEY, name TEXT, phone TEXT);",
            kind: MigrationKind::Up,
        },
        Migration {
            version: 2,
            description: "add_class_to_teachers_table",
            sql: "ALTER TABLE teachers ADD COLUMN class TEXT NOT NULL DEFAULT '';",
            kind: MigrationKind::Up,
        },
        Migration {
            version: 3,
            description: "add_lastName_and_firstName_to_teachers_table",
            sql: "ALTER TABLE teachers ADD COLUMN lastName TEXT NOT NULL DEFAULT ''; ALTER TABLE teachers ADD COLUMN firstName TEXT NOT NULL DEFAULT '';",
            kind: MigrationKind::Up,
        },
        Migration {
            version: 4,
            description: "remove_phone_from_teachers_table",
            sql: "ALTER TABLE teachers DROP COLUMN phone;",
            kind: MigrationKind::Up,
        },
        Migration {
            version: 5,
            description: "remove_name_from_teachers_table",
            sql: "ALTER TABLE teachers DROP COLUMN name;",
            kind: MigrationKind::Up,
        },
        Migration {
            version: 6,
            description: "create_students_table",
            sql: "CREATE TABLE students (id INTEGER PRIMARY KEY, firstName TEXT NOT NULL, lastName TEXT NOT NULL, class TEXT NOT NULL);",
            kind: MigrationKind::Up,
        }
    ]
}
