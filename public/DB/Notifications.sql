use b_and_b;

CREATE TABLE notifications (
	id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

	sender_id BIGINT UNSIGNED NULL,
	receiver_id BIGINT UNSIGNED NOT NULL,

	type ENUM(
		'friend_request',
		'friend_accepted',
		'message',
		'achievement',
		'event',
		'system'
	) NOT NULL,

	title VARCHAR(100) NOT NULL,
	body TEXT NOT NULL,

	is_read BOOLEAN DEFAULT FALSE,

	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

	KEY idx_notifications_receiver (receiver_id),
	KEY idx_notifications_sender (sender_id),
	KEY idx_notifications_is_read (is_read),
	KEY idx_notifications_type (type),

	FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE SET NULL,
	FOREIGN KEY (receiver_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
