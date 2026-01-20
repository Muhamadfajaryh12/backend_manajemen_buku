const Validation = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      return res.status(400).json({
        success: false,
        message: "Isi data dengan benar !",
        required: error.details.map((err) => err.message),
      });
    }

    next();
  };
};

module.exports = Validation;
