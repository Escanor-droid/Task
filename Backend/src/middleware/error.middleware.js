import mongoose from "mongoose";

export const errorHandler = (err, req, res, next) => {
  console.error(err); // Log error for debugging

  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message || "Server Error";

  // 🔹 Mongoose Bad ObjectId
  if (err instanceof mongoose.Error.CastError) {
    statusCode = 400;
    message = "Invalid ID format";
  }

  // 🔹 Duplicate key error (e.g., email already exists)
  if (err.code === 11000) {
    statusCode = 400;
    message = "Duplicate field value entered";
  }

  // 🔹 JWT Errors
  if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token";
  }

  if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Token expired";
  }

  res.status(statusCode).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined
  });
};

export default errorHandler;