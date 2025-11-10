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
            ('M', 'Resseguier', 14), \
            ('Mme', 'Sarrazin', 15), \
            ('M', 'Jourdan', 16), \
            ('Mme', 'Grand', 17);",
            kind: MigrationKind::Up,
        },
       Migration {
            version: 10,
            description: "seed_ps_students",
            sql: "INSERT INTO students (id, last_name, first_name, class_id) VALUES \
            (1, 'Affar', 'Rahim', 1), \
            (2, 'Akhsale', 'Emna', 1), \
            (3, 'Akrich', 'Adam', 1), \
            (4, 'Alamele', 'Rose', 1), \
            (5, 'Djemani', 'Malia', 1), \
            (6, 'Doisne', 'Augustin', 1), \
            (7, 'Fersi', 'Tasnim', 1), \
            (8, 'Guidi', 'Alba', 1), \
            (9, 'Lacroix', 'Loni', 1), \
            (10, 'Le Bideau', 'Ethann', 1), \
            (11, 'Mezieres', 'Ambre', 1), \
            (12, 'Mulero', 'Zack', 1), \
            (13, 'Reymond', 'Eden', 1), \
            (14, 'Salmeri', 'Loucas', 1), \
            (15, 'Savreux', 'Lewis', 1), \
            (16, 'Sebbar', 'Eden', 1), \
            (17, 'Serrano Soler', 'Selena', 1), \
            (18, 'Sonmez', 'Muhammet', 1), \
            (19, 'Stives Jouclard', 'Charles', 1), \
            (20, 'Talbi', 'Sarah', 1), \
            (21, 'Touhami', 'Elio', 1), \
            (22, 'Vitry', 'Agathe', 1), \
            (23, 'Zonco', 'Manon', 1); \
            ",
            kind: MigrationKind::Up,
        },
       Migration {
            version: 11,
            description: "seed_ps_ms_a_students",
            sql: "INSERT INTO students (id, last_name, first_name, class_id) VALUES \
            (24, 'Aimar', 'Julia', 2), \
            (25, 'Altie', 'Mathieu', 2), \
            (26, 'Bonfanti', 'Mathias', 2), \
            (27, 'Carle', 'Giulian', 2), \
            (28, 'Giovannangeli', 'Clara', 2), \
            (29, 'Ksourah', 'Liam', 2), \
            (30, 'Marcel Feirrera', 'Esteban', 2), \
            (31, 'Matar', 'Eden', 2), \
            (32, 'Miralpeix', 'Aziana', 2), \
            (33, 'Pagliardini', 'Vincenzo', 2), \
            (34, 'Perez', 'Lucas', 2), \
            (35, 'Ritter', 'Sloan', 2), \
            (36, 'Rousseau', 'Zayen', 2), \
            (37, 'Roux', 'Alessia', 2), \
            (38, 'Trabelsi', 'Syana', 2), \
            (39, 'Zennoun', 'Elia', 2), \
            (40, 'Armaganian', 'Justine', 2), \
            (41, 'Figueres Segura', 'Elrik', 2), \
            (42, 'Giangrande', 'Gino', 2), \
            (43, 'Jondeau', 'Maddy', 2), \
            (44, 'Lopes', 'Tao', 2), \
            (45, 'Marconcini', 'Giovanni', 2), \
            (46, 'Nze Moegne', 'Miya', 2), \
            (47, 'Pihariev', 'Vladyslav', 2), \
            (48, 'Sauger', 'Romy', 2), \
            (49, 'Wieteska', 'Lisa', 2); \
            ",
            kind: MigrationKind::Up,
        },
       Migration {
            version: 12,
            description: "seed_ps_ms_b_students",
            sql: "INSERT INTO students (id, last_name, first_name, class_id) VALUES \
            (50, 'Ben El Haj Meziane', 'Wael', 3), \
            (51, 'Boussaid', 'Ella', 3), \
            (52, 'Chergui', 'Mohamed', 3), \
            (53, 'Deiber', 'Ugo', 3), \
            (54, 'Diallo', 'Kenny', 3), \
            (55, 'Diop', 'Kelya', 3), \
            (56, 'Graziani', 'Arthur', 3), \
            (57, 'Kucuk', 'Zumra', 3), \
            (58, 'Louchene', 'Kais', 3), \
            (59, 'Mancer', 'Delia', 3), \
            (60, 'Not', 'Sacha', 3), \
            (61, 'Ravera', 'Maria', 3), \
            (62, 'Sibois', 'Maël', 3), \
            (63, 'Zencirkiran', 'Adam', 3), \
            (64, 'Ait Mouhoub', 'Ambrine', 3), \
            (65, 'Azzaz', 'Nihelle', 3), \
            (66, 'Benakkadou', 'Adam', 3), \
            (67, 'Delplanque', 'Eddyne', 3), \
            (68, 'Fouque', 'Mathis', 3), \
            (69, 'Herrada', 'Noa', 3), \
            (70, 'Lauron', 'Elena', 3), \
            (71, 'Pirinu', 'Julian', 3), \
            (72, 'Robert', 'Ava', 3), \
            (73, 'Sassu-Richeda', 'Ambre', 3), \
            (74, 'Staquet', 'Jaycee', 3), \
            (75, 'Van Den Eynden', 'Mahe', 3); \
            ",
            kind: MigrationKind::Up,
        },
       Migration {
            version: 13,
            description: "seed_ms_students",
            sql: "INSERT INTO students (id, last_name, first_name, class_id) VALUES \
            (76, 'Aubin', 'Raphael', 4), \
            (77, 'Benselka', 'Kais', 4), \
            (78, 'Cella', 'Elyna', 4), \
            (79, 'Cesari', 'Leana', 4), \
            (80, 'Cornillad', 'Leon', 4), \
            (81, 'Da Costa', 'Lucas', 4), \
            (82, 'Desgrandes', 'Lycia', 4), \
            (83, 'Eid', 'Lea', 4), \
            (84, 'Favre', 'Arthur', 4), \
            (85, 'Frigano Pauletto', 'Gabrielle Jade', 4), \
            (86, 'Giangrande', 'Lou', 4), \
            (87, 'Henry', 'Elena', 4), \
            (88, 'Humbert', 'Jules', 4), \
            (89, 'Jridi', 'Rayan', 4), \
            (90, 'Lefebvre', 'Angelina', 4), \
            (91, 'Maglia', 'Julia', 4), \
            (92, 'Manai', 'Youssef', 4), \
            (93, 'Megdad', 'Eden', 4), \
            (94, 'Meriguet', 'Chloe', 4), \
            (95, 'Miralpeix', 'Azuria', 4), \
            (96, 'Monteiro Nascimento', 'Nina', 4), \
            (97, 'Pauletto Quanonne', 'Lilou', 4), \
            (98, 'Sabri', 'Nael', 4), \
            (99, 'Stives Jouclard', 'Honorine', 4), \
            (100, 'Trabelsi', 'Inaya', 4); \
            ",
            kind: MigrationKind::Up,
        },
       Migration {
            version: 14,
            description: "seed_gs_a_students",
            sql: "INSERT INTO students (id, last_name, first_name, class_id) VALUES \
            (101, 'Ardito Chesnet', 'Isi', 5), \
            (102, 'Augagneur', 'Romane', 5), \
            (103, 'Ayad Zeddam', 'Hilel', 5), \
            (104, 'Benmehdi', 'Samara', 5), \
            (105, 'Caudron', 'Emy', 5), \
            (106, 'Claverie', 'Liam', 5), \
            (107, 'Costagliola', 'Alessio', 5), \
            (108, 'Deiber', 'Tom', 5), \
            (109, 'Fernandez', 'Sophia', 5), \
            (110, 'Fersi', 'Hidaya', 5), \
            (111, 'Fournier', 'Axelle', 5), \
            (112, 'Gil', 'Marco', 5), \
            (113, 'Lahore Carrate', 'Milo', 5), \
            (114, 'Laouadi', 'Ismael', 5), \
            (115, 'Moilimou', 'Dalile', 5), \
            (116, 'Mologni', 'Nahil', 5), \
            (117, 'Mounissamy', 'Lyam', 5), \
            (118, 'Not', 'Louise', 5), \
            (119, 'Piazza', 'Lyam', 5), \
            (120, 'Saint Jean', 'Lorys', 5), \
            (121, 'Santiago', 'Francoise', 5), \
            (122, 'Soubeyrand', 'Bradley', 5), \
            (123, 'Toboso', 'Gianni', 5); \
            ",
            kind: MigrationKind::Up,
        },
       Migration {
            version: 15,
            description: "seed_gs_b_students",
            sql: "INSERT INTO students (id, last_name, first_name, class_id) VALUES \
            (124, 'Avanzini Buton', 'Aaron', 6), \
            (125, 'Bouquet', 'Anastasia', 6), \
            (126, 'Cannavale', 'Jana', 6), \
            (127, 'Delattre', 'Shahin', 6), \
            (128, 'Deprelle', 'Lena', 6), \
            (129, 'Dubois', 'Gianni', 6), \
            (130, 'Gaceb', 'Elian', 6), \
            (131, 'Gauthier', 'Andrea', 6), \
            (132, 'Giraud', 'Argann', 6), \
            (133, 'Henin', 'Gennaro', 6), \
            (134, 'Hubin', 'Juliette', 6), \
            (135, 'Lachab', 'Meryll', 6), \
            (136, 'Lobeau Courgez', 'Joy', 6), \
            (137, 'Louchene', 'Line', 6), \
            (138, 'Mohamed Assoumani', 'Mellina', 6), \
            (139, 'Monteiro Nascimento', 'Luna', 6), \
            (140, 'Sonmez', 'Emir', 6), \
            (141, 'Sorrentino', 'Milo', 6), \
            (142, 'Talbi', 'Malek', 6), \
            (143, 'Vibourel', 'Gaspard', 6), \
            (144, 'Younsi', 'Ilyes', 6), \
            (145, 'Zencirkiran', 'Myriam', 6); \
            ",
            kind: MigrationKind::Up,
        },
       Migration {
            version: 16,
            description: "seed_cp_a_students",
            sql: "INSERT INTO students (id, last_name, first_name, class_id) VALUES \
            (146, 'Aissaoui', 'Moustafa', 7), \
            (147, 'Bouamama', 'Khadidja', 7), \
            (148, 'Boukana', 'Nelya', 7), \
            (149, 'Boythias', 'Liam', 7), \
            (150, 'Chauveau', 'Noemie', 7), \
            (151, 'Cogordan', 'Teddy', 7), \
            (152, 'Comyn Haddou', 'Nahil', 7), \
            (153, 'Costa', 'Gabriel', 7), \
            (154, 'D''Urso', 'Eva', 7), \
            (155, 'Degang', 'Ethann', 7), \
            (156, 'Firat', 'Azad', 7), \
            (157, 'Fournier', 'Margaux', 7), \
            (158, 'Fraioli', 'Sohan', 7), \
            (159, 'Fumat', 'Chiara', 7), \
            (160, 'Gaye-Rubau', 'Jaylan', 7), \
            (161, 'Giangrande', 'Giuliana', 7), \
            (162, 'Gouffier', 'Adam', 7), \
            (163, 'Habi', 'Layana', 7), \
            (164, 'Ko-Alart', 'Malone', 7), \
            (165, 'Malaza', 'Aaron', 7), \
            (166, 'Mancer', 'Wassim', 7), \
            (167, 'Medroumi', 'Mya', 7), \
            (168, 'Munisi', 'Muhammed', 7), \
            (169, 'Ravera', 'Melina', 7), \
            (170, 'Santiago', 'Marie-Dolores', 7), \
            (171, 'Zonco', 'Victor', 7); \
            ",
            kind: MigrationKind::Up,
        },
       Migration {
            version: 17,
            description: "seed_cp_b_students",
            sql: "INSERT INTO students (id, last_name, first_name, class_id) VALUES \
            (172, 'Agnelli', 'Melina', 8), \
            (173, 'Anthoniswamy', 'Saphir', 8), \
            (174, 'Ben Hamza', 'Emnio', 8), \
            (175, 'Benmehdi', 'Yanis', 8), \
            (176, 'Bessaadia', 'Naila', 8), \
            (177, 'Boishardy', 'Airi', 8), \
            (178, 'Chergui', 'Mariem', 8), \
            (179, 'Conseil', 'Joann', 8), \
            (180, 'Daaci', 'Nahil', 8), \
            (181, 'Galiano Courte', 'Julio', 8), \
            (182, 'Gilbert', 'Mathis', 8), \
            (183, 'Henin', 'Lya', 8), \
            (184, 'Henry', 'Gabriel', 8), \
            (185, 'Jondeau', 'Lina', 8), \
            (186, 'Jridi', 'Mayar', 8), \
            (187, 'Laberenne', 'Mahe', 8), \
            (188, 'Lemaire', 'Sohan', 8), \
            (189, 'Munisi', 'Djeneta', 8), \
            (190, 'Ramdani', 'Mehdi', 8), \
            (191, 'Robert', 'Tao', 8), \
            (192, 'Saint Leger Cambe', 'Thymeo', 8), \
            (193, 'Salette Sa Silva', 'Cyan', 8), \
            (194, 'Specel', 'Nael', 8), \
            (195, 'Stan', 'Nicholas', 8), \
            (196, 'Vincent', 'Ethann', 8); \
            ",
            kind: MigrationKind::Up,
        },
       Migration {
            version: 18,
            description: "seed_cp_ce1_students",
            sql: "INSERT INTO students (id, last_name, first_name, class_id) VALUES \
            (197, 'Djemani', 'Leyam', 9), \
            (198, 'Godernaux-Delaunay', 'Zoe', 9), \
            (199, 'Guerrero', 'Leandro', 9), \
            (200, 'Lebourg', 'Emilie', 9), \
            (201, 'Rajhi', 'Elias', 9), \
            (202, 'Sebbar', 'Eliyah', 9), \
            (203, 'Steiner', 'Menoua', 9), \
            (204, 'Zeghmati', 'Maxime', 9), \
            (205, 'Altie', 'Raphael', 9), \
            (206, 'Armaganian', 'Lucca', 9), \
            (207, 'Barrero', 'Raphael', 9), \
            (208, 'Bonfanti', 'Nicolas', 9), \
            (209, 'Coetto', 'Raphael', 9), \
            (210, 'Duffo', 'Luca', 9), \
            (211, 'Gatto', 'Milann', 9), \
            (212, 'Gonella', 'Francesca', 9), \
            (213, 'Grech', 'Jasmine', 9), \
            (214, 'Houadria', 'Rose', 9), \
            (215, 'Jayne', 'Ambre', 9), \
            (216, 'Lahore Carrate', 'Lia', 9), \
            (217, 'Perez', 'Lea', 9), \
            (218, 'Salerno', 'Lily', 9), \
            (219, 'Sassu-Richeda', 'Nolhan', 9), \
            (220, 'Welty', 'Alyssa', 9); \
            ",
            kind: MigrationKind::Up,
        },
       Migration {
            version: 19,
            description: "seed_ce1_students",
            sql: "INSERT INTO students (id, last_name, first_name, class_id) VALUES \
            (221, 'Adalo Tayoro', 'Terrence', 10), \
            (222, 'Aimar', 'Nais', 10), \
            (223, 'Amamra', 'Melyna', 10), \
            (224, 'Attar', 'Assia', 10), \
            (225, 'Audino Poitevineau', 'Lucie', 10), \
            (226, 'Benakkadou', 'Nahel', 10), \
            (227, 'Bisogno', 'Giulian', 10), \
            (228, 'Boumerdas', 'Shaden', 10), \
            (229, 'Boussaid', 'Lana', 10), \
            (230, 'Chergui', 'Youssef', 10), \
            (231, 'Criquet Pineda', 'Olivia', 10), \
            (232, 'Dos Santos Tinoco', 'Mathea', 10), \
            (233, 'Dubois', 'Matteo', 10), \
            (234, 'Fersi', 'Aisha', 10), \
            (235, 'Frigano Pauletto', 'Giovanni', 10), \
            (236, 'Giangrande', 'Heley', 10), \
            (237, 'Grenard', 'Coline', 10), \
            (238, 'Herrada', 'Tom', 10), \
            (239, 'Liau', 'Ilan', 10), \
            (240, 'Meguenni-Tani', 'Walid', 10), \
            (241, 'Patrasc', 'David', 10), \
            (242, 'Pruvost', 'Elias', 10), \
            (243, 'Pruvost', 'Emy', 10), \
            (244, 'Rahou', 'Camelia', 10), \
            (245, 'Turner', 'Leo', 10); \
            ",
            kind: MigrationKind::Up,
        },
       Migration {
            version: 20,
            description: "seed_ulis_students",
            sql: "INSERT INTO students (id, last_name, first_name, class_id) VALUES \
            (246, 'Borriello', 'Dylan', 11), \
            (247, 'Carle', 'Kelian', 11), \
            (248, 'Carle', 'Louane', 11), \
            (249, 'Duffo', 'Theo', 11), \
            (250, 'Gamoudi', 'Joude', 11), \
            (251, 'Gauci', 'Maelys', 11), \
            (252, 'Giraud', 'Eloane', 11), \
            (253, 'Grelli', 'Mike', 11), \
            (254, 'Groullier', 'Melody', 11), \
            (255, 'Ijesurobo', 'Destiny', 11), \
            (256, 'Israelian', 'Leon', 11), \
            (257, 'Payot', 'Aleane', 11); \
            ",
            kind: MigrationKind::Up,
        },
       Migration {
            version: 21,
            description: "seed_ce2_a_students",
            sql: "INSERT INTO students (id, last_name, first_name, class_id) VALUES \
            (258, 'Akhsale', 'Amir', 12), \
            (259, 'Antoine Ruis', 'Liam', 12), \
            (260, 'Betard', 'Valentin', 12), \
            (261, 'Cervantes', 'Ange', 12), \
            (262, 'Costagliola', 'Chiara', 12), \
            (263, 'Di Landro', 'Dylan', 12), \
            (264, 'Duhamel', 'Sanjay', 12), \
            (265, 'Fauvergue', 'Hugo', 12), \
            (266, 'Fouque', 'Alicia', 12), \
            (267, 'Gaceb', 'Melissa', 12), \
            (268, 'Guillet', 'Mael', 12), \
            (269, 'Guillet', 'Paul', 12), \
            (270, 'Huet', 'Tevan', 12), \
            (271, 'Karakhanian', 'Manon', 12), \
            (272, 'Kesler', 'Elizio', 12), \
            (273, 'Lachab', 'Edes', 12), \
            (274, 'Nguyen Van Tinh', 'Lya', 12), \
            (275, 'Rodriguez', 'Melina', 12), \
            (276, 'Rousseau', 'Mahe', 12), \
            (277, 'Roux', 'Victoria', 12), \
            (278, 'Simko', 'Lara', 12); \
            ",
            kind: MigrationKind::Up,
        },
       Migration {
            version: 22,
            description: "seed_ce2_b_students",
            sql: "INSERT INTO students (id, last_name, first_name, class_id) VALUES \
            (279, 'Abayev', 'Livia', 13), \
            (280, 'Abrahimi', 'Vahidullah', 13), \
            (281, 'Antoissi', 'Noe', 13), \
            (282, 'Berino', 'Ana', 13), \
            (283, 'Bouamama', 'Wassim', 13), \
            (284, 'Caroff', 'Hanae', 13), \
            (285, 'Chelali', 'Ismael', 13), \
            (286, 'Collavoli Campos', 'Tiago', 13), \
            (287, 'Ehni', 'Nolan', 13), \
            (288, 'Frigano Pauletto', 'Giulia', 13), \
            (289, 'Fumat', 'Thea', 13), \
            (290, 'Khalid Mohamed Abdelmagsoud', 'Juna', 13), \
            (291, 'Kucuk', 'Derin', 13), \
            (292, 'Le Roux', 'Swann', 13), \
            (293, 'Mulero', 'Chloe', 13), \
            (294, 'Nair', 'Adam', 13), \
            (295, 'Pabudzinski', 'Arthur', 13), \
            (296, 'Ritter', 'Dany Zaven', 13), \
            (297, 'Sordillon', 'Myla', 13), \
            (298, 'Yilmaz', 'Nalin', 13), \
            (299, 'Zeghmati', 'Lucas', 13); \
            ",
            kind: MigrationKind::Up,
        },
       Migration {
            version: 23,
            description: "seed_cm1_a_students",
            sql: "INSERT INTO students (id, last_name, first_name, class_id) VALUES \
            (300, 'Akrich', 'Yanis', 14), \
            (301, 'Bessaadia', 'Nassime', 14), \
            (302, 'Botella', 'Lucas', 14), \
            (303, 'Boumerdas', 'Maher', 14), \
            (304, 'Bourrelly', 'Zoe', 14), \
            (305, 'Di Palma', 'Luna', 14), \
            (306, 'Diliberto', 'Leana', 14), \
            (307, 'Dylas', 'Alan', 14), \
            (308, 'Gargalian', 'Sofia', 14), \
            (309, 'Gauthier', 'Senna', 14), \
            (310, 'Ghalem', 'Zeyn', 14), \
            (311, 'Giangrande', 'Vittorio', 14), \
            (312, 'Glouchtchenko', 'Oustyna', 14), \
            (313, 'Greco', 'Nevia', 14), \
            (314, 'Jouault', 'Soan', 14), \
            (315, 'Minran', 'Mathys 2', 14), \
            (316, 'Morlon', 'Ilyam', 14), \
            (317, 'Rebiai', 'Aicha', 14), \
            (318, 'Ritter', 'Luna', 14), \
            (319, 'Robert', 'Tony', 14), \
            (320, 'Soubeyrand', 'Kisley', 14), \
            (321, 'Stan', 'Emma', 14), \
            (322, 'Talbi', 'Ines', 14), \
            (323, 'Tenev', 'Doriane', 14), \
            (324, 'Vibourel', 'Raphael', 14), \
            (325, 'Yatouh', 'Ayden', 14); \
            ",
            kind: MigrationKind::Up,
        },
       Migration {
            version: 24,
            description: "seed_cm1_b_students",
            sql: "INSERT INTO students (id, last_name, first_name, class_id) VALUES \
            (326, 'Attard', 'Rafael', 15), \
            (327, 'Ayad Zeddam', 'Jade A', 15), \
            (328, 'Azzaz', 'Wail', 15), \
            (329, 'Chauveau', 'Luce', 15), \
            (330, 'Cili', 'Skerdi', 15), \
            (331, 'Domont', 'Nolan', 15), \
            (332, 'Gilbert', 'Lena', 15), \
            (333, 'Giovannangeli', 'Melina', 15), \
            (334, 'Girier', 'Mathis', 15), \
            (335, 'Gouffier', 'Romane', 15), \
            (336, 'Guedj', 'Levanah', 15), \
            (337, 'Habi', 'Jade H', 15), \
            (338, 'Kesler-Corallo', 'Luciano', 15), \
            (339, 'Lopes', 'Diego', 15), \
            (340, 'Lounadi', 'Melyna', 15), \
            (341, 'Martin Duliscouet', 'Mathys', 15), \
            (342, 'Munisi', 'Ismahen', 15), \
            (343, 'Mze Moegne', 'Angelina', 15), \
            (344, 'Perez', 'Alba', 15), \
            (345, 'Pinna', 'Romeo', 15), \
            (346, 'Pirinu', 'Milan', 15), \
            (347, 'Radjhi', 'Naim', 15), \
            (348, 'Rignac', 'Luc', 15), \
            (349, 'Steiner', 'Nesta', 15), \
            (350, 'Toche', 'Leandro', 15); \
            ",
            kind: MigrationKind::Up,
        },
       Migration {
            version: 25,
            description: "seed_cm2_a_students",
            sql: "INSERT INTO students (id, last_name, first_name, class_id) VALUES \
            (351, 'Adalo Tayoro', 'Lindsay', 17), \
            (352, 'Amazian', 'Jassim-Joud', 17), \
            (353, 'Attia', 'Nael', 17), \
            (354, 'Bengas Ferreira', 'Leandro', 17), \
            (355, 'Bonhomme', 'Felix', 17), \
            (356, 'Copp', 'Shelssy', 17), \
            (357, 'Graziani', 'Emma', 17), \
            (358, 'Hamou', 'Delya', 17), \
            (359, 'Jullien', 'Ilhan', 17), \
            (360, 'Lubrano', 'Axel', 17), \
            (361, 'Malaza', 'Melina', 17), \
            (362, 'Munisi', 'Medina', 17), \
            (363, 'Nait Salem Pignol', 'Shemsa', 17), \
            (364, 'Patrasc', 'Daria', 17), \
            (365, 'Pecoraro', 'Laly', 17), \
            (366, 'Ribeiro', 'Rafael', 17), \
            (367, 'Salette Da Sylva', 'Elie', 17), \
            (368, 'Soualmia', 'Safoua', 17), \
            (369, 'Stan', 'Karla', 17), \
            (370, 'Tieb', 'Adel', 17), \
            (371, 'Toufouti Casamassa', 'Ethan', 17), \
            (372, 'Urgie Dinage', 'Gabriel', 17); \
            ",
            kind: MigrationKind::Up,
        },
       Migration {
            version: 26,
            description: "seed_cm2_b_students",
            sql: "INSERT INTO students (id, last_name, first_name, class_id) VALUES \
            (373, 'Baraduc', 'Callie', 16), \
            (374, 'Beldjilali', 'Nazim', 16), \
            (375, 'Boujassy', 'Jules', 16), \
            (376, 'Boukana', 'Milhane', 16), \
            (377, 'Comyn Haddou', 'Inaya', 16), \
            (378, 'Diop', 'Mya', 16), \
            (379, 'Fersi', 'Jaber', 16), \
            (380, 'Kribich', 'Mikail', 16), \
            (381, 'Lebourg', 'Baptiste', 16), \
            (382, 'Lenzi', 'Martin', 16), \
            (383, 'Marconcini', 'Madison', 16), \
            (384, 'Meguenni-Tani', 'Darine', 16), \
            (385, 'Meriem Benziane', 'Hind', 16), \
            (386, 'Merolla', 'Lysandro', 16), \
            (387, 'Picco', 'Jade', 16), \
            (388, 'Robin', 'Elise', 16), \
            (389, 'Scali', 'Valentin', 16), \
            (390, 'Soubeyrand', 'Everly', 16), \
            (391, 'Souidi', 'Amelia', 16), \
            (392, 'Vives', 'Noemie', 16), \
            (393, 'Yilmaz', 'Mustafa', 16); \
            ",
            kind: MigrationKind::Up,
        },
       Migration {
            version: 27,
            description: "seed_happenings",
            sql: "INSERT INTO happenings (id, name, date, description) VALUES \
            (1, 'Chocolats 2025', '2025-12-20', 'Chocolats de Noël 2025'); \
            ",
            kind: MigrationKind::Up,
        },
       Migration {
            version: 28,
            description: "insert_chocolate_articles",
            sql: "INSERT INTO articles (name, happening_id, description, price, preferential_price, image_link) VALUES \
            ('Le ballotin 250 g net', 1, '21 chocolats assortis - 21 recettes', 16.20, 11.45, 'articles/1.png'), \
            ('Le ballotin 500 g net', 1, '42 chocolats assortis - 25 recettes', 32.40, 22.80, 'articles/2.png'), \
            ('Le ballotin 1 kg net', 1, '84 chocolats assortis - 25 recettes', 64.80, 45.35, 'articles/3.png'), \
            ('Le ballotin 500 g net (au lait)', 1, '42 chocolats au lait - 12 recettes', 32.40, 22.80, 'articles/4.png'), \
            ('Le ballotin 500 g net (noirs)', 1, '42 chocolats noirs - 14 recettes', 32.40, 22.80, 'articles/5.png'), \
            ('Le ballotin 500 g net (blancs)', 1, '42 chocolats blancs - 8 recettes', 32.40, 22.80, 'articles/6.png'), \
            ('La boite Palets 250g net', 1, '24 palets assortis - 4 recettes', 21.90, 17.15, 'articles/7.png'), \
            ('La boite Rochers 250g net', 1, '24 rochers assortis - 4 recettes', 21.90, 17.15, 'articles/8.png'), \
            ('La boite Manons 240g net', 1, '16 Manons - 4 recettes', 16.20, 11.45, 'articles/9.png'), \
            ('La boite Truffes 350g net', 1, '30 truffes assorties - 4 recettes', 29.50, 21.25, 'articles/10.png'), \
            ('La boite Carrés 252 g net', 1, '56 carrés - 10 saveurs assorties', 29.50, 22.80, 'articles/11.png'), \
            ('La boite en métal Giandujas 260g net', 1, '28 giandujas aux deux noisettes - 4 recettes', 25.75, 20.50, 'articles/12.png'), \
            ('La boite bombes de chocolat chaud 200g net', 1, '4 bombes Père Noël - 2 recettes', 17.60, 14.60, 'articles/13.png'), \
            ('Le sachet de 8 ours en chocolat 96g net', 1, 'Chocolat au lait, praliné et sucre pétillant', 7.60, 6.20, 'articles/14.png'), \
            ('La boite \"Choco''pralinés\" 280g net', 1, '4 recettes assorties', 20.60, 15.60, 'articles/15.png'), \
            ('La boite sujets de Noël 245g net', 1, '19 sujets assortis au praliné - 7 recettes', 18.95, 14.40, 'articles/16.png'), \
            ('La boite ours en guimauve 375g net', 1, '40 ours en guimauve enrobés de chocolat au lait', 23.70, 18.35, 'articles/17.png'), \
            ('La boite ours en guimauve caramel 320 g net', 1, '20 ours en guimauve et cœur caramel enrobés de chocolat au lait', 23.70, 18.35, 'articles/18.png'), \
            ('La boule de Noël en métal 64g net', 1, 'garnie de Choco''pralinés et de carrés de chocolat au lait', 8.30, 6.55, 'articles/19.png'), \
            ('Le coffret métal 330g net', 1, '27 pralinés assortis -14 recettes', 38.50, 28.90, 'articles/20.png'), \
            ('La boite Gustaves 325g net', 1, '24 Gustaves assortis - 4 recettes', 26.00, 21.20, 'articles/21.png'), \
            ('La boite Juliettes 285g net', 1, '26 Juliettes assorties - 4 recettes', 26.75, 22.50, 'articles/22.png'), \
            ('Amandes et noisettes au chocolat 230 g net', 1, '3 saveurs assorties', 21.95, 17.30, 'articles/23.png'), \
            ('Les orangettes 260g net', 1, '', 22.20, 17.50, 'articles/24.png'), \
            ('Les pâtes de fruits 250g net', 1, '5 saveurs assorties', 16.25, 14.40, 'articles/25.png'), \
            ('Les marrons glacés en morceaux 250g net', 1, '', 19.25, 16.90, 'articles/26.png'), \
            ('Le sac (24 x 28 x 11 cm)', 1, '', 0.46, 0.46, 'articles/27.png');",
            kind: MigrationKind::Up,
        },
    ]
}
