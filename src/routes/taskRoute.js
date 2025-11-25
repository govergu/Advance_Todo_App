const express = require("express");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { roleMiddleware } = require("../middlewares/roleMiddleware");
const {
  getTodos,
  createTask,
  updateTask,
} = require("../controllers/taskController");

const AppError = require("../utils/appError");
const validate = require("../middlewares/validate");
const { createTodoSchema } = require("../validators/todo.validators");

const router = express.Router();

router.get("/", authMiddleware, roleMiddleware("user", "admin"), getTodos);
router.post(
  "/",
  authMiddleware,
  roleMiddleware("user", "admin"),
  validate(createTodoSchema),
  createTask
);
router.patch(
  "/:id",
  authMiddleware,
  roleMiddleware("user", "admin"),
  updateTask
);
// router.get("/test-error", (req, res, next) => {
//   next(new AppError(404, "Not Found Error", "Just a Test Route you fool"));
// });

module.exports = router;
