use b_and_b;


CREATE TABLE friend_requests (
	id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

	sender_id BIGINT UNSIGNED NOT NULL,
	receiver_id BIGINT UNSIGNED NOT NULL,

	message VARCHAR(255) NULL,

	status ENUM('pending', 'accepted', 'rejected', 'cancelled') NOT NULL DEFAULT 'pending',

	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

	UNIQUE KEY uq_friend_request (sender_id, receiver_id),

	KEY idx_friend_requests_sender (sender_id),
	KEY idx_friend_requests_receiver (receiver_id),
	KEY idx_friend_requests_status (status),

	FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,
	FOREIGN KEY (receiver_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


