const {
  createTransaction,
  getUserById,
  updateWallet
} = require('../models/transactionModel');
const db = require('../config/db');

const getUserTransactions = async (req, res) => {
  try {
    const { id } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;

    const result = await db.query(
      'SELECT * FROM transactions WHERE user_id = $1 ORDER BY timestamp DESC LIMIT $2 OFFSET $3',
      [id, limit, offset]
    );

    res.status(200).json({
      page,
      limit,
      transactions: result.rows
    });

  } catch (err) {
    console.error('Get transactions error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const handleTransaction = async (req, res) => {
  try {
    const { type, amount } = req.body;
    const userId = req.user.id; // from JWT token

    const user = await getUserById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    let currentBalance = parseFloat(user.wallet_balance);

    if (type === 'WITHDRAW' && amount > currentBalance) {
      return res.status(400).json({ message: 'Insufficient wallet balance.' });
    }

    // Calculate new balance
    const newBalance =
      type === 'ADD'
        ? currentBalance + parseFloat(amount)
        : currentBalance - parseFloat(amount);

    // Update wallet balance
    await updateWallet(userId, newBalance);

    // Record the transaction
    const transaction = await createTransaction(userId, type, amount);

    return res.status(201).json({
      message: `${type} successful`,
      balance: newBalance.toFixed(2),
      transaction
    });

  } catch (err) {
    console.error('Transaction Error:', err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { handleTransaction,  getUserTransactions };
