const express = require("express");

const router = express.Router();

const {
  register,
  login,
  refresh,
  logout,
  getMe,
  updateProfile,
  changePassword
} = require("../controllers/authController");

const {
  protect
} = require("../middleware/authMiddleware");

/*
 * Authentication
 */

router.post(
  "/register",
  register
);

router.post(
  "/login",
  login
);

router.post(
  "/refresh",
  refresh
);

router.post(
  "/logout",
  protect,
  logout
);

/*
 * Protected user routes
 */

router.get(
  "/me",
  protect,
  getMe
);

router.patch(
  "/profile",
  protect,
  updateProfile
);

router.patch(
  "/change-password",
  protect,
  changePassword
);

module.exports = router;