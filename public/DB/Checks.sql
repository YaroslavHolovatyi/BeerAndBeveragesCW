CREATE TABLE checks (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

  user_id BIGINT UNSIGNED NOT NULL,
  bar_slug VARCHAR(255)
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_0900_ai_ci
    NOT NULL,

  total_amount DECIMAL(10,2) NOT NULL,
  currency VARCHAR(10) DEFAULT 'UAH',

  status ENUM('draft', 'completed', 'cancelled') DEFAULT 'completed',

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ON UPDATE CURRENT_TIMESTAMP,

  KEY idx_user (user_id),
  KEY idx_bar (bar_slug),

  CONSTRAINT fk_checks_user
    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

ALTER TABLE checks
DROP FOREIGN KEY fk_checks_bar_slug;

ALTER TABLE checks
ADD CONSTRAINT fk_checks_bar_slug
FOREIGN KEY (bar_slug)
REFERENCES bars(slug)
ON DELETE CASCADE;

INSERT INTO checks (user_id, bar_slug, total_amount)
VALUES (1, 'golden-lion-lviv-1', 420.50);



