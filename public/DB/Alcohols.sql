use b_and_b;

CREATE TABLE drinks (
	id INT UNSIGNED NOT NULL AUTO_INCREMENT,
	name VARCHAR(100) NOT NULL,
	slug VARCHAR(120) NOT NULL,

	PRIMARY KEY (id),
	UNIQUE KEY uq_drinks_slug (slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO drinks (name, slug) VALUES
('Dark Beer', 'dark-beer'),
('Beer', 'beer'),
('Ale', 'ale'),
('Wine', 'wine'),
('Whiskey', 'whiskey'),
('Strong Spirits', 'strong-spirits'),
('Cocktails', 'cocktails'),
('Liqueur', 'liqueur'),
('Herbal Tincture', 'herbal-tincture'),
('Mead', 'mead'),
('Gin', 'gin'),
('Rum', 'rum');

select * from drinks;