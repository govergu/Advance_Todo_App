const Task = require("../models/Task");

exports.createTask = async (req, res) => {
  try {
    const newTask = await Task.create({
      ...req.body,
      owner: req.user._id,
    });
    res.status(200).json(newTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTodos = async (req, res) => {
  try {
    let todos;

    if (req.user.role === "admin") {
      todos = await Task.find().populate("owner", "username email role");
    } else {
      todos = await Task.find({ owner: req.user.id });
    }

    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: "Error caught", error: error.message });
  }
};
