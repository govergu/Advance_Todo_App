const joi = require("joi");

const registerSchema = joi.object({
  username: joi.string().min(3).max(20).required(),
  email: joi.string().email().required(),
  password: joi.string().min(8).required(),
});

const loginSchema = joi.object({
  username: joi.string().min(3).max(20).required(),
  password: joi.string().min(8).required(),
});

module.exports = { registerSchema, loginSchema };
