-- Bars in Lviv

use B_and_B;

CREATE TABLE IF NOT EXISTS bars (
  city_id INT UNSIGNED NOT NULL,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  description TEXT,
  price_level TINYINT UNSIGNED,
  phone VARCHAR(32),
  menu_url VARCHAR(255),
  site_url VARCHAR(255),
  slug VARCHAR(255) NOT NULL,
  PRIMARY KEY (id),
  KEY idx_city (city_id),
  UNIQUE KEY uq_slug (slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


INSERT INTO bars (city_id, name, address, description, price_level, phone, menu_url, site_url, slug) VALUES
( 1, 'Golden Lion Lviv 1', 'вул. Дорошенка, 1, Львів, Україна', 'Cozy bar in the center of Lviv with craft beer and local snacks.', 2, '+38032220001', 'https://example.com/bars/golden-lion-lviv-1/menu', 'https://example.com/bars/golden-lion-lviv-1', 'golden-lion-lviv-1'),
( 1, 'Copper Mug 1', 'вул. Галицька, 2, Львів, Україна', 'Modern pub with a wide selection of Ukrainian and European drinks.', 3, '+38032220002', 'https://example.com/bars/copper-mug-1/menu', 'https://example.com/bars/copper-mug-1', 'copper-mug-1'),
( 1, 'Blue Tram 1', 'вул. Краківська, 3, Львів, Україна', 'Basement bar with live music and relaxed atmosphere.', 1, '+38032220003', 'https://example.com/bars/blue-tram-1/menu', 'https://example.com/bars/blue-tram-1', 'blue-tram-1'),
( 1, 'Secret Cellar 1', 'вул. Личаківська, 4, Львів, Україна', 'Small bar with classic cocktails and bar food.', 4, '+38032220004', 'https://example.com/bars/secret-cellar-1/menu', 'https://example.com/bars/secret-cellar-1', 'secret-cellar-1'),
( 1, 'Rynok Pub 1', 'вул. Коперника, 5, Львів, Україна', 'Spacious pub for big companies with board games and sport on TV.', 2, '+38032220005', 'https://example.com/bars/rynok-pub-1/menu', 'https://example.com/bars/rynok-pub-1', 'rynok-pub-1'),
( 1, 'Lions Gate 1', 'вул. Беринди, 6, Львів, Україна', 'Cozy place with local beer and snacks.', 3, '+38032220006', 'https://example.com/bars/lions-gate-1/menu', 'https://example.com/bars/lions-gate-1', 'lions-gate-1'),
( 1, 'Beer Cathedral 1', 'вул. Ференца Ліста, 7, Львів, Україна', 'Craft beer bar with rotating taps and snacks.', 4, '+38032220007', 'https://example.com/bars/beer-cathedral-1/menu', 'https://example.com/bars/beer-cathedral-1', 'beer-cathedral-1'),
( 1, 'Opera House Bar 1', 'вул. Князя Романа, 8, Львів, Україна', 'Stylish bar near the opera with cocktails and wine.', 2, '+38032220008', 'https://example.com/bars/opera-house-bar-1/menu', 'https://example.com/bars/opera-house-bar-1', 'opera-house-bar-1'),
( 1, 'Foggy Street 1', 'просп. Свободи, 9, Львів, Україна', 'Atmospheric bar with dim lights and whisky selection.', 1, '+38032220009', 'https://example.com/bars/foggy-street-1/menu', 'https://example.com/bars/foggy-street-1', 'foggy-street-1'),
( 1, 'Old Town Barrel 1', 'вул. Вірменська, 10, Львів, Україна', 'Pub in the old town with local dishes and beer.', 3, '+38032220010', 'https://example.com/bars/old-town-barrel-1/menu', 'https://example.com/bars/old-town-barrel-1', 'old-town-barrel-1'),
( 1, 'Golden Lion Lviv 2', 'вул. Дорошенка, 11, Львів, Україна', 'Cozy bar in the center of Lviv with craft beer and local snacks.', 1, '+38032220011', 'https://example.com/bars/golden-lion-lviv-2/menu', 'https://example.com/bars/golden-lion-lviv-2', 'golden-lion-lviv-2'),
( 1, 'Copper Mug 2', 'вул. Галицька, 12, Львів, Україна', 'Modern pub with a wide selection of Ukrainian and European drinks.', 2, '+38032220012', 'https://example.com/bars/copper-mug-2/menu', 'https://example.com/bars/copper-mug-2', 'copper-mug-2'),
( 1, 'Blue Tram 2', 'вул. Краківська, 13, Львів, Україна', 'Basement bar with live music and relaxed atmosphere.', 3, '+38032220013', 'https://example.com/bars/blue-tram-2/menu', 'https://example.com/bars/blue-tram-2', 'blue-tram-2'),
( 1, 'Secret Cellar 2', 'вул. Личаківська, 14, Львів, Україна', 'Small bar with classic cocktails and bar food.', 4, '+38032220014', 'https://example.com/bars/secret-cellar-2/menu', 'https://example.com/bars/secret-cellar-2', 'secret-cellar-2'),
( 1, 'Rynok Pub 2', 'вул. Коперника, 15, Львів, Україна', 'Spacious pub for big companies with board games and sport on TV.', 1, '+38032220015', 'https://example.com/bars/rynok-pub-2/menu', 'https://example.com/bars/rynok-pub-2', 'rynok-pub-2'),
( 1, 'Lions Gate 2', 'вул. Беринди, 16, Львів, Україна', 'Cozy place with local beer and snacks.', 2, '+38032220016', 'https://example.com/bars/lions-gate-2/menu', 'https://example.com/bars/lions-gate-2', 'lions-gate-2'),
( 1, 'Beer Cathedral 2', 'вул. Ференца Ліста, 17, Львів, Україна', 'Craft beer bar with rotating taps and snacks.', 3, '+38032220017', 'https://example.com/bars/beer-cathedral-2/menu', 'https://example.com/bars/beer-cathedral-2', 'beer-cathedral-2'),
( 1, 'Opera House Bar 2', 'вул. Князя Романа, 18, Львів, Україна', 'Stylish bar near the opera with cocktails and wine.', 4, '+38032220018', 'https://example.com/bars/opera-house-bar-2/menu', 'https://example.com/bars/opera-house-bar-2', 'opera-house-bar-2'),
( 1, 'Foggy Street 2', 'просп. Свободи, 19, Львів, Україна', 'Atmospheric bar with dim lights and whisky selection.', 2, '+38032220019', 'https://example.com/bars/foggy-street-2/menu', 'https://example.com/bars/foggy-street-2', 'foggy-street-2'),
( 1, 'Old Town Barrel 2', 'вул. Вірменська, 20, Львів, Україна', 'Pub in the old town with local dishes and beer.', 3, '+38032220020', 'https://example.com/bars/old-town-barrel-2/menu', 'https://example.com/bars/old-town-barrel-2', 'old-town-barrel-2'),
( 1, 'Golden Lion Lviv 3', 'вул. Дорошенка, 21, Львів, Україна', 'Cozy bar in the center of Lviv with craft beer and local snacks.', 4, '+38032220021', 'https://example.com/bars/golden-lion-lviv-3/menu', 'https://example.com/bars/golden-lion-lviv-3', 'golden-lion-lviv-3'),
( 1, 'Copper Mug 3', 'вул. Галицька, 22, Львів, Україна', 'Modern pub with a wide selection of Ukrainian and European drinks.', 1, '+38032220022', 'https://example.com/bars/copper-mug-3/menu', 'https://example.com/bars/copper-mug-3', 'copper-mug-3'),
( 1, 'Blue Tram 3', 'вул. Краківська, 23, Львів, Україна', 'Basement bar with live music and relaxed atmosphere.', 2, '+38032220023', 'https://example.com/bars/blue-tram-3/menu', 'https://example.com/bars/blue-tram-3', 'blue-tram-3'),
( 1, 'Secret Cellar 3', 'вул. Личаківська, 24, Львів, Україна', 'Small bar with classic cocktails and bar food.', 3, '+38032220024', 'https://example.com/bars/secret-cellar-3/menu', 'https://example.com/bars/secret-cellar-3', 'secret-cellar-3'),
( 1, 'Rynok Pub 3', 'вул. Коперника, 25, Львів, Україна', 'Spacious pub for big companies with board games and sport on TV.', 4, '+38032220025', 'https://example.com/bars/rynok-pub-3/menu', 'https://example.com/bars/rynok-pub-3', 'rynok-pub-3'),
( 1, 'Lions Gate 3', 'вул. Беринди, 26, Львів, Україна', 'Cozy place with local beer and snacks.', 1, '+38032220026', 'https://example.com/bars/lions-gate-3/menu', 'https://example.com/bars/lions-gate-3', 'lions-gate-3'),
( 1, 'Beer Cathedral 3', 'вул. Ференца Ліста, 27, Львів, Україна', 'Craft beer bar with rotating taps and snacks.', 2, '+38032220027', 'https://example.com/bars/beer-cathedral-3/menu', 'https://example.com/bars/beer-cathedral-3', 'beer-cathedral-3'),
( 1, 'Opera House Bar 3', 'вул. Князя Романа, 28, Львів, Україна', 'Stylish bar near the opera with cocktails and wine.', 3, '+38032220028', 'https://example.com/bars/opera-house-bar-3/menu', 'https://example.com/bars/opera-house-bar-3', 'opera-house-bar-3'),
( 1, 'Foggy Street 3', 'просп. Свободи, 29, Львів, Україна', 'Atmospheric bar with dim lights and whisky selection.', 4, '+38032220029', 'https://example.com/bars/foggy-street-3/menu', 'https://example.com/bars/foggy-street-3', 'foggy-street-3'),
( 1, 'Old Town Barrel 3', 'вул. Вірменська, 30, Львів, Україна', 'Pub in the old town with local dishes and beer.', 1, '+38032220030', 'https://example.com/bars/old-town-barrel-3/menu', 'https://example.com/bars/old-town-barrel-3', 'old-town-barrel-3'),
( 1, 'Golden Lion Lviv 4', 'вул. Дорошенка, 31, Львів, Україна', 'Cozy bar in the center of Lviv with craft beer and local snacks.', 2, '+38032220031', 'https://example.com/bars/golden-lion-lviv-4/menu', 'https://example.com/bars/golden-lion-lviv-4', 'golden-lion-lviv-4'),
( 1, 'Copper Mug 4', 'вул. Галицька, 32, Львів, Україна', 'Modern pub with a wide selection of Ukrainian and European drinks.', 3, '+38032220032', 'https://example.com/bars/copper-mug-4/menu', 'https://example.com/bars/copper-mug-4', 'copper-mug-4'),
( 1, 'Blue Tram 4', 'вул. Краківська, 33, Львів, Україна', 'Basement bar with live music and relaxed atmosphere.', 4, '+38032220033', 'https://example.com/bars/blue-tram-4/menu', 'https://example.com/bars/blue-tram-4', 'blue-tram-4'),
( 1, 'Secret Cellar 4', 'вул. Личаківська, 34, Львів, Україна', 'Small bar with classic cocktails and bar food.', 1, '+38032220034', 'https://example.com/bars/secret-cellar-4/menu', 'https://example.com/bars/secret-cellar-4', 'secret-cellar-4'),
( 1, 'Rynok Pub 4', 'вул. Коперника, 35, Львів, Україна', 'Spacious pub for big companies with board games and sport on TV.', 2, '+38032220035', 'https://example.com/bars/rynok-pub-4/menu', 'https://example.com/bars/rynok-pub-4', 'rynok-pub-4'),
( 1, 'Lions Gate 4', 'вул. Беринди, 36, Львів, Україна', 'Cozy place with local beer and snacks.', 3, '+38032220036', 'https://example.com/bars/lions-gate-4/menu', 'https://example.com/bars/lions-gate-4', 'lions-gate-4'),
( 1, 'Beer Cathedral 4', 'вул. Ференца Ліста, 37, Львів, Україна', 'Craft beer bar with rotating taps and snacks.', 4, '+38032220037', 'https://example.com/bars/beer-cathedral-4/menu', 'https://example.com/bars/beer-cathedral-4', 'beer-cathedral-4'),
( 1, 'Opera House Bar 4', 'вул. Князя Романа, 38, Львів, Україна', 'Stylish bar near the opera with cocktails and wine.', 1, '+38032220038', 'https://example.com/bars/opera-house-bar-4/menu', 'https://example.com/bars/opera-house-bar-4', 'opera-house-bar-4'),
( 1, 'Foggy Street 4', 'просп. Свободи, 39, Львів, Україна', 'Atmospheric bar with dim lights and whisky selection.', 2, '+38032220039', 'https://example.com/bars/foggy-street-4/menu', 'https://example.com/bars/foggy-street-4', 'foggy-street-4'),
( 1, 'Old Town Barrel 4', 'вул. Вірменська, 40, Львів, Україна', 'Pub in the old town with local dishes and beer.', 3, '+38032220040', 'https://example.com/bars/old-town-barrel-4/menu', 'https://example.com/bars/old-town-barrel-4', 'old-town-barrel-4'),
( 1, 'Golden Lion Lviv 5', 'вул. Дорошенка, 41, Львів, Україна', 'Cozy bar in the center of Lviv with craft beer and local snacks.', 4, '+38032220041', 'https://example.com/bars/golden-lion-lviv-5/menu', 'https://example.com/bars/golden-lion-lviv-5', 'golden-lion-lviv-5'),
( 1, 'Copper Mug 5', 'вул. Галицька, 42, Львів, Україна', 'Modern pub with a wide selection of Ukrainian and European drinks.', 1, '+38032220042', 'https://example.com/bars/copper-mug-5/menu', 'https://example.com/bars/copper-mug-5', 'copper-mug-5'),
( 1, 'Blue Tram 5', 'вул. Краківська, 43, Львів, Україна', 'Basement bar with live music and relaxed atmosphere.', 2, '+38032220043', 'https://example.com/bars/blue-tram-5/menu', 'https://example.com/bars/blue-tram-5', 'blue-tram-5'),
( 1, 'Secret Cellar 5', 'вул. Личаківська, 44, Львів, Україна', 'Small bar with classic cocktails and bar food.', 3, '+38032220044', 'https://example.com/bars/secret-cellar-5/menu', 'https://example.com/bars/secret-cellar-5', 'secret-cellar-5'),
( 1, 'Rynok Pub 5', 'вул. Коперника, 45, Львів, Україна', 'Spacious pub for big companies with board games and sport on TV.', 4, '+38032220045', 'https://example.com/bars/rynok-pub-5/menu', 'https://example.com/bars/rynok-pub-5', 'rynok-pub-5'),
( 1, 'Lions Gate 5', 'вул. Беринди, 46, Львів, Україна', 'Cozy place with local beer and snacks.', 1, '+38032220046', 'https://example.com/bars/lions-gate-5/menu', 'https://example.com/bars/lions-gate-5', 'lions-gate-5'),
(1, 'Beer Cathedral 5', 'вул. Ференца Ліста, 47, Львів, Україна', 'Craft beer bar with rotating taps and snacks.', 2, '+38032220047', 'https://example.com/bars/beer-cathedral-5/menu', 'https://example.com/bars/beer-cathedral-5', 'beer-cathedral-5'),
(1, 'Opera House Bar 5', 'вул. Князя Романа, 48, Львів, Україна', 'Stylish bar near the opera with cocktails and wine.', 3, '+38032220048', 'https://example.com/bars/opera-house-bar-5/menu', 'https://example.com/bars/opera-house-bar-5', 'opera-house-bar-5'),
(1, 'Foggy Street 5', 'просп. Свободи, 49, Львів, Україна', 'Atmospheric bar with dim lights and whisky selection.', 4, '+38032220049', 'https://example.com/bars/foggy-street-5/menu', 'https://example.com/bars/foggy-street-5', 'foggy-street-5'),
(1, 'Old Town Barrel 5', 'вул. Вірменська, 50, Львів, Україна', 'Pub in the old town with local dishes and beer.', 1, '+38032220050', 'https://example.com/bars/old-town-barrel-5/menu', 'https://example.com/bars/old-town-barrel-5', 'old-town-barrel-5'),
(1, 'Golden Lion Lviv 6', 'вул. Дорошенка, 52, Львів, Україна', 'Cozy bar in the center of Lviv with craft beer and local snacks.', 2, '+38032220051', 'https://example.com/bars/golden-lion-lviv-6/menu', 'https://example.com/bars/golden-lion-lviv-6', 'golden-lion-lviv-6'),
(1, 'Copper Mug 6', 'вул. Галицька, 52, Львів, Україна', 'Modern pub with a wide selection of Ukrainian and European drinks.', 3, '+38032220052', 'https://example.com/bars/copper-mug-6/menu', 'https://example.com/bars/copper-mug-6', 'copper-mug-6'),
(1, 'Blue Tram 6', 'вул. Краківська, 53, Львів, Україна', 'Basement bar with live music and relaxed atmosphere.', 4, '+38032220053', 'https://example.com/bars/blue-tram-6/menu', 'https://example.com/bars/blue-tram-6', 'blue-tram-6'),
(1, 'Secret Cellar 6', 'вул. Личаківська, 54, Львів, Україна', 'Small bar with classic cocktails and bar food.', 1, '+38032220054', 'https://example.com/bars/secret-cellar-6/menu', 'https://example.com/bars/secret-cellar-6', 'secret-cellar-6'),
(1, 'Rynok Pub 6', 'вул. Коперника, 55, Львів, Україна', 'Spacious pub for big companies with board games and sport on TV.', 2, '+38032220055', 'https://example.com/bars/rynok-pub-6/menu', 'https://example.com/bars/rynok-pub-6', 'rynok-pub-6'),
(1, 'Lions Gate 6', 'вул. Беринди, 56, Львів, Україна', 'Cozy place with local beer and snacks.', 3, '+38032220056', 'https://example.com/bars/lions-gate-6/menu', 'https://example.com/bars/lions-gate-6', 'lions-gate-6'),
(1, 'Beer Cathedral 6', 'вул. Ференца Ліста, 57, Львів, Україна', 'Craft beer bar with rotating taps and snacks.', 4, '+38032220057', 'https://example.com/bars/beer-cathedral-6/menu', 'https://example.com/bars/beer-cathedral-6', 'beer-cathedral-6'),
(1, 'Opera House Bar 6', 'вул. Князя Романа, 58, Львів, Україна', 'Stylish bar near the opera with cocktails and wine.', 1, '+38032220058', 'https://example.com/bars/opera-house-bar-6/menu', 'https://example.com/bars/opera-house-bar-6', 'opera-house-bar-6'),
(1, 'Foggy Street 6', 'просп. Свободи, 59, Львів, Україна', 'Atmospheric bar with dim lights and whisky selection.', 2, '+38032220059', 'https://example.com/bars/foggy-street-6/menu', 'https://example.com/bars/foggy-street-6', 'foggy-street-6'),
(1, 'Old Town Barrel 6', 'вул. Вірменська, 60, Львів, Україна', 'Pub in the old town with local dishes and beer.', 3, '+38032220060', 'https://example.com/bars/old-town-barrel-6/menu', 'https://example.com/bars/old-town-barrel-6', 'old-town-barrel-6'),
(1, 'Golden Lion Lviv 7', 'вул. Дорошенка, 61, Львів, Україна', 'Cozy bar in the center of Lviv with craft beer and local snacks.', 4, '+38032220061', 'https://example.com/bars/golden-lion-lviv-7/menu', 'https://example.com/bars/golden-lion-lviv-7', 'golden-lion-lviv-7'),
(1, 'Copper Mug 7', 'вул. Галицька, 62, Львів, Україна', 'Modern pub with a wide selection of Ukrainian and European drinks.', 1, '+38032220062', 'https://example.com/bars/copper-mug-7/menu', 'https://example.com/bars/copper-mug-7', 'copper-mug-7'),
(1, 'Blue Tram 7', 'вул. Краківська, 63, Львів, Україна', 'Basement bar with live music and relaxed atmosphere.', 2, '+38032220063', 'https://example.com/bars/blue-tram-7/menu', 'https://example.com/bars/blue-tram-7', 'blue-tram-7'),
(1, 'Secret Cellar 7', 'вул. Личаківська, 64, Львів, Україна', 'Small bar with classic cocktails and bar food.', 3, '+38032220064', 'https://example.com/bars/secret-cellar-7/menu', 'https://example.com/bars/secret-cellar-7', 'secret-cellar-7'),
(1, 'Rynok Pub 7', 'вул. Коперника, 65, Львів, Україна', 'Spacious pub for big companies with board games and sport on TV.', 4, '+38032220065', 'https://example.com/bars/rynok-pub-7/menu', 'https://example.com/bars/rynok-pub-7', 'rynok-pub-7'),
(1, 'Lions Gate 7', 'вул. Беринди, 66, Львів, Україна', 'Cozy place with local beer and snacks.', 1, '+38032220066', 'https://example.com/bars/lions-gate-7/menu', 'https://example.com/bars/lions-gate-7', 'lions-gate-7'),
(1, 'Beer Cathedral 7', 'вул. Ференца Ліста, 67, Львів, Україна', 'Craft beer bar with rotating taps and snacks.', 2, '+38032220067', 'https://example.com/bars/beer-cathedral-7/menu', 'https://example.com/bars/beer-cathedral-7', 'beer-cathedral-7'),
(1, 'Opera House Bar 7', 'вул. Князя Романа, 68, Львів, Україна', 'Stylish bar near the opera with cocktails and wine.', 3, '+38032220068', 'https://example.com/bars/opera-house-bar-7/menu', 'https://example.com/bars/opera-house-bar-7', 'opera-house-bar-7'),
(1, 'Foggy Street 7', 'просп. Свободи, 69, Львів, Україна', 'Atmospheric bar with dim lights and whisky selection.', 4, '+38032220069', 'https://example.com/bars/foggy-street-7/menu', 'https://example.com/bars/foggy-street-7', 'foggy-street-7'),
(1, 'Old Town Barrel 7', 'вул. Вірменська, 70, Львів, Україна', 'Pub in the old town with local dishes and beer.', 1, '+38032220070', 'https://example.com/bars/old-town-barrel-7/menu', 'https://example.com/bars/old-town-barrel-7', 'old-town-barrel-7'),
(1, 'Golden Lion Lviv 8', 'вул. Дорошенка, 71, Львів, Україна', 'Cozy bar in the center of Lviv with craft beer and local snacks.', 2, '+38032220071', 'https://example.com/bars/golden-lion-lviv-8/menu', 'https://example.com/bars/golden-lion-lviv-8', 'golden-lion-lviv-8'),
(1, 'Copper Mug 8', 'вул. Галицька, 72, Львів, Україна', 'Modern pub with a wide selection of Ukrainian and European drinks.', 3, '+38032220072', 'https://example.com/bars/copper-mug-8/menu', 'https://example.com/bars/copper-mug-8', 'copper-mug-8'),
(1, 'Blue Tram 8', 'вул. Краківська, 73, Львів, Україна', 'Basement bar with live music and relaxed atmosphere.', 4, '+38032220073', 'https://example.com/bars/blue-tram-8/menu', 'https://example.com/bars/blue-tram-8', 'blue-tram-8'),
(1, 'Secret Cellar 8', 'вул. Личаківська, 74, Львів, Україна', 'Small bar with classic cocktails and bar food.', 1, '+38032220074', 'https://example.com/bars/secret-cellar-8/menu', 'https://example.com/bars/secret-cellar-8', 'secret-cellar-8'),
(1, 'Rynok Pub 8', 'вул. Коперника, 75, Львів, Україна', 'Spacious pub for big companies with board games and sport on TV.', 2, '+38032220075', 'https://example.com/bars/rynok-pub-8/menu', 'https://example.com/bars/rynok-pub-8', 'rynok-pub-8'),
(1, 'Lions Gate 8', 'вул. Беринди, 76, Львів, Україна', 'Cozy place with local beer and snacks.', 3, '+38032220076', 'https://example.com/bars/lions-gate-8/menu', 'https://example.com/bars/lions-gate-8', 'lions-gate-8'),
(1, 'Beer Cathedral 8', 'вул. Ференца Ліста, 77, Львів, Україна', 'Craft beer bar with rotating taps and snacks.', 4, '+38032220077', 'https://example.com/bars/beer-cathedral-8/menu', 'https://example.com/bars/beer-cathedral-8', 'beer-cathedral-8'),
(1, 'Opera House Bar 8', 'вул. Князя Романа, 78, Львів, Україна', 'Stylish bar near the opera with cocktails and wine.', 1, '+38032220078', 'https://example.com/bars/opera-house-bar-8/menu', 'https://example.com/bars/opera-house-bar-8', 'opera-house-bar-8'),
(1, 'Foggy Street 8', 'просп. Свободи, 79, Львів, Україна', 'Atmospheric bar with dim lights and whisky selection.', 2, '+38032220079', 'https://example.com/bars/foggy-street-8/menu', 'https://example.com/bars/foggy-street-8', 'foggy-street-8'),
(1, 'Old Town Barrel 8', 'вул. Вірменська, 80, Львів, Україна', 'Pub in the old town with local dishes and beer.', 3, '+38032220080', 'https://example.com/bars/old-town-barrel-8/menu', 'https://example.com/bars/old-town-barrel-8', 'old-town-barrel-8'),
(1, 'Golden Lion Lviv 9', 'вул. Дорошенка, 81, Львів, Україна', 'Cozy bar in the center of Lviv with craft beer and local snacks.', 4, '+38032220081', 'https://example.com/bars/golden-lion-lviv-9/menu', 'https://example.com/bars/golden-lion-lviv-9', 'golden-lion-lviv-9'),
(1, 'Copper Mug 9', 'вул. Галицька, 82, Львів, Україна', 'Modern pub with a wide selection of Ukrainian and European drinks.', 1, '+38032220082', 'https://example.com/bars/copper-mug-9/menu', 'https://example.com/bars/copper-mug-9', 'copper-mug-9'),
(1, 'Blue Tram 9', 'вул. Краківська, 83, Львів, Україна', 'Basement bar with live music and relaxed atmosphere.', 2, '+38032220083', 'https://example.com/bars/blue-tram-9/menu', 'https://example.com/bars/blue-tram-9', 'blue-tram-9'),
(1, 'Secret Cellar 9', 'вул. Личаківська, 84, Львів, Україна', 'Small bar with classic cocktails and bar food.', 3, '+38032220084', 'https://example.com/bars/secret-cellar-9/menu', 'https://example.com/bars/secret-cellar-9', 'secret-cellar-9'),
(1, 'Rynok Pub 9', 'вул. Коперника, 85, Львів, Україна', 'Spacious pub for big companies with board games and sport on TV.', 4, '+38032220085', 'https://example.com/bars/rynok-pub-9/menu', 'https://example.com/bars/rynok-pub-9', 'rynok-pub-9'),
(1, 'Lions Gate 9', 'вул. Беринди, 86, Львів, Україна', 'Cozy place with local beer and snacks.', 1, '+38032220086', 'https://example.com/bars/lions-gate-9/menu', 'https://example.com/bars/lions-gate-9', 'lions-gate-9'),
(1, 'Beer Cathedral 9', 'вул. Ференца Ліста, 87, Львів, Україна', 'Craft beer bar with rotating taps and snacks.', 2, '+38032220087', 'https://example.com/bars/beer-cathedral-9/menu', 'https://example.com/bars/beer-cathedral-9', 'beer-cathedral-9'),
(1, 'Opera House Bar 9', 'вул. Князя Романа, 88, Львів, Україна', 'Stylish bar near the opera with cocktails and wine.', 3, '+38032220088', 'https://example.com/bars/opera-house-bar-9/menu', 'https://example.com/bars/opera-house-bar-9', 'opera-house-bar-9'),
(1, 'Foggy Street 9', 'просп. Свободи, 89, Львів, Україна', 'Atmospheric bar with dim lights and whisky selection.', 4, '+38032220089', 'https://example.com/bars/foggy-street-9/menu', 'https://example.com/bars/foggy-street-9', 'foggy-street-9'),
(1, 'Old Town Barrel 9', 'вул. Вірменська, 90, Львів, Україна', 'Pub in the old town with local dishes and beer.', 1, '+38032220090', 'https://example.com/bars/old-town-barrel-9/menu', 'https://example.com/bars/old-town-barrel-9', 'old-town-barrel-9'),
(1, 'Golden Lion Lviv 10', 'вул. Дорошенка, 91, Львів, Україна', 'Cozy bar in the center of Lviv with craft beer and local snacks.', 2, '+38032220091', 'https://example.com/bars/golden-lion-lviv-10/menu', 'https://example.com/bars/golden-lion-lviv-10', 'golden-lion-lviv-10'),
(1, 'Copper Mug 10', 'вул. Галицька, 92, Львів, Україна', 'Modern pub with a wide selection of Ukrainian and European drinks.', 3, '+38032220092', 'https://example.com/bars/copper-mug-10/menu', 'https://example.com/bars/copper-mug-10', 'copper-mug-10'),
(1, 'Blue Tram 10', 'вул. Краківська, 93, Львів, Україна', 'Basement bar with live music and relaxed atmosphere.', 4, '+38032220093', 'https://example.com/bars/blue-tram-10/menu', 'https://example.com/bars/blue-tram-10', 'blue-tram-10'),
(1, 'Secret Cellar 10', 'вул. Личаківська, 94, Львів, Україна', 'Small bar with classic cocktails and bar food.', 1, '+38032220094', 'https://example.com/bars/secret-cellar-10/menu', 'https://example.com/bars/secret-cellar-10', 'secret-cellar-10'),
(1, 'Rynok Pub 10', 'вул. Коперника, 95, Львів, Україна', 'Spacious pub for big companies with board games and sport on TV.', 2, '+38032220095', 'https://example.com/bars/rynok-pub-10/menu', 'https://example.com/bars/rynok-pub-10', 'rynok-pub-10'),
(1, 'Lions Gate 10', 'вул. Беринди, 96, Львів, Україна', 'Cozy place with local beer and snacks.', 3, '+38032220096', 'https://example.com/bars/lions-gate-10/menu', 'https://example.com/bars/lions-gate-10', 'lions-gate-10'),
(1, 'Beer Cathedral 10', 'вул. Ференца Ліста, 97, Львів, Україна', 'Craft beer bar with rotating taps and snacks.', 4, '+38032220097', 'https://example.com/bars/beer-cathedral-10/menu', 'https://example.com/bars/beer-cathedral-10', 'beer-cathedral-10'),
(1, 'Opera House Bar 10', 'вул. Князя Романа, 98, Львів, Україна', 'Stylish bar near the opera with cocktails and wine.', 1, '+38032220098', 'https://example.com/bars/opera-house-bar-10/menu', 'https://example.com/bars/opera-house-bar-10', 'opera-house-bar-10'),
(1, 'Foggy Street 10', 'просп. Свободи, 99, Львів, Україна', 'Atmospheric bar with dim lights and whisky selection.', 2, '+38032220099', 'https://example.com/bars/foggy-street-10/menu', 'https://example.com/bars/foggy-street-10', 'foggy-street-10'),
(1, 'Old Town Barrel 10', 'вул. Вірменська, 100, Львів, Україна', 'Pub in the old town with local dishes and beer.', 3, '+38032220100', 'https://example.com/bars/old-town-barrel-10/menu', 'https://example.com/bars/old-town-barrel-10', 'old-town-barrel-10');


ALTER TABLE bars
ADD COLUMN menu_url VARCHAR(255) AFTER phone;

ALTER TABLE bars
ADD COLUMN site_url VARCHAR(255) AFTER menu_url;

ALTER TABLE bars
DROP PRIMARY KEY;

ALTER TABLE bars
MODIFY id INT UNSIGNED NOT NULL;

ALTER TABLE bars
DROP COLUMN id;

ALTER TABLE bars
ADD PRIMARY KEY (slug);