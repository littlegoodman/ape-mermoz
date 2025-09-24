use tauri_plugin_sql::{ Migration, MigrationKind };

pub fn get_migrations() -> Vec<Migration> {
    vec![
        Migration {
            version: 1,
            description: "create_teachers_table",
            sql: "CREATE TABLE teachers ( \
                id INTEGER PRIMARY KEY, \
                last_name TEXT NOT NULL, \
                first_name TEXT NOT NULL, \
                class TEXT NOT NULL \
            );",
            kind: MigrationKind::Up,
        },
        Migration {
            version: 2,
            description: "create_students_table",
            sql: "CREATE TABLE students ( \
                id INTEGER PRIMARY KEY, \
                last_name TEXT NOT NULL, \
                first_name TEXT NOT NULL, \
                class TEXT NOT NULL \
            );",
            kind: MigrationKind::Up,
        },
        Migration {
            version: 3,
            description: "create_articles_table",
            sql: "CREATE TABLE articles ( \
                id INTEGER PRIMARY KEY, \
                name TEXT NOT NULL, \
                description TEXT NOT NULL, \
                price REAL NOT NULL, \
                preferential_price REAL NOT NULL \
            );",
            kind: MigrationKind::Up,
        },
        Migration {
            version: 4,
            description: "insert_chocolate_articles",
            sql: "INSERT INTO articles (name, description, price, preferential_price) VALUES \
            ('Le ballotin 250 g net', '21 chocolats assortis - 21 recettes', 16.20, 11.45), \
            ('Le ballotin 500 g net', '42 chocolats assortis - 25 recettes', 32.40, 22.80), \
            ('Le ballotin 1 kg net', '84 chocolats assortis - 25 recettes', 64.80, 45.35), \
            ('Le ballotin 500 g net (au lait)', '42 chocolats au lait - 12 recettes', 32.40, 22.80), \
            ('Le ballotin 500 g net (noirs)', '42 chocolats noirs - 14 recettes', 32.40, 22.80), \
            ('Le ballotin 500 g net (blancs)', '42 chocolats blancs - 8 recettes', 32.40, 22.80), \
            ('Le sac (24 x 28 x 11 cm)', '', 0.46, 0.46), \
            ('La boite Truffes 350g net', '30 truffes assorties - 4 recettes', 29.50, 21.25), \
            ('La boite Manons 240g net', '16 Manons - 4 recettes', 16.20, 11.45), \
            ('La boite en métal Giandujas 260g net', '28 giandujas aux deux noisettes - 4 recettes', 25.75, 20.50), \
            ('Le coffret métal 330g net', '27 pralinés assortis -14 recettes', 38.50, 28.90), \
            ('La boite \"Choco''pralinés\" 280g net', '4 recettes assorties', 20.60, 15.60), \
            ('La boite sujets de Noël 245g net', '19 sujets assortis au praliné - 7 recettes', 18.95, 14.40), \
            ('La boule de Noël en métal 64g net', 'garnie de Choco''pralinés et de carrés de chocolat au lait', 8.30, 6.55), \
            ('La boite ours en guimauve 375g net', '40 ours en guimauve enrobés de chocolat au lait', 23.70, 18.35), \
            ('La boite ours en guimauve caramel 320 g net', '20 ours en guimauve et cœur caramel enrobés de chocolat au lait', 23.70, 18.35), \
            ('La boite bombes de chocolat chaud 200g net', '4 bombes Père Noël - 2 recettes', 17.60, 14.60), \
            ('Le sachet de 8 ours en chocolat 96g net', 'Chocolat au lait, praliné et sucre pétillant', 7.60, 6.20), \
            ('La boite Juliettes 285g net', '26 Juliettes assorties - 4 recettes', 26.75, 22.50), \
            ('Amandes et noisettes au chocolat 230 g net', '3 saveurs assorties', 21.95, 17.30), \
            ('La boite Gustaves 325g net', '24 Gustaves assortis - 4 recettes', 26.00, 21.20), \
            ('Les marrons glacés en morceaux 250g net', '', 19.25, 16.90), \
            ('Les orangettes 260g net', '', 22.20, 17.50), \
            ('Les pâtes de fruits 250g net', '5 saveurs assorties', 16.25, 14.40), \
            ('La boite Palets 250g net', '24 palets assortis - 4 recettes', 21.90, 17.15), \
            ('La boite Rochers 250g net', '24 rochers assortis - 4 recettes', 21.90, 17.15);",
            kind: MigrationKind::Up,
        },
        Migration {
            version: 5,
            description: "create_commands_table",
            sql: "CREATE TABLE commands ( \
                id INTEGER PRIMARY KEY, \
                parent TEXT, \
                student_id INTEGER NOT NULL REFERENCES students(id) \
            );",
            kind: MigrationKind::Up,
        },
       Migration {
            version: 6,
            description: "create_commands_articles_table",
            sql: "CREATE TABLE commands_articles ( \
                command_id INTEGER NOT NULL REFERENCES commands(id), \
                article_id INTEGER NOT NULL REFERENCES articles(id), \
                quantity INTEGER NOT NULL, \
                PRIMARY KEY (command_id, article_id)\
            );",
            kind: MigrationKind::Up,
        },
        Migration {
            version: 7,
            description: "add_not_null_constraint_to_parent",
            sql: "ALTER TABLE commands ALTER COLUMN parent TEXT NOT NULL;",
            kind: MigrationKind::Up,
        },
        Migration {
            version: 8,
            description: "add_unique_constraint_to_commands",
            sql: "ALTER TABLE commands ADD UNIQUE (parent, student_id);",
            kind: MigrationKind::Up,
        },
    ]
}
