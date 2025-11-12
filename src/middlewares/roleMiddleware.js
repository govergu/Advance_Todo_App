const AppError = require("../utils/appError");

exports.roleMiddleware = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return next(
        new AppError(
          403,
          "ForbiddenError",
          "You are not allowed this perform this action"
        )
      );
    }
    next();
  };
};

// res
//         .status(403)
//         .json({ message: "Access denied: Insufficient role" });
