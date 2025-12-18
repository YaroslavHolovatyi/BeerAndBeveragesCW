use b_and_b;

CREATE TABLE friend_group_members (
	group_id BIGINT UNSIGNED NOT NULL,
	user_id BIGINT UNSIGNED NOT NULL,

	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

	PRIMARY KEY (group_id, user_id),

	KEY idx_friend_group_members_user (user_id),

	FOREIGN KEY (group_id) REFERENCES friend_groups(id) ON DELETE CASCADE,
	FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
