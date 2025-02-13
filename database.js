const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'user_currency_db'
});

connection.connect(err => {
    if (err) throw err;
    console.log('Connected to the database.');
});

// Insert User
connection.query('INSERT INTO Users (username, password) VALUES (?, ?)', ['user1', 'pass1'], (err, results) => {
    if (err) throw err;
    console.log('User inserted:', results.insertId);
});

// Update Currency Balance
connection.query('UPDATE Currency SET balance = balance + ? WHERE user_id = ?', [100, 1], (err, results) => {
    if (err) throw err;
    console.log('Balance updated.');
});

// Retrieve User Balance
connection.query('SELECT balance FROM Currency WHERE user_id = ?', [1], (err, results) => {
    if (err) throw err;
    console.log('User balance:', results[0].balance);
});
