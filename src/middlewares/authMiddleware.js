const User = require("../models/User");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");

exports.authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token)
    return next(new AppError(401, "No Token", "Authorization Denied"));
  // res.status(401).json({ message: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");

    next();
  } catch (error) {
    // res.status(401).json({ message: "Token invalid or expired" });
    next(new AppError(401, "Token Not Found", "Token invalid or expired"));
  }
};
