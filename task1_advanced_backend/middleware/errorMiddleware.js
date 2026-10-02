const notFound = (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`
  });
};

const errorHandler = (
  error,
  req,
  res,
  next
) => {
  console.error("ERROR:", error);

  let statusCode =
    error.statusCode || 500;

  let message =
    error.message || "Internal server error";

  /*
   * MongoDB duplicate key error
   */
  if (error.code === 11000) {
    statusCode = 409;
    message = "Email is already registered";
  }

  /*
   * Mongoose validation error
   */
  if (error.name === "ValidationError") {
    statusCode = 400;

    const messages = Object.values(
      error.errors
    ).map((err) => err.message);

    message = messages.join(", ");
  }

  /*
   * Invalid MongoDB ObjectId
   */
  if (error.name === "CastError") {
    statusCode = 400;
    message = "Invalid resource ID";
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === "development" && {
      stack: error.stack
    })
  });
};

module.exports = {
  notFound,
  errorHandler
};