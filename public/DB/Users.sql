use B_and_B;

CREATE TABLE users (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,

  username VARCHAR(50) NOT NULL,

  email VARCHAR(255) NOT NULL,
  email_verified_at TIMESTAMP NULL,

  password_hash VARCHAR(255) NOT NULL,

  avatar_url VARCHAR(500) NULL,

  race_id INT UNSIGNED NULL,
  main_city_id INT UNSIGNED NOT NULL,
  location_city_id INT UNSIGNED NULL,

  role ENUM('user', 'admin', 'moderator') DEFAULT 'user',

  is_active BOOLEAN DEFAULT TRUE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  last_login_at TIMESTAMP NULL,
  deleted_at TIMESTAMP NULL,

  UNIQUE KEY uq_users_email (email),
  UNIQUE KEY uq_users_username (username),

  KEY idx_users_race_id (race_id),
  KEY idx_users_main_city_id (main_city_id),
  KEY idx_users_location_city_id (location_city_id),
  KEY idx_users_role (role),

  FOREIGN KEY (race_id) REFERENCES races(id) ON DELETE SET NULL,
  FOREIGN KEY (main_city_id) REFERENCES cities(id),
  FOREIGN KEY (location_city_id) REFERENCES cities(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
