const joi = require("joi");

const createTodoSchema = joi.object({
  task: joi.string().min(3).max(50).required(),
  priority: joi.string().valid("low", "medium", "high").default("low"),
  status: joi
    .string()
    .valid("pending", "in-progress", "completed")
    .default("pending"),
  deadline: joi.date().optional(),
});

module.exports = { createTodoSchema };
