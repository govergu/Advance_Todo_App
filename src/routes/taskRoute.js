const express = require("express");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { roleMiddleware } = require("../middlewares/roleMiddleware");
const { getTodos, createTask } = require("../controllers/taskController");

const AppError = require("../utils/appError");

const router = express.Router();

router.get("/", authMiddleware, roleMiddleware("user", "admin"), getTodos);
router.post("/", authMiddleware, roleMiddleware("user", "admin"), createTask);

// router.get("/test-error", (req, res, next) => {
//   next(new AppError(404, "Not Found Error", "Just a Test Route you fool"));
// });

module.exports = router;
