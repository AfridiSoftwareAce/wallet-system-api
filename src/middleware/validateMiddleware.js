const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const details = error.details.map(err => err.message);
      return res.status(400).json({ message: 'Validation failed', errors: details });
    }

    next();
  };
};

module.exports = validate;
