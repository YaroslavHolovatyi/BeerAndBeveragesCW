USE b_and_b;

CREATE TABLE quiz_answer_races (
	answer_id INT UNSIGNED NOT NULL,
	race_id INT UNSIGNED NOT NULL,
	score TINYINT NOT NULL DEFAULT 1,

	PRIMARY KEY (answer_id, race_id),

	CONSTRAINT fk_qar_answer
		FOREIGN KEY (answer_id)
		REFERENCES quiz_answers(id)
		ON DELETE CASCADE,

	CONSTRAINT fk_qar_race
		FOREIGN KEY (race_id)
		REFERENCES races(id)
		ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- q1
INSERT INTO quiz_answer_races (answer_id, race_id)
SELECT a.id, r.id
FROM quiz_answers a
JOIN quiz_questions q ON q.id = a.question_id
JOIN races r ON r.slug IN ('dwarf','halfOrc')
WHERE q.position = 1 AND a.answer_key = 'A';

INSERT INTO quiz_answer_races (answer_id, race_id)
SELECT a.id, r.id FROM quiz_answers a
JOIN quiz_questions q ON q.id = a.question_id
JOIN races r ON r.slug IN ('elf','aasimar','halfElf')
WHERE q.position = 1 AND a.answer_key = 'B';

INSERT INTO quiz_answer_races (answer_id, race_id)
SELECT a.id, r.id FROM quiz_answers a
JOIN quiz_questions q ON q.id = a.question_id
JOIN races r ON r.slug IN ('human','dragonborn')
WHERE q.position = 1 AND a.answer_key = 'C';

INSERT INTO quiz_answer_races (answer_id, race_id)
SELECT a.id, r.id FROM quiz_answers a
JOIN quiz_questions q ON q.id = a.question_id
JOIN races r ON r.slug IN ('gnome','halfOrc')
WHERE q.position = 1 AND a.answer_key = 'D';

INSERT INTO quiz_answer_races (answer_id, race_id)
SELECT a.id, r.id FROM quiz_answers a
JOIN quiz_questions q ON q.id = a.question_id
JOIN races r ON r.slug IN ('halfling','dwarf')
WHERE q.position = 1 AND a.answer_key = 'E';

INSERT INTO quiz_answer_races (answer_id, race_id)
SELECT a.id, r.id FROM quiz_answers a
JOIN quiz_questions q ON q.id = a.question_id
JOIN races r ON r.slug IN ('tiefling','human')
WHERE q.position = 1 AND a.answer_key = 'F';

-- q2

INSERT INTO quiz_answer_races (answer_id, race_id)
SELECT a.id, r.id FROM quiz_answers a
JOIN quiz_questions q ON q.id = a.question_id
JOIN races r ON r.slug IN ('elf','aasimar')
WHERE q.position = 2 AND a.answer_key = 'A';

INSERT INTO quiz_answer_races (answer_id, race_id)
SELECT a.id, r.id FROM quiz_answers a
JOIN quiz_questions q ON q.id = a.question_id
JOIN races r ON r.slug IN ('halfling','tiefling')
WHERE q.position = 2 AND a.answer_key = 'B';

INSERT INTO quiz_answer_races (answer_id, race_id)
SELECT a.id, r.id FROM quiz_answers a
JOIN quiz_questions q ON q.id = a.question_id
JOIN races r ON r.slug IN ('human','halfElf')
WHERE q.position = 2 AND a.answer_key = 'C';

INSERT INTO quiz_answer_races (answer_id, race_id)
SELECT a.id, r.id FROM quiz_answers a
JOIN quiz_questions q ON q.id = a.question_id
JOIN races r ON r.slug IN ('dragonborn','aasimar')
WHERE q.position = 2 AND a.answer_key = 'D';

INSERT INTO quiz_answer_races (answer_id, race_id)
SELECT a.id, r.id FROM quiz_answers a
JOIN quiz_questions q ON q.id = a.question_id
JOIN races r ON r.slug IN ('tiefling','halfOrc')
WHERE q.position = 2 AND a.answer_key = 'E';

INSERT INTO quiz_answer_races (answer_id, race_id)
SELECT a.id, r.id FROM quiz_answers a
JOIN quiz_questions q ON q.id = a.question_id
JOIN races r ON r.slug IN ('gnome','elf')
WHERE q.position = 2 AND a.answer_key = 'F';

-- q3

INSERT INTO quiz_answer_races (answer_id, race_id)
SELECT a.id, r.id FROM quiz_answers a
JOIN quiz_questions q ON q.id = a.question_id
JOIN races r ON r.slug IN ('aasimar','elf')
WHERE q.position = 3 AND a.answer_key = 'A';

INSERT INTO quiz_answer_races (answer_id, race_id)
SELECT a.id, r.id FROM quiz_answers a
JOIN quiz_questions q ON q.id = a.question_id
JOIN races r ON r.slug IN ('elf','human')
WHERE q.position = 3 AND a.answer_key = 'B';

INSERT INTO quiz_answer_races (answer_id, race_id)
SELECT a.id, r.id FROM quiz_answers a
JOIN quiz_questions q ON q.id = a.question_id
JOIN races r ON r.slug IN ('dragonborn','tiefling')
WHERE q.position = 3 AND a.answer_key = 'C';

INSERT INTO quiz_answer_races (answer_id, race_id)
SELECT a.id, r.id FROM quiz_answers a
JOIN quiz_questions q ON q.id = a.question_id
JOIN races r ON r.slug IN ('halfling','halfElf')
WHERE q.position = 3 AND a.answer_key = 'D';

INSERT INTO quiz_answer_races (answer_id, race_id)
SELECT a.id, r.id FROM quiz_answers a
JOIN quiz_questions q ON q.id = a.question_id
JOIN races r ON r.slug IN ('dwarf','halfOrc')
WHERE q.position = 3 AND a.answer_key = 'E';

INSERT INTO quiz_answer_races (answer_id, race_id)
SELECT a.id, r.id FROM quiz_answers a
JOIN quiz_questions q ON q.id = a.question_id
JOIN races r ON r.slug IN ('gnome','tiefling')
WHERE q.position = 3 AND a.answer_key = 'F';

-- q4

INSERT INTO quiz_answer_races (answer_id, race_id)
SELECT a.id, r.id FROM quiz_answers a
JOIN quiz_questions q ON q.id = a.question_id
JOIN races r ON r.slug IN ('halfling','tiefling')
WHERE q.position = 4 AND a.answer_key = 'A';

INSERT INTO quiz_answer_races (answer_id, race_id)
SELECT a.id, r.id FROM quiz_answers a
JOIN quiz_questions q ON q.id = a.question_id
JOIN races r ON r.slug IN ('aasimar','elf')
WHERE q.position = 4 AND a.answer_key = 'B';

INSERT INTO quiz_answer_races (answer_id, race_id)
SELECT a.id, r.id FROM quiz_answers a
JOIN quiz_questions q ON q.id = a.question_id
JOIN races r ON r.slug IN ('dragonborn','human')
WHERE q.position = 4 AND a.answer_key = 'C';

INSERT INTO quiz_answer_races (answer_id, race_id)
SELECT a.id, r.id FROM quiz_answers a
JOIN quiz_questions q ON q.id = a.question_id
JOIN races r ON r.slug IN ('gnome','elf')
WHERE q.position = 4 AND a.answer_key = 'D';

INSERT INTO quiz_answer_races (answer_id, race_id)
SELECT a.id, r.id FROM quiz_answers a
JOIN quiz_questions q ON q.id = a.question_id
JOIN races r ON r.slug IN ('halfling','dwarf')
WHERE q.position = 4 AND a.answer_key = 'E';

INSERT INTO quiz_answer_races (answer_id, race_id)
SELECT a.id, r.id FROM quiz_answers a
JOIN quiz_questions q ON q.id = a.question_id
JOIN races r ON r.slug IN ('halfOrc','tiefling')
WHERE q.position = 4 AND a.answer_key = 'F';

-- q5

INSERT INTO quiz_answer_races (answer_id, race_id)
SELECT a.id, r.id FROM quiz_answers a
JOIN quiz_questions q ON q.id = a.question_id
JOIN races r ON r.slug = 'aasimar'
WHERE q.position = 5 AND a.answer_key = 'A';

INSERT INTO quiz_answer_races (answer_id, race_id)
SELECT a.id, r.id FROM quiz_answers a
JOIN quiz_questions q ON q.id = a.question_id
JOIN races r ON r.slug IN ('halfling','human')
WHERE q.position = 5 AND a.answer_key = 'B';

INSERT INTO quiz_answer_races (answer_id, race_id)
SELECT a.id, r.id FROM quiz_answers a
JOIN quiz_questions q ON q.id = a.question_id
JOIN races r ON r.slug IN ('dragonborn','halfOrc')
WHERE q.position = 5 AND a.answer_key = 'C';

INSERT INTO quiz_answer_races (answer_id, race_id)
SELECT a.id, r.id FROM quiz_answers a
JOIN quiz_questions q ON q.id = a.question_id
JOIN races r ON r.slug = 'elf'
WHERE q.position = 5 AND a.answer_key = 'D';

INSERT INTO quiz_answer_races (answer_id, race_id)
SELECT a.id, r.id FROM quiz_answers a
JOIN quiz_questions q ON q.id = a.question_id
JOIN races r ON r.slug IN ('gnome','dwarf')
WHERE q.position = 5 AND a.answer_key = 'E';

INSERT INTO quiz_answer_races (answer_id, race_id)
SELECT a.id, r.id FROM quiz_answers a
JOIN quiz_questions q ON q.id = a.question_id
JOIN races r ON r.slug = 'tiefling'
WHERE q.position = 5 AND a.answer_key = 'F';

-- q6

-- A: Meat platter → Dwarf, Dragonborn
INSERT INTO quiz_answer_races (answer_id, race_id)
SELECT a.id, r.id
FROM quiz_answers a
JOIN quiz_questions q ON q.id = a.question_id
JOIN races r ON r.slug IN ('dwarf','dragonborn')
WHERE q.position = 6 AND a.answer_key = 'A';

-- B: Cheese → Elf, Aasimar
INSERT INTO quiz_answer_races (answer_id, race_id)
SELECT a.id, r.id
FROM quiz_answers a
JOIN quiz_questions q ON q.id = a.question_id
JOIN races r ON r.slug IN ('elf','aasimar')
WHERE q.position = 6 AND a.answer_key = 'B';

-- C: Something exotic → Tiefling, Gnome
INSERT INTO quiz_answer_races (answer_id, race_id)
SELECT a.id, r.id
FROM quiz_answers a
JOIN quiz_questions q ON q.id = a.question_id
JOIN races r ON r.slug IN ('tiefling','gnome')
WHERE q.position = 6 AND a.answer_key = 'C';

-- D: Nuts or crackers → Halfling, Half-Orc
INSERT INTO quiz_answer_races (answer_id, race_id)
SELECT a.id, r.id
FROM quiz_answers a
JOIN quiz_questions q ON q.id = a.question_id
JOIN races r ON r.slug IN ('halfling','halfOrc')
WHERE q.position = 6 AND a.answer_key = 'D';

-- E: Fruits → Half-Elf, Elf
INSERT INTO quiz_answer_races (answer_id, race_id)
SELECT a.id, r.id
FROM quiz_answers a
JOIN quiz_questions q ON q.id = a.question_id
JOIN races r ON r.slug IN ('halfElf','elf')
WHERE q.position = 6 AND a.answer_key = 'E';

-- F: Nothing, I drink pure → Human, Tiefling
INSERT INTO quiz_answer_races (answer_id, race_id)
SELECT a.id, r.id
FROM quiz_answers a
JOIN quiz_questions q ON q.id = a.question_id
JOIN races r ON r.slug IN ('human','tiefling')
WHERE q.position = 6 AND a.answer_key = 'F';

-- q7

-- A: Philosophizing → Elf, Aasimar
INSERT INTO quiz_answer_races (answer_id, race_id)
SELECT a.id, r.id
FROM quiz_answers a
JOIN quiz_questions q ON q.id = a.question_id
JOIN races r ON r.slug IN ('elf','aasimar')
WHERE q.position = 7 AND a.answer_key = 'A';

-- B: Laugh at everything → Halfling, Human
INSERT INTO quiz_answer_races (answer_id, race_id)
SELECT a.id, r.id
FROM quiz_answers a
JOIN quiz_questions q ON q.id = a.question_id
JOIN races r ON r.slug IN ('halfling','human')
WHERE q.position = 7 AND a.answer_key = 'B';

-- C: Fight or compete → Dragonborn, Half-Orc
INSERT INTO quiz_answer_races (answer_id, race_id)
SELECT a.id, r.id
FROM quiz_answers a
JOIN quiz_questions q ON q.id = a.question_id
JOIN races r ON r.slug IN ('dragonborn','halfOrc')
WHERE q.position = 7 AND a.answer_key = 'C';

-- D: Giving advice → Gnome
INSERT INTO quiz_answer_races (answer_id, race_id)
SELECT a.id, r.id
FROM quiz_answers a
JOIN quiz_questions q ON q.id = a.question_id
JOIN races r ON r.slug = 'gnome'
WHERE q.position = 7 AND a.answer_key = 'D';

-- E: Disappear on adventures → Tiefling
INSERT INTO quiz_answer_races (answer_id, race_id)
SELECT a.id, r.id
FROM quiz_answers a
JOIN quiz_questions q ON q.id = a.question_id
JOIN races r ON r.slug = 'tiefling'
WHERE q.position = 7 AND a.answer_key = 'E';

-- F: Start dancing → Dwarf, Halfling
INSERT INTO quiz_answer_races (answer_id, race_id)
SELECT a.id, r.id
FROM quiz_answers a
JOIN quiz_questions q ON q.id = a.question_id
JOIN races r ON r.slug IN ('dwarf','halfling')
WHERE q.position = 7 AND a.answer_key = 'F';

-- q8
-- A: Small and atmospheric → Aasimar 
INSERT INTO quiz_answer_races (answer_id, race_id)
SELECT a.id, r.id
FROM quiz_answers a
JOIN quiz_questions q ON q.id = a.question_id
JOIN races r ON r.slug = 'aasimar'
WHERE q.position = 8 AND a.answer_key = 'A';

-- B: Classic wine cellar → Elf
INSERT INTO quiz_answer_races (answer_id, race_id)
SELECT a.id, r.id
FROM quiz_answers a
JOIN quiz_questions q ON q.id = a.question_id
JOIN races r ON r.slug = 'elf'
WHERE q.position = 8 AND a.answer_key = 'B';

-- C: Rock pub → Dragonborn
INSERT INTO quiz_answer_races (answer_id, race_id)
SELECT a.id, r.id
FROM quiz_answers a
JOIN quiz_questions q ON q.id = a.question_id
JOIN races r ON r.slug = 'dragonborn'
WHERE q.position = 8 AND a.answer_key = 'C';

-- D: Magical lounge → Tiefling
INSERT INTO quiz_answer_races (answer_id, race_id)
SELECT a.id, r.id
FROM quiz_answers a
JOIN quiz_questions q ON q.id = a.question_id
JOIN races r ON r.slug = 'tiefling'
WHERE q.position = 8 AND a.answer_key = 'D';

-- E: Mountain tavern → Dwarf, Gnome
INSERT INTO quiz_answer_races (answer_id, race_id)
SELECT a.id, r.id
FROM quiz_answers a
JOIN quiz_questions q ON q.id = a.question_id
JOIN races r ON r.slug IN ('dwarf','gnome')
WHERE q.position = 8 AND a.answer_key = 'E';

-- F: Tropical beach bar → Halfling, Human
INSERT INTO quiz_answer_races (answer_id, race_id)
SELECT a.id, r.id
FROM quiz_answers a
JOIN quiz_questions q ON q.id = a.question_id
JOIN races r ON r.slug IN ('halfling','human')
WHERE q.position = 8 AND a.answer_key = 'F';

-- q9

-- A: Curious but cautious → Human, Dwarf
INSERT INTO quiz_answer_races (answer_id, race_id)
SELECT a.id, r.id
FROM quiz_answers a
JOIN quiz_questions q ON q.id = a.question_id
JOIN races r ON r.slug IN ('human','dwarf')
WHERE q.position = 9 AND a.answer_key = 'A';

-- B: Believe, have seen it → Aasimar
INSERT INTO quiz_answer_races (answer_id, race_id)
SELECT a.id, r.id
FROM quiz_answers a
JOIN quiz_questions q ON q.id = a.question_id
JOIN races r ON r.slug = 'aasimar'
WHERE q.position = 9 AND a.answer_key = 'B';

-- C: Use it for my goals → Dragonborn
INSERT INTO quiz_answer_races (answer_id, race_id)
SELECT a.id, r.id
FROM quiz_answers a
JOIN quiz_questions q ON q.id = a.question_id
JOIN races r ON r.slug = 'dragonborn'
WHERE q.position = 9 AND a.answer_key = 'C';

-- D: Skeptic → Gnome, Half-Orc
INSERT INTO quiz_answer_races (answer_id, race_id)
SELECT a.id, r.id
FROM quiz_answers a
JOIN quiz_questions q ON q.id = a.question_id
JOIN races r ON r.slug IN ('gnome','halfOrc')
WHERE q.position = 9 AND a.answer_key = 'D';

-- E: Part of my life → Elf, Half-Elf
INSERT INTO quiz_answer_races (answer_id, race_id)
SELECT a.id, r.id
FROM quiz_answers a
JOIN quiz_questions q ON q.id = a.question_id
JOIN races r ON r.slug IN ('elf','halfElf')
WHERE q.position = 9 AND a.answer_key = 'E';

-- F: I am magic → Tiefling
INSERT INTO quiz_answer_races (answer_id, race_id)
SELECT a.id, r.id
FROM quiz_answers a
JOIN quiz_questions q ON q.id = a.question_id
JOIN races r ON r.slug = 'tiefling'
WHERE q.position = 9 AND a.answer_key = 'F';

-- q10
-- A: Life is an adventure → Halfling
INSERT INTO quiz_answer_races (answer_id, race_id)
SELECT a.id, r.id
FROM quiz_answers a
JOIN quiz_questions q ON q.id = a.question_id
JOIN races r ON r.slug = 'halfling'
WHERE q.position = 10 AND a.answer_key = 'A';

-- B: Strength is calm → Aasimar
INSERT INTO quiz_answer_races (answer_id, race_id)
SELECT a.id, r.id
FROM quiz_answers a
JOIN quiz_questions q ON q.id = a.question_id
JOIN races r ON r.slug = 'aasimar'
WHERE q.position = 10 AND a.answer_key = 'B';

-- C: No risk, no life → Dragonborn
INSERT INTO quiz_answer_races (answer_id, race_id)
SELECT a.id, r.id
FROM quiz_answers a
JOIN quiz_questions q ON q.id = a.question_id
JOIN races r ON r.slug = 'dragonborn'
WHERE q.position = 10 AND a.answer_key = 'C';

-- D: Wisdom is moderation → Elf
INSERT INTO quiz_answer_races (answer_id, race_id)
SELECT a.id, r.id
FROM quiz_answers a
JOIN quiz_questions q ON q.id = a.question_id
JOIN races r ON r.slug = 'elf'
WHERE q.position = 10 AND a.answer_key = 'D';

-- E: Wine and friends → Human, Half-Elf
INSERT INTO quiz_answer_races (answer_id, race_id)
SELECT a.id, r.id
FROM quiz_answers a
JOIN quiz_questions q ON q.id = a.question_id
JOIN races r ON r.slug IN ('human','halfElf')
WHERE q.position = 10 AND a.answer_key = 'E';

-- F: World is a bar → Tiefling, Gnome
INSERT INTO quiz_answer_races (answer_id, race_id)
SELECT a.id, r.id
FROM quiz_answers a
JOIN quiz_questions q ON q.id = a.question_id
JOIN races r ON r.slug IN ('tiefling','gnome')
WHERE q.position = 10 AND a.answer_key = 'F';

