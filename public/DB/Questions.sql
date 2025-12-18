USE b_and_b;

CREATE TABLE quiz_questions (
	id INT UNSIGNED NOT NULL AUTO_INCREMENT,
	question_text VARCHAR(255) NOT NULL,
	position INT UNSIGNED NOT NULL,

	PRIMARY KEY (id),
	UNIQUE KEY uq_quiz_question_position (position)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

USE b_and_b;

INSERT INTO quiz_questions (question_text, position) VALUES
('What is your favorite type of alcohol?', 1),
('How do you drink?', 2),
('What do you value most in a bar?', 3),
('Who are you in a group?', 4),
('Your condition after a night out?', 5),
('Your favorite snack?', 6),
('How do you behave after drinking?', 7),
('Your ideal bar?', 8),
('How do you feel about magic or the unusual?', 9),
('What is your life motto?', 10);

