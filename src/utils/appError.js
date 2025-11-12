class AppError extends Error {
  constructor(
    statusCode = 500,
    name = "AppError",
    message = "Something went wrong",
    details = null
  ) {
    super(message);
    this.statusCode = statusCode;
    this.name = name;
    this.message = message;
    this.details = details;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
