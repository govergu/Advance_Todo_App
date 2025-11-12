const Task = require("../models/Task");
const AppError = require("../utils/appError");

exports.createTask = async (req, res, next) => {
  try {
    const newTask = await Task.create({
      ...req.body,
      owner: req.user._id,
    });
    res.status(200).json(newTask);
  } catch (error) {
    // res.status(500).json({ message: error.message });
    next(
      new AppError(500, "DatabaseError", "Failed to create Task", error.message)
    );
  }
};

exports.getTodos = async (req, res, next) => {
  try {
    let todos;

    if (req.user.role === "admin") {
      todos = await Task.find().populate("owner", "username email role");
    } else {
      todos = await Task.find({ owner: req.user.id });
    }

    res.status(200).json(todos);
  } catch (error) {
    // res.status(500).json({ message: "Error caught", error: error.message });
    next(
      new AppError(
        500,
        "Database Error",
        "Failed to fetch Todos",
        error.message
      )
    );
  }
};
