const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.isOperational ? err.message : "Internal Server Error";

  console.error(err);

  res.status(statusCode).json({
    success: false,
    error: {
      name: err.name || "Error",
      message,
      details: err.details || null,
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    },
  });
};

module.exports = errorHandler;
