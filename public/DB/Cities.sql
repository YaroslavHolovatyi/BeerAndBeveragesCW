use B_and_B;

CREATE TABLE IF NOT EXISTS cities (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL,
    x DECIMAL(5,2) NOT NULL,
    y DECIMAL(5,2) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uq_slug (slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


INSERT INTO cities (id, name, slug, x, y) VALUES
(1, 'Lviv', 'lviv', 25.45, 36.38),
(2, 'Uzhhorod', 'uzhhorod', 18.66, 46.49),
(3, 'Ivano-Frankivsk', 'ivano-frankivsk', 27.66, 44.15),
(4, 'Ternopil', 'ternopil', 30.78, 37.94),
(5, 'Lutsk', 'lutsk', 30.69, 22.23),
(6, 'Chernivtsi', 'chernivtsi', 31.84, 51.31),
(7, 'Rivne', 'rivne', 33.64, 27.05),
(8, 'Zhytomyr', 'zhytomyr', 42.73, 32.49),
(9, 'Khmelnytsk', 'khmelnytsk', 36.02, 40.27),
(10, 'Vinnytsia', 'vinnytsia', 41.26, 42.75),
(11, 'Odessa', 'odessa', 48.54, 72.45),
(12, 'Kyiv', 'kyiv', 49.44, 32.49),
(13, 'Cherkasy', 'cherkasy', 53.46, 39.02),
(14, 'Dnipro', 'dnipro', 65.66, 50.22),
(15, 'Zaporizhzhia', 'zaporizhzhia', 66.64, 56.75),
(16, 'Mykolayiv', 'mykolayiv', 54.6, 65.3),
(17, 'Kherson', 'kherson', 57.14, 68.87),
(18, 'Kryvyi Rih', 'kryvyi-rih', 55.34, 50.37),
(19, 'Kharkiv', 'kharkiv', 69.18, 37.31),
(20, 'Poltava', 'poltava', 65.49, 39.65),
(21, 'Sumy', 'sumy', 62.95, 26.43),
(22, 'Chernihiv', 'chernihiv', 51.41, 18.66),
(23, 'Donetsk', 'donetsk', 76.63, 50.22),
(24, 'Luhansk', 'luhansk', 82.2, 44.47),
(25, 'Mariupol', 'mariupol', 70.73, 67.63),
(26, 'Sevastopol', 'sevastopol', 57.71, 81.78);
