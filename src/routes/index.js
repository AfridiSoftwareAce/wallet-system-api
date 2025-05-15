const express = require('express');
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const transactionRoutes = require('./transactionRoutes');

const router = express.Router();

// Centralized route use
router.use(authRoutes);
router.use(userRoutes);
router.use(transactionRoutes);

module.exports = router;
