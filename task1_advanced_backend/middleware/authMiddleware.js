const {
  verifyAccessToken
} = require("../utils/jwt");

const User = require("../models/user");

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (
      !authHeader ||
      !authHeader.startsWith("Bearer ")
    ) {
      return res.status(401).json({
        success: false,
        message: "Authorization token is required"
      });
    }

    const token = authHeader.split(" ")[1];

    const payload = verifyAccessToken(token);

    if (payload.type !== "access") {
      return res.status(401).json({
        success: false,
        message: "Invalid access token"
      });
    }

    const user = await User.findById(payload.sub);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User no longer exists"
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: "Account is disabled"
      });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired access token"
    });
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required"
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "You do not have permission"
      });
    }

    next();
  };
};

module.exports = {
  protect,
  authorize
};