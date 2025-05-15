const jwt = require('jsonwebtoken');
const { getUserByEmail } = require('../models/userModel');

const loginUser = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) return res.status(400).json({ message: 'Email required' });

    const user = await getUserByEmail(email);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(200).json({
      message: 'Login successful',
      token
    });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { loginUser };
