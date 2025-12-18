use b_and_b;

CREATE TABLE races (
	id INT UNSIGNED NOT NULL AUTO_INCREMENT,

	slug VARCHAR(50) NOT NULL,
	name VARCHAR(50) NOT NULL,
	title VARCHAR(100) NOT NULL,
	description TEXT NOT NULL,

	PRIMARY KEY (id),
	UNIQUE KEY uq_races_slug (slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


INSERT INTO races (slug, name, title, description) VALUES
(
	'aasimar',
	'Aasimar',
	'The Noble Taster',
	'Aasimars drink with celestial grace. Wine is their sacred nectar. After a few sips they begin offering wisdom nobody asked for — yet somehow everyone listens. They sit quietly in bars, but bartenders know: a single nod from an Aasimar means the drink is perfect.'
),
(
	'dragonborn',
	'Dragonborn',
	'The Fireproof Drinker',
	'Dragonborn treat whiskey like water. A couple of shots and they are ready to challenge the bar counter to a duel. They thrive in rock pubs or anywhere competition is encouraged.'
),
(
	'dwarf',
	'Dwarf',
	'Lord of Dark Beer',
	'Dwarves are kings of dark beer, ale, and meat platters. A bar is their temple. They tell long stories nobody asked for — but everyone remembers.'
),
(
	'elf',
	'Elf',
	'Elegant Enologist',
	'Elves are all about wine, cheese plates, and philosophical conversations. Give them a sip and they turn into poets and sages.'
),
(
	'gnome',
	'Gnome',
	'Master of Potent Spirits',
	'Gnomes love the strongest spirits available. Their courage rises with alcohol percentage. After a few shots they start giving very serious advice.'
),
(
	'halfElf',
	'Half-Elf',
	'The Balanced Drinker',
	'Half-elves enjoy wine, exotic dishes, and good company. They fit anywhere and add charm wherever they go.'
),
(
	'halfOrc',
	'Half-Orc',
	'The Shot Warrior',
	'Half-orcs love strong drinks, dark beer, and challenges. They drink as if preparing for battle and become overly confident after.'
),
(
	'halfling',
	'Halfling',
	'Heart of the Party',
	'Halflings are laughter, dancing, cocktails, ale, and wild stories. They disappear after the second drink and return with new friends.'
),
(
	'human',
	'Human',
	'The Versatile Drinker',
	'Humans drink everything and adapt to any vibe. They balance chaos and logic better than anyone else.'
),
(
	'tiefling',
	'Tiefling',
	'The Cocktail Sorcerer',
	'Tieflings master cocktails, magic lounges, and chaos. After alcohol they become dangerously charismatic.'
);

select * from races;

