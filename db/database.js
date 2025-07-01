const sqlite3 = require('sqlite3').verbose();

// Connect to SQLite DB
const db = new sqlite3.Database('./db/sales_data.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS sales_data (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    receipt_number TEXT,
    sale_date TEXT,
    transaction_time TEXT,
    sale_amount REAL,
    tax_amount REAL,
    discount_amount REAL,
    round_off REAL,
    net_sale REAL,
    payment_mode TEXT,
    order_type TEXT,
    transaction_status TEXT
  )`);
});

module.exports = db;

