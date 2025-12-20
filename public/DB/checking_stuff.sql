use b_and_b;

select * from users;

ALTER TABLE users
MODIFY role VARCHAR(20) NOT NULL DEFAULT 'USER';

UPDATE users
SET role = UPPER(role);
