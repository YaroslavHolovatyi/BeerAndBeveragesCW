use B_and_B;

--    Achievements  

CREATE TABLE IF NOT EXISTS achievements (
    id INT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(64) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(32) NOT NULL,
    race VARCHAR(32) NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO achievements (code, name, description, category, race) VALUES
-- I. General bar achievements (1–60)
('FIRST_STEP_INTO_TAVERN', 'First Step Into The Tavern', 'Visit your first bar.', 'general', NULL),
('URBAN_EXPLORER', 'Urban Explorer', 'Visit 5 different bars in your city.', 'general', NULL),
('BAR_TOURIST', 'Bar Tourist', 'Visit 10 different bars.', 'general', NULL),
('CITY_CRAWLER', 'City Crawler', 'Visit 20 different bars.', 'general', NULL),
('NIGHT_WANDERER', 'Night Wanderer', 'Visit 30 bars after 20:00.', 'general', NULL),
('MIDNIGHT_SEEKER', 'Midnight Seeker', 'Visit 10 bars after midnight.', 'general', NULL),
('DAWN_SURVIVOR', 'Dawn Survivor', 'Leave a bar after 05:00.', 'general', NULL),
('TRIPLE_SHOT_ROUTE', 'Triple Shot Route', 'Visit 3 bars in one night.', 'general', NULL),
('PUB_MARATHON', 'Pub Marathon', 'Visit 5 bars in one night.', 'general', NULL),
('TAVERN_CONQUEROR', 'Tavern Conqueror', 'Visit 15 different bars in your home city.', 'general', NULL),
('WORLD_OF_TAVERNS', 'World of Taverns', 'Visit 30 bars across different cities.', 'general', NULL),
('CAPITAL_DRUNKARD', 'Capital Drunkard', 'Visit 10 bars in Kyiv.', 'general', NULL),
('LVIV_ENCHANTER', 'Lviv Enchanter', 'Visit 10 bars in Lviv.', 'general', NULL),
('ODESA_BREEZE', 'Odesa Breeze', 'Visit 10 bars in Odesa.', 'general', NULL),
('DNIPRO_DAWNBREAKER', 'Dnipro Dawnbreaker', 'Visit 10 bars in Dnipro.', 'general', NULL),

('ALE_APPRENTICE', 'Ale Apprentice', 'Try 5 different ales.', 'general', NULL),
('DARK_BREW_MASTER', 'Dark Brew Master', 'Try 10 different dark beers.', 'general', NULL),
('HOP_CONNOISSEUR', 'Hop Connoisseur', 'Try 5 different IPAs.', 'general', NULL),
('GOLDEN_LAGER_LORD', 'Golden Lager Lord', 'Try 10 different lagers.', 'general', NULL),
('VINE_WHISPERER', 'Vine Whisperer', 'Try 5 different wines.', 'general', NULL),
('WINE_SCHOLAR', 'Wine Scholar', 'Try 15 different wines.', 'general', NULL),
('SPIRIT_SUMMONER', 'Spirit Summoner', 'Try 5 different strong spirits.', 'general', NULL),
('FLAME_DRINKER', 'Flame Drinker', 'Try 10 different whiskies.', 'general', NULL),
('VODKA_VETERAN', 'Vodka Veteran', 'Try 10 different vodkas.', 'general', NULL),
('COCKTAIL_EXPLORER', 'Cocktail Explorer', 'Try 10 different cocktails.', 'general', NULL),
('MASTER_OF_MIXOLOGY', 'Master of Mixology', 'Try 25 different cocktails.', 'general', NULL),
('SWEET_TOOTH', 'Sweet Tooth', 'Try 5 dessert drinks.', 'general', NULL),
('SOUR_ALCHEMIST', 'Sour Alchemist', 'Try 5 sour cocktails.', 'general', NULL),
('POTION_COLLECTOR', 'Potion Collector', 'Try 50 different drinks in total.', 'general', NULL),

('SNACK_BEGINNER', 'Snack Beginner', 'Order 5 different snacks.', 'general', NULL),
('GRILL_DEVOTEE', 'Grill Devotee', 'Order 10 grilled or meat dishes.', 'general', NULL),
('CHEESE_ORACLE', 'Cheese Oracle', 'Order 10 cheese plates.', 'general', NULL),
('SEAFOOD_SORCERER', 'Seafood Sorcerer', 'Order 5 seafood dishes.', 'general', NULL),
('MASTER_OF_APPETIZERS', 'Master of Appetizers', 'Order 20 different dishes.', 'general', NULL),

('NEW_CRITIC', 'New Critic', 'Leave your first review.', 'general', NULL),
('RELIABLE_REVIEWER', 'Reliable Reviewer', 'Leave 5 reviews.', 'general', NULL),
('VOICE_OF_THE_TAVERN', 'Voice of the Tavern', 'Leave 10 reviews.', 'general', NULL),
('HONEST_JUDGE', 'Honest Judge', 'Give 20 ratings to bars.', 'general', NULL),
('GOLDEN_REVIEWER', 'Golden Reviewer', 'Have an average rating above 4.5 on your reviews.', 'general', NULL),
('HARSH_BUT_FAIR', 'Harsh But Fair', 'Give 5 low ratings to bars.', 'general', NULL),

('FIRST_FAVORITE', 'First Favorite', 'Add a bar to your favorites.', 'general', NULL),
('COLLECTOR_OF_TAVERNS', 'Collector of Taverns', 'Add 10 bars to your favorites.', 'general', NULL),
('HEART_OF_THE_CITY', 'Heart of the City', 'Have 3 favorites in your home city.', 'general', NULL),
('TAVERN_ARCHIVIST', 'Tavern Archivist', 'Add 20 bars to your favorites.', 'general', NULL),

('SPEAKEASY_FINDER', 'Speakeasy Finder', 'Visit 3 hidden entrance or speakeasy bars.', 'general', NULL),
('ROOFTOP_WANDERER', 'Rooftop Wanderer', 'Visit 3 rooftop bars.', 'general', NULL),
('DUNGEON_DRINKER', 'Dungeon Drinker', 'Visit 3 basement bars.', 'general', NULL),
('LIVE_MUSIC_LOVER', 'Live Music Lover', 'Visit 5 bars with live music.', 'general', NULL),
('CRAFT_BEER_HUNTER', 'Craft Beer Hunter', 'Visit 5 craft beer bars.', 'general', NULL),
('WINE_CELLAR_EXPLORER', 'Wine Cellar Explorer', 'Visit 3 wine-focused bars.', 'general', NULL),
('TIKI_TRAVELLER', 'Tiki Traveller', 'Visit 3 tiki or tropical themed bars.', 'general', NULL),
('GOTHIC_DRINKER', 'Gothic Drinker', 'Visit 3 dark or gothic themed bars.', 'general', NULL),
('RETRO_SOUL', 'Retro Soul', 'Visit 5 retro style bars.', 'general', NULL),
('LUXURY_SIPPER', 'Luxury Sipper', 'Visit 5 premium or fine bars.', 'general', NULL),
('STREET_BAR_ENJOYER', 'Street Bar Enjoyer', 'Visit 5 street or open air bars.', 'general', NULL),
('METAL_TAVERN_SUPPORTER', 'Metal Tavern Supporter', 'Visit 3 rock or metal bars.', 'general', NULL),
('OLD_TOWN_DRINKER', 'Old Town Drinker', 'Visit 5 bars in historical city centers.', 'general', NULL),
('RITUAL_OF_FIRE', 'Ritual of Fire', 'Visit a bar with a fire show or flaming drinks.', 'general', NULL),
('ARCANE_MENU_MASTER', 'Arcane Menu Master', 'Try a special or secret menu in a bar.', 'general', NULL),
('HIDDEN_GEM_DISCOVERER', 'Hidden Gem Discoverer', 'Leave a positive review on a low rated bar and help improve its rating.', 'general', NULL),

-- II. Social & interactive achievements (61–87)
('FIRST_COMPANION', 'First Companion', 'Add your first friend.', 'social', NULL),
('DRINKING_PARTY', 'Drinking Party', 'Have 3 friends in your list.', 'social', NULL),
('GUILD_FOUNDER', 'Guild Founder', 'Have 5 friends in your list.', 'social', NULL),
('SOCIAL_ALCHEMIST', 'Social Alchemist', 'Have 10 friends in your list.', 'social', NULL),
('FELLOWSHIP_OF_THE_MUG', 'Fellowship of the Mug', 'Have 15 friends in your list.', 'social', NULL),

('SHARED_PINT', 'Shared Pint', 'Visit a bar together with a friend.', 'social', NULL),
('NIGHT_GUILD', 'Night Guild', 'Visit 3 bars with friends.', 'social', NULL),
('TAVERN_BROTHERHOOD', 'Tavern Brotherhood', 'Have 10 shared visits with friends.', 'social', NULL),
('EPIC_COMPANY', 'Epic Company', 'Go to a bar with 5 or more friends at once.', 'social', NULL),

('AVATAR_UPDATED', 'Avatar Updated', 'Upload or change your profile avatar.', 'social', NULL),
('HEROS_WALL', 'Hero’s Wall', 'Select 5 achievements to display on your profile.', 'social', NULL),
('IDENTITY_FORGED', 'Identity Forged', 'Retake the race quiz and change your race.', 'social', NULL),
('TRUE_SELF', 'True Self', 'Keep the same race for 30 days in a row.', 'social', NULL),

('REACTION_ROOKIE', 'Reaction Rookie', 'Give 5 likes to reviews or places.', 'social', NULL),
('FRIENDLY_SPIRIT', 'Friendly Spirit', 'Receive 10 likes from other users.', 'social', NULL),
('POPULAR_SOUL', 'Popular Soul', 'Receive 25 likes from other users.', 'social', NULL),
('TAVERN_CELEBRITY', 'Tavern Celebrity', 'Receive 50 or more total likes.', 'social', NULL),

('CITY_JUMPER', 'City Jumper', 'Visit bars in 2 different cities.', 'social', NULL),
('WANDERER_OF_REALMS', 'Wanderer of Realms', 'Visit bars in 5 different cities.', 'social', NULL),
('CONTINENTAL_DRINKER', 'Continental Drinker', 'Visit bars in 10 different cities.', 'social', NULL),
('NATIONAL_PUB_EXPLORER', 'National Pub Explorer', 'Visit bars in all major cities of Ukraine.', 'social', NULL),
('PILGRIM_OF_NIGHTS', 'Pilgrim of Nights', 'Travel to another city just to go to a specific bar.', 'social', NULL),

('BILL_SPLITTER', 'Bill Splitter', 'Create your first bill in the app.', 'social', NULL),
('MATH_MAGE', 'Math Mage', 'Split a bill between 3 or more participants.', 'social', NULL),
('ACCOUNTANT_OF_ALE', 'Accountant of Ale', 'Create 10 bills in the app.', 'social', NULL),
('BILL_HISTORIAN', 'Bill Historian', 'Create 30 bills in the app.', 'social', NULL),
('DRUNKEN_ECONOMIST', 'Drunken Economist', 'Split a complex bill correctly without errors.', 'social', NULL),

-- III. Style / behavior achievements (88–108)
('SLOW_SIPPER', 'Slow Sipper', 'Drink slowly for an entire evening.', 'style', NULL),
('FAST_AND_FURIOUS', 'Fast & Furious', 'Drink 3 drinks in under 20 minutes.', 'style', NULL),
('SOCIAL_SPIRIT', 'Social Spirit', 'Talk to 5 new people in bars.', 'style', NULL),
('SILENT_PHILOSOPHER', 'Silent Philosopher', 'Spend an evening alone at a bar.', 'style', NULL),
('BAR_COUNTER_CHAMPION', 'Bar Counter Champion', 'Spend the whole evening sitting at the bar counter.', 'style', NULL),
('DANCEFLOOR_FLAME', 'Dancefloor Flame', 'Dance at least 3 times in one night.', 'style', NULL),
('TRIVIA_HERO', 'Trivia Hero', 'Win or place top in a quiz or trivia evening.', 'style', NULL),
('GAME_MASTER', 'Game Master', 'Join a board game or tabletop event in a bar.', 'style', NULL),
('KARAOKE_DRAGON', 'Karaoke Dragon', 'Sing a song at karaoke in a bar.', 'style', NULL),
('CALM_GUARDIAN', 'Calm Guardian', 'Do not get drunk for 10 visits in a row.', 'style', NULL),
('STORM_UNLEASHED', 'Storm Unleashed', 'Reach the maximum drunk level in one night.', 'style', NULL),
('PHOTOS_OF_THE_FEAST', 'Photos of the Feast', 'Take and save 10 photos of food or drinks.', 'style', NULL),
('NO_PHONE_MODE', 'No Phone Mode', 'Spend one whole night in a bar without using your phone.', 'style', NULL),
('GENEROUS_SOUL', 'Generous Soul', 'Pay for someone else’s drink.', 'style', NULL),
('TIP_MASTER', 'Tip Master', 'Leave a tip of 20% or more.', 'style', NULL),
('EMPLOYEES_FRIEND', 'Employee’s Friend', 'Receive a compliment or free item from staff.', 'style', NULL),
('LOST_AND_FOUND', 'Lost and Found', 'Get lost or take a wrong turn on the way to a bar.', 'style', NULL),
('FIREBREATHER', 'Firebreather', 'Drink a very strong or flaming drink.', 'style', NULL),
('ICEBORN', 'Iceborn', 'Drink a set of extra cold drinks.', 'style', NULL),
('POTION_OF_COURAGE', 'Potion of Courage', 'Talk to a stranger after a drink.', 'style', NULL),
('BARD_OF_THE_NIGHT', 'Bard of the Night', 'Create and say your own toast.', 'style', NULL),

-- IV. Legendary achievements (109–118)
('DRAGONS_FLAME_CHALLENGE', 'Dragon’s Flame Challenge', 'Drink 5 different whiskies in a single evening.', 'legendary', NULL),
('ALEFATHERS_BLESSING', 'Alefather’s Blessing', 'Try 100 different drinks in total.', 'legendary', NULL),
('CHAMPION_OF_CITIES', 'Champion of Cities', 'Visit bars in 30 different cities.', 'legendary', NULL),
('LORD_OF_THE_NIGHT', 'Lord of the Night', 'Visit 100 different bars in total.', 'legendary', NULL),
('ANCIENT_REVIEWER', 'Ancient Reviewer', 'Write 100 reviews.', 'legendary', NULL),
('GOLDEN_MUG_BEARER', 'Golden Mug Bearer', 'Maintain a perfect 5.0 rating on your profile.', 'legendary', NULL),
('IMMORTAL_HANGOVER', 'Immortal Hangover', 'Go to bars 3 nights in a row.', 'legendary', NULL),
('UNBREAKABLE_SPIRIT', 'Unbreakable Spirit', 'Never cancel a planned bar visit for 10 plans in a row.', 'legendary', NULL),
('TAVERN_MYTH', 'Tavern Myth', 'Become the most popular profile in your city.', 'legendary', NULL),
('CHOSEN_OF_THE_RACES', 'Chosen of the Races', 'Complete all race related scenarios or achievements.', 'legendary', NULL),

-- V. Race achievements (119–150)

-- Aasimar
('HOLY_BREW', 'Holy Brew', 'As Aasimar, drink 5 light themed cocktails.', 'race', 'Aasimar'),
('ANGELS_GLOW', 'Angel’s Glow', 'As Aasimar, visit 3 bright or elegant bars.', 'race', 'Aasimar'),
('CELESTIAL_TOAST', 'Celestial Toast', 'As Aasimar, share a drink with a stranger in a calm bar.', 'race', 'Aasimar'),

-- Dragonborn
('FIRE_WITHIN', 'Fire Within', 'As Dragonborn, drink 10 strong spirits.', 'race', 'Dragonborn'),
('LAVA_LOUNGE', 'Lava Lounge', 'As Dragonborn, visit 3 red or fire themed bars.', 'race', 'Dragonborn'),
('ROAR_OF_THE_HIGHLANDS', 'Roar of the Highlands', 'As Dragonborn, try 5 different whiskies.', 'race', 'Dragonborn'),

-- Dwarf
('MIGHTY_BARREL', 'Mighty Barrel', 'As Dwarf, try 20 different beers.', 'race', 'Dwarf'),
('STONE_TAVERN', 'Stone Tavern', 'As Dwarf, visit 5 basement style bars.', 'race', 'Dwarf'),
('DWARVEN_FEAST', 'Dwarven Feast', 'As Dwarf, order 10 hearty dishes.', 'race', 'Dwarf'),

-- Elf
('FOREST_BREEZE', 'Forest Breeze', 'As Elf, try 5 light and refreshing cocktails.', 'race', 'Elf'),
('MOONLIT_WINE', 'Moonlit Wine', 'As Elf, try 10 different wines.', 'race', 'Elf'),
('HARMONY_SEEKER', 'Harmony Seeker', 'As Elf, visit 5 quiet lounge bars.', 'race', 'Elf'),

-- Gnome
('EXPERIMENT_CRAFTER', 'Experiment Crafter', 'As Gnome, try 10 experimental or unusual cocktails.', 'race', 'Gnome'),
('PUZZLE_DRINKER', 'Puzzle Drinker', 'As Gnome, visit a bar with board games.', 'race', 'Gnome'),
('TINKERS_DELIGHT', 'Tinker’s Delight', 'As Gnome, try a new drink each week for 4 weeks.', 'race', 'Gnome'),

-- Goliath
('STRENGTH_OF_THE_MOUNTAIN', 'Strength of the Mountain', 'As Goliath, order 10 large sized drinks.', 'race', 'Goliath'),
('STONEHEART_BREWERY', 'Stoneheart Brewery', 'As Goliath, try several heavy ales.', 'race', 'Goliath'),
('TITANS_MEAL', 'Titan’s Meal', 'As Goliath, order the biggest dish on the menu.', 'race', 'Goliath'),

-- Halfling
('COZY_CORNER', 'Cozy Corner', 'As Halfling, always choose the coziest place in the bar.', 'race', 'Halfling'),
('SNACK_KING', 'Snack King', 'As Halfling, order 15 different snacks.', 'race', 'Halfling'),
('SWEET_HARMONY', 'Sweet Harmony', 'As Halfling, try 5 sweet cocktails or drinks.', 'race', 'Halfling'),

-- Half-Elf
('BETWEEN_REALMS', 'Between Realms', 'As Half-Elf, visit 5 bars with very different styles.', 'race', 'Half-Elf'),
('BALANCED_TASTE', 'Balanced Taste', 'As Half-Elf, drink cocktails, beer and wine in one evening.', 'race', 'Half-Elf'),
('DIPLOMAT_OF_TAVERNS', 'Diplomat of Taverns', 'As Half-Elf, receive 10 likes for your reviews.', 'race', 'Half-Elf'),

-- Half-Orc
('BRUTAL_BREW', 'Brutal Brew', 'As Half-Orc, drink 10 of the strongest drinks on the menu.', 'race', 'Half-Orc'),
('WILD_NIGHT', 'Wild Night', 'As Half-Orc, mark that you witnessed 3 bar fights.', 'race', 'Half-Orc'),
('SAVAGE_FEAST', 'Savage Feast', 'As Half-Orc, order the spiciest dish available.', 'race', 'Half-Orc'),

-- Human
('ADAPTABLE_SPIRIT', 'Adaptable Spirit', 'As Human, visit 5 different categories of bars.', 'race', 'Human'),
('UNIVERSAL_DRINKER', 'Universal Drinker', 'As Human, try 10 different drink styles.', 'race', 'Human'),
('EVERYWHERE_AT_ONCE', 'Everywhere at Once', 'As Human, visit 3 bars in different districts in one night.', 'race', 'Human'),

-- Tiefling
('INFERNAL_MIX', 'Infernal Mix', 'As Tiefling, try 5 spicy or fiery cocktails.', 'race', 'Tiefling'),
('SHADOWED_TAVERN', 'Shadowed Tavern', 'As Tiefling, visit 3 dark or moody bars.', 'race', 'Tiefling');

select * from achievements;


