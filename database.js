const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Database connection and file setup
const dbPath = path.join(__dirname, 'db', 'team_havoc.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("Failed to connect to database:", err);
    } else {
        console.log("Successfully connected to the SQLite database.");
        initializeDatabase();  // Ensure tables are created on startup
    }
});

// Function to initialize database tables
function initializeDatabase() {
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL
        )
    `, (err) => {
        if (err) {
            console.error("Error creating users table:", err);
        } else {
            console.log("Users table is ready.");
            // Optional: Insert a test user if none exists
            db.run(`
                INSERT OR IGNORE INTO users (username, password)
                VALUES ('staff', 'password123')  -- Replace with real test data
            `, (err) => {
                if (err) console.error("Error inserting test user:", err);
                else console.log("Test user added (if table was empty).");
            });
        }
    });
}

// Function to get user by username and password
function getUserByUsernameAndPassword(username, password) {
    return new Promise((resolve, reject) => {
        db.get(
            `SELECT * FROM users WHERE username = ? AND password = ?`,
            [username, password],
            (err, row) => {
                if (err) {
                    console.error("Error executing user login query:", err);
                    reject(err);
                } else {
                    resolve(row);
                }
            }
        );
    });
}

// Export functions
module.exports = {
    getUserByUsernameAndPassword
};
