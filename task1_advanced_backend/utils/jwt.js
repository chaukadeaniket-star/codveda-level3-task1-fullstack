const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const ACCESS_TOKEN_EXPIRES = process.env.ACCESS_TOKEN_EXPIRES || "15m";
const REFRESH_TOKEN_EXPIRES = process.env.REFRESH_TOKEN_EXPIRES || "7d";

const generateAccessToken = (user) => {
  return jwt.sign(
    {
      sub: user._id.toString(),
      role: user.role,
      type: "access"
    },
    process.env.JWT_ACCESS_SECRET,
    {
      expiresIn: ACCESS_TOKEN_EXPIRES,
      issuer: "authentication-api",
      audience: "authentication-client"
    }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      sub: user._id.toString(),
      type: "refresh"
    },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: REFRESH_TOKEN_EXPIRES,
      issuer: "authentication-api",
      audience: "authentication-client"
    }
  );
};

const verifyAccessToken = (token) => {
  return jwt.verify(token, process.env.JWT_ACCESS_SECRET, {
    issuer: "authentication-api",
    audience: "authentication-client"
  });
};

const verifyRefreshToken = (token) => {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET, {
    issuer: "authentication-api",
    audience: "authentication-client"
  });
};

const hashToken = (token) => {
  return crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  hashToken
};