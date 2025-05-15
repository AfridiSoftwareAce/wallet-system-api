-- 📘 Wallet System Database Schema

-- 🧑 Users Table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  wallet_balance NUMERIC(12, 2) DEFAULT 0.00,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 💸 Transactions Table
CREATE TABLE IF NOT EXISTS transactions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(10) CHECK (type IN ('ADD', 'WITHDRAW')) NOT NULL,
  amount NUMERIC(12, 2) NOT NULL CHECK (amount > 0),
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
