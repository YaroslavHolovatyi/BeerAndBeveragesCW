use b_and_b;

CREATE TABLE race_drinks (
	race_id INT UNSIGNED NOT NULL,
	drink_id INT UNSIGNED NOT NULL,

	PRIMARY KEY (race_id, drink_id),

	CONSTRAINT fk_race_drinks_race
		FOREIGN KEY (race_id)
		REFERENCES races(id)
		ON DELETE CASCADE,

	CONSTRAINT fk_race_drinks_drink
		FOREIGN KEY (drink_id)
		REFERENCES drinks(id)
		ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


USE b_and_b;

-- Aasimar → Wine
INSERT INTO race_drinks (race_id, drink_id)
SELECT r.id, d.id
FROM races r
JOIN drinks d ON d.slug = 'wine'
WHERE r.slug = 'aasimar';

-- Dragonborn → Whiskey, Strong Spirits
INSERT INTO race_drinks (race_id, drink_id)
SELECT r.id, d.id
FROM races r
JOIN drinks d ON d.slug IN ('whiskey', 'strong-spirits')
WHERE r.slug = 'dragonborn';

-- Dwarf → Dark Beer, Ale
INSERT INTO race_drinks (race_id, drink_id)
SELECT r.id, d.id
FROM races r
JOIN drinks d ON d.slug IN ('dark-beer', 'ale')
WHERE r.slug = 'dwarf';

-- Elf → Wine
INSERT INTO race_drinks (race_id, drink_id)
SELECT r.id, d.id
FROM races r
JOIN drinks d ON d.slug = 'wine'
WHERE r.slug = 'elf';

-- Gnome → Strong Spirits
INSERT INTO race_drinks (race_id, drink_id)
SELECT r.id, d.id
FROM races r
JOIN drinks d ON d.slug = 'strong-spirits'
WHERE r.slug = 'gnome';

-- Half-Elf → Wine
INSERT INTO race_drinks (race_id, drink_id)
SELECT r.id, d.id
FROM races r
JOIN drinks d ON d.slug = 'wine'
WHERE r.slug = 'halfElf';

-- Half-Orc → Strong Spirits, Dark Beer
INSERT INTO race_drinks (race_id, drink_id)
SELECT r.id, d.id
FROM races r
JOIN drinks d ON d.slug IN ('strong-spirits', 'dark-beer')
WHERE r.slug = 'halfOrc';

-- Halfling → Ale, Cocktails
INSERT INTO race_drinks (race_id, drink_id)
SELECT r.id, d.id
FROM races r
JOIN drinks d ON d.slug IN ('ale', 'cocktails')
WHERE r.slug = 'halfling';

-- Human → Whiskey, Cocktails, Ale
INSERT INTO race_drinks (race_id, drink_id)
SELECT r.id, d.id
FROM races r
JOIN drinks d ON d.slug IN ('whiskey', 'cocktails', 'ale')
WHERE r.slug = 'human';

-- Tiefling → Cocktails
INSERT INTO race_drinks (race_id, drink_id)
SELECT r.id, d.id
FROM races r
JOIN drinks d ON d.slug = 'cocktails'
WHERE r.slug = 'tiefling';

SELECT r.name AS race, d.name AS drink
FROM race_drinks rd
JOIN races r ON r.id = rd.race_id
JOIN drinks d ON d.id = rd.drink_id
ORDER BY r.name;

SELECT d.name
FROM race_drinks rd
JOIN drinks d ON d.id = rd.drink_id
JOIN races r ON r.id = rd.race_id
WHERE r.slug = 'tiefling';