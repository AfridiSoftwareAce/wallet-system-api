const db = require('../config/db');

const createUser = async (name, email) => {
  const query = `
    INSERT INTO users (name, email)
    VALUES ($1, $2)
    RETURNING id, name, email, wallet_balance;
  `;
  const values = [name, email];
  const result = await db.query(query, values);
  return result.rows[0];
};

const getUserByEmail = async (email) => {
  const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0];
};

module.exports = {
  createUser,
  getUserByEmail
};
