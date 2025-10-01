use tauri_plugin_sql::{ Migration, MigrationKind };

pub fn get_seeds() -> Vec<Migration> {
    vec![
        Migration {
            version: 8,
            description: "seed_classes",
            sql: "INSERT INTO classes (name) VALUES \
            ('PS'), \
            ('PS MS A'), \
            ('PS MS B'), \
            ('MS'), \
            ('GS A'), \
            ('GS B'), \
            ('CP A'), \
            ('CP B'), \
            ('CP CE1'), \
            ('CE1'), \
            ('ULIS'), \
            ('CE2 A'), \
            ('CE2 B'), \
            ('CM1 A'), \
            ('CM1 B'), \
            ('CM2 B'), \
            ('CM2 A');",
            kind: MigrationKind::Up,
        },
       Migration {
            version: 9,
            description: "seed_teachers",
            sql: "INSERT INTO teachers (title, last_name, class_id) VALUES \
            ('Mme', 'Francescatto', 1), \
            ('Mme', 'Mathieu', 2), \
            ('Mme', 'Martias', 3), \
            ('Mme', 'Dubourg', 4), \
            ('Mme', 'Mariani', 5), \
            ('Mme', 'Boudigou', 6), \
            ('Mme', 'Rousseau', 7), \
            ('Mme', 'Eynaud', 8), \
            ('Mme', 'Petitjean', 9), \
            ('Mme', 'Barthélémy', 10), \
            ('Mme', 'Feuillerat', 11), \
            ('Mme', 'Camblanne', 12), \
            ('Mme', 'Durand', 13), \
            ('Mr', 'Resseguier', 14), \
            ('Mme', 'Sarrazin', 15), \
            ('Mr', 'Jourdan', 16), \
            ('Mme', 'Grand', 17);",
            kind: MigrationKind::Up,
        },
       Migration {
            version: 10,
            description: "seed_happenings",
            sql: "INSERT INTO happenings (id, name, date, description) VALUES \
            (1, 'Chocolats 2025', '2025-12-20', 'Chocolats de Noël 2025'); \
            ",
            kind: MigrationKind::Up,
        },
       Migration {
            version: 11,
            description: "insert_chocolate_articles",
            sql: "INSERT INTO articles (name, happening_id, description, price, preferential_price) VALUES \
            ('Le ballotin 250 g net', 1, '21 chocolats assortis - 21 recettes', 16.20, 11.45), \
            ('Le ballotin 500 g net', 1, '42 chocolats assortis - 25 recettes', 32.40, 22.80), \
            ('Le ballotin 1 kg net', 1, '84 chocolats assortis - 25 recettes', 64.80, 45.35), \
            ('Le ballotin 500 g net (au lait)', 1, '42 chocolats au lait - 12 recettes', 32.40, 22.80), \
            ('Le ballotin 500 g net (noirs)', 1, '42 chocolats noirs - 14 recettes', 32.40, 22.80), \
            ('Le ballotin 500 g net (blancs)', 1, '42 chocolats blancs - 8 recettes', 32.40, 22.80), \
            ('La boite Palets 250g net', 1, '24 palets assortis - 4 recettes', 21.90, 17.15), \
            ('La boite Rochers 250g net', 1, '24 rochers assortis - 4 recettes', 21.90, 17.15), \
            ('La boite Manons 240g net', 1, '16 Manons - 4 recettes', 16.20, 11.45), \
            ('La boite Truffes 350g net', 1, '30 truffes assorties - 4 recettes', 29.50, 21.25), \
            ('La boite Carrés 252 g net', 1, '56 carrés - 10 saveurs assorties', 29.50, 22.80), \
            ('La boite en métal Giandujas 260g net', 1, '28 giandujas aux deux noisettes - 4 recettes', 25.75, 20.50), \
            ('La boite bombes de chocolat chaud 200g net', 1, '4 bombes Père Noël - 2 recettes', 17.60, 14.60), \
            ('Le sachet de 8 ours en chocolat 96g net', 1, 'Chocolat au lait, praliné et sucre pétillant', 7.60, 6.20), \
            ('La boite \"Choco''pralinés\" 280g net', 1, '4 recettes assorties', 20.60, 15.60), \
            ('La boite sujets de Noël 245g net', 1, '19 sujets assortis au praliné - 7 recettes', 18.95, 14.40), \
            ('La boite ours en guimauve 375g net', 1, '40 ours en guimauve enrobés de chocolat au lait', 23.70, 18.35), \
            ('La boite ours en guimauve caramel 320 g net', 1, '20 ours en guimauve et cœur caramel enrobés de chocolat au lait', 23.70, 18.35), \
            ('La boule de Noël en métal 64g net', 1, 'garnie de Choco''pralinés et de carrés de chocolat au lait', 8.30, 6.55), \
            ('Le coffret métal 330g net', 1, '27 pralinés assortis -14 recettes', 38.50, 28.90), \
            ('La boite Gustaves 325g net', 1, '24 Gustaves assortis - 4 recettes', 26.00, 21.20), \
            ('La boite Juliettes 285g net', 1, '26 Juliettes assorties - 4 recettes', 26.75, 22.50), \
            ('Amandes et noisettes au chocolat 230 g net', 1, '3 saveurs assorties', 21.95, 17.30), \
            ('Les orangettes 260g net', 1, '', 22.20, 17.50), \
            ('Les pâtes de fruits 250g net', 1, '5 saveurs assorties', 16.25, 14.40), \
            ('Les marrons glacés en morceaux 250g net', 1, '', 19.25, 16.90), \
            ('Le sac (24 x 28 x 11 cm)', 1, '', 0.46, 0.46);",
            kind: MigrationKind::Up,
        },
    ]
}
