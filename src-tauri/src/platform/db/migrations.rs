use tauri_plugin_sql::{ Migration, MigrationKind };

pub fn get_migrations() -> Vec<Migration> {
    vec![
        Migration {
            version: 1,
            description: "create_classes_table",
            sql: "CREATE TABLE classes ( \
                id INTEGER PRIMARY KEY, \
                name TEXT NOT NULL, \
                UNIQUE (name) \
            );",
            kind: MigrationKind::Up,
        },
        Migration {
            version: 2,
            description: "create_teachers_table",
            sql: "CREATE TABLE teachers ( \
                id INTEGER PRIMARY KEY, \
                title TEXT NOT NULL, \
                last_name TEXT NOT NULL, \
                class_id INTEGER NOT NULL REFERENCES classes(id) \
            );",
            kind: MigrationKind::Up,
        },
        Migration {
            version: 3,
            description: "create_students_table",
            sql: "CREATE TABLE students ( \
                id INTEGER PRIMARY KEY, \
                last_name TEXT NOT NULL, \
                first_name TEXT NOT NULL, \
                class_id INTEGER NOT NULL REFERENCES classes(id) \
            );",
            kind: MigrationKind::Up,
        },
        Migration {
            version: 4,
            description: "create_happenings_table",
            sql: "CREATE TABLE happenings ( \
                id INTEGER PRIMARY KEY, \
                name TEXT NOT NULL, \
                date TEXT NOT NULL, \
                description TEXT NOT NULL \
            );",
            kind: MigrationKind::Up,
        },
        Migration {
            version: 5,
            description: "create_articles_table",
            sql: "CREATE TABLE articles ( \
                id INTEGER PRIMARY KEY, \
                happening_id INTEGER NOT NULL REFERENCES happenings(id), \
                name TEXT NOT NULL, \
                description TEXT NOT NULL, \
                price REAL NOT NULL, \
                preferential_price REAL NOT NULL, \
                image_link TEXT \
            );",
            kind: MigrationKind::Up,
        },
        Migration { // tel - email - mode de paiement
            version: 6,
            description: "create_commands_table",
            sql: "CREATE TABLE commands ( \
                id INTEGER PRIMARY KEY, \
                happening_id INTEGER NOT NULL REFERENCES happenings(id), \
                student_id INTEGER NOT NULL REFERENCES students(id), \
                parent TEXT NOT NULL, \
                phone TEXT, \
                email TEXT, \
                payment_method TEXT, \
                screenshot TEXT \
            );",
            kind: MigrationKind::Up,
        },
        Migration {
            version: 7,
            description: "create_commands_articles_table",
            sql: "CREATE TABLE commands_articles ( \
                command_id INTEGER NOT NULL REFERENCES commands(id), \
                article_id INTEGER NOT NULL REFERENCES articles(id), \
                quantity INTEGER NOT NULL, \
                PRIMARY KEY (command_id, article_id) \
            );",
            kind: MigrationKind::Up,
        },
        // seeds...
    ]
}
