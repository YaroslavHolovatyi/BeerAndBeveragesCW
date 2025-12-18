USE b_and_b;

CREATE TABLE quiz_answers (
	id INT UNSIGNED NOT NULL AUTO_INCREMENT,
	question_id INT UNSIGNED NOT NULL,
	answer_key CHAR(1) NOT NULL, -- A, B, C, D, E, F
	answer_text VARCHAR(255) NOT NULL,

	PRIMARY KEY (id),
	UNIQUE KEY uq_question_answer (question_id, answer_key),

	CONSTRAINT fk_quiz_answers_question
		FOREIGN KEY (question_id)
		REFERENCES quiz_questions(id)
		ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO quiz_answers (question_id, answer_key, answer_text)
SELECT id, 'A', 'Dark beer' FROM quiz_questions WHERE position = 1 UNION ALL
SELECT id, 'B', 'Wine' FROM quiz_questions WHERE position = 1 UNION ALL
SELECT id, 'C', 'Whiskey' FROM quiz_questions WHERE position = 1 UNION ALL
SELECT id, 'D', 'Strong spirits' FROM quiz_questions WHERE position = 1 UNION ALL
SELECT id, 'E', 'Ale' FROM quiz_questions WHERE position = 1 UNION ALL
SELECT id, 'F', 'Cocktails' FROM quiz_questions WHERE position = 1;

INSERT INTO quiz_answers (question_id, answer_key, answer_text)
SELECT id, 'A', 'Slowly, savoring every sip' FROM quiz_questions WHERE position = 2 UNION ALL
SELECT id, 'B', 'Fast — I’m here to party' FROM quiz_questions WHERE position = 2 UNION ALL
SELECT id, 'C', 'With friends' FROM quiz_questions WHERE position = 2 UNION ALL
SELECT id, 'D', 'Alone, philosophizing' FROM quiz_questions WHERE position = 2 UNION ALL
SELECT id, 'E', 'At the bar counter' FROM quiz_questions WHERE position = 2 UNION ALL
SELECT id, 'F', 'Only when I’m in the mood' FROM quiz_questions WHERE position = 2;

INSERT INTO quiz_answers (question_id, answer_key, answer_text)
SELECT id, 'A', 'Atmosphere' FROM quiz_questions WHERE position = 3 UNION ALL
SELECT id, 'B', 'Drink quality' FROM quiz_questions WHERE position = 3 UNION ALL
SELECT id, 'C', 'Music' FROM quiz_questions WHERE position = 3 UNION ALL
SELECT id, 'D', 'People' FROM quiz_questions WHERE position = 3 UNION ALL
SELECT id, 'E', 'History of the place' FROM quiz_questions WHERE position = 3 UNION ALL
SELECT id, 'F', 'A bartender who understands me' FROM quiz_questions WHERE position = 3;

INSERT INTO quiz_answers (question_id, answer_key, answer_text)
SELECT id, 'A', 'The entertainer' FROM quiz_questions WHERE position = 4 UNION ALL
SELECT id, 'B', 'The listener' FROM quiz_questions WHERE position = 4 UNION ALL
SELECT id, 'C', 'The leader' FROM quiz_questions WHERE position = 4 UNION ALL
SELECT id, 'D', 'The advisor' FROM quiz_questions WHERE position = 4 UNION ALL
SELECT id, 'E', 'The soul of the party' FROM quiz_questions WHERE position = 4 UNION ALL
SELECT id, 'F', 'The mysterious one' FROM quiz_questions WHERE position = 4;

INSERT INTO quiz_answers (question_id, answer_key, answer_text)
SELECT id, 'A', 'Warm soul, clear mind' FROM quiz_questions WHERE position = 5 UNION ALL
SELECT id, 'B', 'Happy and chatty' FROM quiz_questions WHERE position = 5 UNION ALL
SELECT id, 'C', 'Overconfident' FROM quiz_questions WHERE position = 5 UNION ALL
SELECT id, 'D', 'Philosopher mode' FROM quiz_questions WHERE position = 5 UNION ALL
SELECT id, 'E', 'One more and I sing' FROM quiz_questions WHERE position = 5 UNION ALL
SELECT id, 'F', 'Another planet' FROM quiz_questions WHERE position = 5;

INSERT INTO quiz_answers (question_id, answer_key, answer_text)
SELECT id, 'A', 'Meat platter' FROM quiz_questions WHERE position = 6 UNION ALL
SELECT id, 'B', 'Cheese' FROM quiz_questions WHERE position = 6 UNION ALL
SELECT id, 'C', 'Something exotic' FROM quiz_questions WHERE position = 6 UNION ALL
SELECT id, 'D', 'Nuts or crackers' FROM quiz_questions WHERE position = 6 UNION ALL
SELECT id, 'E', 'Fruits' FROM quiz_questions WHERE position = 6 UNION ALL
SELECT id, 'F', 'Nothing, I drink pure' FROM quiz_questions WHERE position = 6;

INSERT INTO quiz_answers (question_id, answer_key, answer_text)
SELECT id, 'A', 'I start philosophizing' FROM quiz_questions WHERE position = 7 UNION ALL
SELECT id, 'B', 'I laugh at everything' FROM quiz_questions WHERE position = 7 UNION ALL
SELECT id, 'C', 'I want to fight or compete' FROM quiz_questions WHERE position = 7 UNION ALL
SELECT id, 'D', 'I give advice' FROM quiz_questions WHERE position = 7 UNION ALL
SELECT id, 'E', 'I disappear on adventures' FROM quiz_questions WHERE position = 7 UNION ALL
SELECT id, 'F', 'I start dancing' FROM quiz_questions WHERE position = 7;

INSERT INTO quiz_answers (question_id, answer_key, answer_text)
SELECT id, 'A', 'Small and atmospheric' FROM quiz_questions WHERE position = 8 UNION ALL
SELECT id, 'B', 'Classic wine cellar' FROM quiz_questions WHERE position = 8 UNION ALL
SELECT id, 'C', 'Rock pub' FROM quiz_questions WHERE position = 8 UNION ALL
SELECT id, 'D', 'Magical lounge' FROM quiz_questions WHERE position = 8 UNION ALL
SELECT id, 'E', 'Mountain tavern' FROM quiz_questions WHERE position = 8 UNION ALL
SELECT id, 'F', 'Tropical beach bar' FROM quiz_questions WHERE position = 8;

INSERT INTO quiz_answers (question_id, answer_key, answer_text)
SELECT id, 'A', 'Curious but cautious' FROM quiz_questions WHERE position = 9 UNION ALL
SELECT id, 'B', 'I believe, I’ve seen it' FROM quiz_questions WHERE position = 9 UNION ALL
SELECT id, 'C', 'I use it for my goals' FROM quiz_questions WHERE position = 9 UNION ALL
SELECT id, 'D', 'Skeptic' FROM quiz_questions WHERE position = 9 UNION ALL
SELECT id, 'E', 'It’s part of my life' FROM quiz_questions WHERE position = 9 UNION ALL
SELECT id, 'F', 'I am magic' FROM quiz_questions WHERE position = 9;

INSERT INTO quiz_answers (question_id, answer_key, answer_text)
SELECT id, 'A', 'Life is an adventure' FROM quiz_questions WHERE position = 10 UNION ALL
SELECT id, 'B', 'Strength is calm' FROM quiz_questions WHERE position = 10 UNION ALL
SELECT id, 'C', 'No risk, no life' FROM quiz_questions WHERE position = 10 UNION ALL
SELECT id, 'D', 'Wisdom is moderation' FROM quiz_questions WHERE position = 10 UNION ALL
SELECT id, 'E', 'Wine and friends are the best medicine' FROM quiz_questions WHERE position = 10 UNION ALL
SELECT id, 'F', 'The world is a bar and I am the bartender' FROM quiz_questions WHERE position = 10;
