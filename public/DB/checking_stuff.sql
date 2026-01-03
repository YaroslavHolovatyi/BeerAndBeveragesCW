use b_and_b;

select * from cities;

ALTER TABLE users
MODIFY role VARCHAR(20) NOT NULL DEFAULT 'USER';

UPDATE users
SET role = UPPER(role);


select * from vibes;

select * from quiz_questions;

ALTER TABLE cities
MODIFY COLUMN id BIGINT UNSIGNED NOT NULL;