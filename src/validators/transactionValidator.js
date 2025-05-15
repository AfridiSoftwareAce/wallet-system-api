const Joi = require('joi');

const transactionSchema = Joi.object({
  type: Joi.string().valid('ADD', 'WITHDRAW').required(),
  amount: Joi.number().positive().required()
});

module.exports = transactionSchema;
