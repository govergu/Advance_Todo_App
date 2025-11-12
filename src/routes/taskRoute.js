const express = require("express");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { roleMiddleware } = require("../middlewares/roleMiddleware");
const { getTodos, createTask } = require("../controllers/taskController");

const router = express.Router();

router.get("/", authMiddleware, roleMiddleware("user", "admin"), getTodos);
router.post("/", authMiddleware, roleMiddleware("user", "admin"), createTask);

module.exports = router;
