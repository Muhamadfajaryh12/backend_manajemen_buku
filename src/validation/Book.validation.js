const Joi = require("joi");

const BookValidation = Joi.object({
  book_name: Joi.string().max(150).required(),
  author: Joi.string().max(150).required(),
  description: Joi.string().required(),
  published_date: Joi.date().required(),
});

const BookValidationPut = Joi.object({
  description: Joi.string().required(),
});
module.exports = { BookValidation, BookValidationPut };
