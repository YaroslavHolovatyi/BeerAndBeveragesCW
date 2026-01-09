CREATE TABLE check_participants (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

  check_id BIGINT UNSIGNED NOT NULL,
  user_id BIGINT UNSIGNED NOT NULL,

  role ENUM('owner', 'participant') DEFAULT 'participant',

  joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  KEY idx_check (check_id),
  KEY idx_user (user_id),

  UNIQUE KEY uq_check_user (check_id, user_id),

  CONSTRAINT fk_check_participants_check
    FOREIGN KEY (check_id)
    REFERENCES checks(id)
    ON DELETE CASCADE,

  CONSTRAINT fk_check_participants_user
    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO check_participants (check_id, user_id, role)
VALUES
(1, 5, 'owner'),
(1, 8, 'participant'),
(1, 12, 'participant');

SELECT
  u.id,
  u.first_name,
  u.last_name,
  cp.role
FROM check_participants cp
JOIN users u ON u.id = cp.user_id
WHERE cp.check_id = 1;

SELECT DISTINCT
  c.id,
  c.total_amount,
  c.created_at
FROM checks c
JOIN check_participants cp ON cp.check_id = c.id
WHERE cp.user_id = 8;

