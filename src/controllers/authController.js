const User = require("../models/User");

const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");
const AppError = require("../utils/appError");

exports.registerUser = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashPassword,
    });

    res.status(200).json({ token: generateToken(newUser._id, newUser.role) });
  } catch (error) {
    // res.status(500).json({ message: error.message });
    next(new AppError(500, "Error", "User is not registered", error.message));
  }
};

exports.loginUser = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return next(new AppError(403, "Error", "Invalid Credentials"));
    // res.status(403).json({ message: "Invalid Credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return next(new AppError(403, "Error", "Invalid Credentials"));
    // res.status(403).json({ message: "Invalid Credentials" });

    res.status(200).json({ token: generateToken(user._id, user.role) });
  } catch (error) {
    next(new AppError(500, "Error", "User not Found", error.message));
    // res.status(500).json({ message: error.message });
  }
};
