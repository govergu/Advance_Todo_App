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

exports.updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { task, priority, status } = req.body;

    const todo = await Task.findById(id);
    if (!todo) return next(new AppError(404, "Todo Not Found"));

    const isOwner = todo.owner.toString() === req.user._id.toString();
    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin)
      return next(new AppError(403, "Not authorized access"));

    if (task) todo.task = task;
    if (priority) todo.priority = priority;
    if (status) todo.status = status;

    await todo.save();

    res.status(200).json({ message: "Task updated successfully", todo });
  } catch (error) {
    next(
      new AppError(500, "DatabaseError", "Failed to create Task", error.message)
    );
  }
};

exports.getTodos = async (req, res, next) => {
  try {
    //pagination
    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 10;
    let skip = (page - 1) * limit;

    //filtering
    let filters = {};
    if (req.query.priority) filters.priority = req.query.priority;
    if (req.query.status) filters.status = req.query.status;

    //sorting
    let sort = {};
    if (req.query.sortBy)
      sort[req.query.sortBy] = req.query.sortBy === "desc" ? -1 : 1;

    let todos;

    if (req.user.role === "admin") {
      todos = await Task.find(filters)
        .populate("owner", "username email role")
        .skip(skip)
        .limit(limit)
        .sort(sort);
    } else {
      todos = await Task.find(filters, { owner: req.user.id })
        .skip(skip)
        .limit(limit)
        .sort(sort);
    }
    res.status(200).json({ count: todos.length, todos });
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
