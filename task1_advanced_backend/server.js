const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");

const {
  notFound,
  errorHandler
} = require("./middleware/errorMiddleware");

/*
 * Load environment variables
 */
dotenv.config();

/*
 * Create Express application
 */
const app = express();

/*
 * Environment
 */
const PORT =
  process.env.PORT || 5000;

const CLIENT_URL =
  process.env.CLIENT_URL ||
  "http://localhost:5173";

/*
 * Connect MongoDB
 */
connectDB();

/*
 * Security middleware
 */
app.use(
  helmet()
);

/*
 * CORS
 */
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
    methods: [
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE",
      "OPTIONS"
    ],
    allowedHeaders: [
      "Content-Type",
      "Authorization"
    ]
  })
);

/*
 * Body parsers
 */
app.use(
  express.json({
    limit: "10kb"
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "10kb"
  })
);

/*
 * Cookie parser
 */
app.use(cookieParser());

/*
 * General API rate limiter
 */
const generalLimiter =
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      success: false,
      message:
        "Too many requests. Please try again later."
    }
  });

app.use(
  "/api",
  generalLimiter
);

/*
 * Strict authentication rate limiter
 */
const authLimiter =
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      success: false,
      message:
        "Too many authentication attempts. Please try again later."
    }
  });

app.use(
  "/api/auth/login",
  authLimiter
);

app.use(
  "/api/auth/register",
  authLimiter
);

/*
 * Root route
 */
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message:
      "Advanced Authentication API is running",
    version: "1.0.0",
    environment:
      process.env.NODE_ENV || "development"
  });
});

/*
 * Health check
 */
app.get(
  "/api/health",
  (req, res) => {
    res.status(200).json({
      success: true,
      status: "OK",
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    });
  }
);

/*
 * Authentication routes
 */
app.use(
  "/api/auth",
  authRoutes
);

/*
 * 404 handler
 */
app.use(notFound);

/*
 * Global error handler
 */
app.use(errorHandler);

/*
 * Start server
 */
const server = app.listen(
  PORT,
  () => {
    console.log("");
    console.log(
      "========================================"
    );
    console.log(
      "🚀 Authentication API Started"
    );
    console.log(
      "========================================"
    );
    console.log(
      `Server: http://localhost:${PORT}`
    );
    console.log(
      `Health: http://localhost:${PORT}/api/health`
    );
    console.log(
      `Environment: ${process.env.NODE_ENV || "development"}`
    );
    console.log(
      "========================================"
    );
    console.log("");
  }
);

/*
 * Handle unexpected errors
 */
process.on(
  "unhandledRejection",
  (error) => {
    console.error(
      "Unhandled Rejection:",
      error
    );

    server.close(() => {
      process.exit(1);
    });
  }
);

process.on(
  "uncaughtException",
  (error) => {
    console.error(
      "Uncaught Exception:",
      error
    );

    process.exit(1);
  }
);