const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    const errors = result.error.issues.map((err) => ({
      path: err.path.join("."),
      message: err.message,
    }));

    return res.status(400).json({
      message: "Validation failed",
      errors,
    });
  }

  req.body = result.data; // replace body with validated data
  next();
};

module.exports = validate;
