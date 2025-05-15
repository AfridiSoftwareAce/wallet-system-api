const db = require('../config/db');

const createTransaction = async (userId, type, amount) => {
  const query = `
    INSERT INTO transactions (user_id, type, amount)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const result = await db.query(query, [userId, type, amount]);
  return result.rows[0];
};

const getUserById = async (id) => {
  const result = await db.query('SELECT * FROM users WHERE id = $1', [id]);
  return result.rows[0];
};

const updateWallet = async (userId, newBalance) => {
  await db.query('UPDATE users SET wallet_balance = $1 WHERE id = $2', [newBalance, userId]);
};

module.exports = {
  createTransaction,
  getUserById,
  updateWallet
};
