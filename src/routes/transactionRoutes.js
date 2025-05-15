const express = require('express');
const router = express.Router();

const { handleTransaction, getUserTransactions } = require('../controllers/transactionController');
const authenticate = require('../middleware/authMiddleware');
const validate = require('../middleware/validateMiddleware');
const transactionSchema = require('../validators/transactionValidator');

// Protected + Validated
router.post('/transaction', authenticate, validate(transactionSchema), handleTransaction);
router.get('/user/:id/transactions', authenticate, getUserTransactions); 


module.exports = router;
