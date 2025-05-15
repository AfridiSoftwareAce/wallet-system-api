const express = require('express');
const router = express.Router();
const { loginUser } = require('../controllers/authController');
const Joi = require('joi');
const validate = require('../middleware/validateMiddleware');

const loginSchema = Joi.object({
  email: Joi.string().email().required()
});

router.post('/login', validate(loginSchema), loginUser); 

module.exports = router;
