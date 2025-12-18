use b_and_b;

CREATE TABLE vibes (
	id INT UNSIGNED NOT NULL AUTO_INCREMENT,
	name VARCHAR(50) NOT NULL,
	slug VARCHAR(50) NOT NULL,

	PRIMARY KEY (id),
	UNIQUE KEY uq_vibes_slug (slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO vibes (name, slug) VALUES
('Calm', 'calm'),
('Wise', 'wise'),
('Refined', 'refined'),
('Bold', 'bold'),
('Competitive', 'competitive'),
('Explosive', 'explosive'),
('Stubborn', 'stubborn'),
('Loyal', 'loyal'),
('Traditional', 'traditional'),
('Elegant', 'elegant'),
('Philosophical', 'philosophical'),
('Inventive', 'inventive'),
('Chaotic', 'chaotic'),
('Talkative', 'talkative'),
('Adaptive', 'adaptive'),
('Charming', 'charming'),
('Balanced', 'balanced'),
('Aggressive', 'aggressive'),
('Loud', 'loud'),
('Cheerful', 'cheerful'),
('Social', 'social'),
('Playful', 'playful'),
('Flexible', 'flexible'),
('Practical', 'practical'),
('Magnetic', 'magnetic'),
('Mysterious', 'mysterious');
