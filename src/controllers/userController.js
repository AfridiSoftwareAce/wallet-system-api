const { createUser, getUserByEmail } = require('../models/userModel');
const db = require('../config/db');


const getUserById = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await db.query('SELECT id, name, email, wallet_balance FROM users WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user: result.rows[0] });

  } catch (err) {
    console.error('Fetch user error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const handleCreateUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required.' });
    }

    const existing = await getUserByEmail(email);
    if (existing) {
      return res.status(409).json({ message: 'Email already registered.' });
    }

    const user = await createUser(name, email);
    return res.status(201).json({ message: 'User created successfully', user });

  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  handleCreateUser,
    getUserById
};
