use b_and_b;

CREATE TABLE user_friends (
	id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

	user_id BIGINT UNSIGNED NOT NULL,
	friend_id BIGINT UNSIGNED NOT NULL,

	status ENUM('accepted', 'blocked', 'removed') NOT NULL DEFAULT 'accepted',

	friend_nickname VARCHAR(50) NULL,

	is_muted BOOLEAN DEFAULT FALSE,

	last_interaction_at TIMESTAMP NULL,

	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

	UNIQUE KEY uq_user_friend (user_id, friend_id),

	KEY idx_user_friends_user (user_id),
	KEY idx_user_friends_friend (friend_id),
	KEY idx_user_friends_status (status),

	FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
	FOREIGN KEY (friend_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
