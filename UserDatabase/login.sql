CREATE DATABASE user_currency_db;

USE user_currency_db;

CREATE TABLE Users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Currency (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    balance DECIMAL(10, 2) DEFAULT 0,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

INSERT INTO Users (username, password) VALUES ('user1', 'pass1');
UPDATE Currency SET balance = balance + 100 WHERE user_id = 1;
SELECT balance FROM Currency WHERE user_id = 1;
