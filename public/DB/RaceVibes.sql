use b_and_b;

CREATE TABLE race_vibes (
	race_id INT UNSIGNED NOT NULL,
	vibe_id INT UNSIGNED NOT NULL,

	PRIMARY KEY (race_id, vibe_id),

	CONSTRAINT fk_race_vibes_race
		FOREIGN KEY (race_id)
		REFERENCES races(id)
		ON DELETE CASCADE,

	CONSTRAINT fk_race_vibes_vibe
		FOREIGN KEY (vibe_id)
		REFERENCES vibes(id)
		ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO race_vibes (race_id, vibe_id)
SELECT r.id, v.id
FROM races r
JOIN vibes v ON v.slug IN ('calm','wise','refined')
WHERE r.slug = 'aasimar';

INSERT INTO race_vibes (race_id, vibe_id)
SELECT r.id, v.id
FROM races r
JOIN vibes v ON v.slug IN ('bold','competitive','explosive')
WHERE r.slug = 'dragonborn';

INSERT INTO race_vibes (race_id, vibe_id)
SELECT r.id, v.id
FROM races r
JOIN vibes v ON v.slug IN ('stubborn','loyal','traditional')
WHERE r.slug = 'dwarf';

INSERT INTO race_vibes (race_id, vibe_id)
SELECT r.id, v.id
FROM races r
JOIN vibes v ON v.slug IN ('elegant','philosophical','calm')
WHERE r.slug = 'elf';

INSERT INTO race_vibes (race_id, vibe_id)
SELECT r.id, v.id
FROM races r
JOIN vibes v ON v.slug IN ('inventive','chaotic','talkative')
WHERE r.slug = 'gnome';

INSERT INTO race_vibes (race_id, vibe_id)
SELECT r.id, v.id
FROM races r
JOIN vibes v ON v.slug IN ('adaptive','charming','balanced')
WHERE r.slug = 'halfElf';

INSERT INTO race_vibes (race_id, vibe_id)
SELECT r.id, v.id
FROM races r
JOIN vibes v ON v.slug IN ('aggressive','competitive','loud')
WHERE r.slug = 'halfOrc';

INSERT INTO race_vibes (race_id, vibe_id)
SELECT r.id, v.id
FROM races r
JOIN vibes v ON v.slug IN ('cheerful','social','playful')
WHERE r.slug = 'halfling';

INSERT INTO race_vibes (race_id, vibe_id)
SELECT r.id, v.id
FROM races r
JOIN vibes v ON v.slug IN ('flexible','practical','social')
WHERE r.slug = 'human';

INSERT INTO race_vibes (race_id, vibe_id)
SELECT r.id, v.id
FROM races r
JOIN vibes v ON v.slug IN ('magnetic','chaotic','mysterious')
WHERE r.slug = 'tiefling';

