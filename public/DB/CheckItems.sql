CREATE TABLE check_items (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

  check_id BIGINT UNSIGNED NOT NULL,

  item_name VARCHAR(255) NOT NULL,
  quantity INT UNSIGNED NOT NULL DEFAULT 1,
  price DECIMAL(10,2) NOT NULL,

  total DECIMAL(10,2)
    GENERATED ALWAYS AS (quantity * price) STORED,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  KEY idx_check (check_id),

  CONSTRAINT fk_check_items_check
    FOREIGN KEY (check_id)
    REFERENCES checks(id)
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO check_items (check_id, item_name, quantity, price)
VALUES
(1, 'Craft IPA 0.5L', 2, 95.00),
(1, 'Whiskey Jameson 50ml', 1, 120.00),
(1, 'Nachos', 1, 85.00);


SELECT
  c.id AS check_id,
  c.total_amount,
  ci.item_name,
  ci.quantity,
  ci.price,
  ci.total
FROM checks c
JOIN check_items ci ON ci.check_id = c.id
WHERE c.id = 1;
