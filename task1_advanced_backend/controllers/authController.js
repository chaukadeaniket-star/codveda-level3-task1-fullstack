const authService = require("../services/authService");

const {
  validateRegisterInput,
  isValidEmail,
  isStrongPassword
} = require("../utils/validators");

const setRefreshCookie = (res, token) => {
  res.cookie(
    "refreshToken",
    token,
    {
      httpOnly: true,
      secure:
        process.env.NODE_ENV === "production",
      sameSite:
        process.env.NODE_ENV === "production"
          ? "none"
          : "lax",
      maxAge:
        7 * 24 * 60 * 60 * 1000,
      path: "/api/auth"
    }
  );
};

const clearRefreshCookie = (res) => {
  res.clearCookie(
    "refreshToken",
    {
      httpOnly: true,
      secure:
        process.env.NODE_ENV === "production",
      sameSite:
        process.env.NODE_ENV === "production"
          ? "none"
          : "lax",
      path: "/api/auth"
    }
  );
};

/*
 * POST /api/auth/register
 */
const register = async (
  req,
  res,
  next
) => {
  try {
    const {
      name,
      email,
      password
    } = req.body;

    const errors =
      validateRegisterInput({
        name,
        email,
        password
      });

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors
      });
    }

    const result =
      await authService.registerUser({
        name,
        email,
        password
      });

    setRefreshCookie(
      res,
      result.refreshToken
    );

    res.status(201).json({
      success: true,
      message: "Registration successful",
      data: {
        user: result.user,
        accessToken: result.accessToken
      }
    });
  } catch (error) {
    next(error);
  }
};

/*
 * POST /api/auth/login
 */
const login = async (
  req,
  res,
  next
) => {
  try {
    const {
      email,
      password
    } = req.body;

    if (!email || !isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Valid email is required"
      });
    }

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required"
      });
    }

    const result =
      await authService.loginUser({
        email,
        password
      });

    setRefreshCookie(
      res,
      result.refreshToken
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        user: result.user,
        accessToken: result.accessToken
      }
    });
  } catch (error) {
    next(error);
  }
};

/*
 * POST /api/auth/refresh
 */
const refresh = async (
  req,
  res,
  next
) => {
  try {
    const refreshToken =
      req.cookies.refreshToken;

    const result =
      await authService.refreshUserToken(
        refreshToken
      );

    setRefreshCookie(
      res,
      result.refreshToken
    );

    res.status(200).json({
      success: true,
      message: "Access token refreshed",
      data: {
        accessToken:
          result.accessToken
      }
    });
  } catch (error) {
    clearRefreshCookie(res);
    next(error);
  }
};

/*
 * POST /api/auth/logout
 */
const logout = async (
  req,
  res,
  next
) => {
  try {
    await authService.logoutUser(
      req.user._id
    );

    clearRefreshCookie(res);

    res.status(200).json({
      success: true,
      message: "Logout successful"
    });
  } catch (error) {
    next(error);
  }
};

/*
 * GET /api/auth/me
 */
const getMe = async (
  req,
  res,
  next
) => {
  try {
    const user =
      await authService.getUserById(
        req.user._id
      );

    res.status(200).json({
      success: true,
      data: {
        user: user.toSafeObject()
      }
    });
  } catch (error) {
    next(error);
  }
};

/*
 * PATCH /api/auth/profile
 */
const updateProfile = async (
  req,
  res,
  next
) => {
  try {
    const {
      name
    } = req.body;

    const user =
      await authService.updateProfile(
        req.user._id,
        { name }
      );

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: {
        user: user.toSafeObject()
      }
    });
  } catch (error) {
    next(error);
  }
};

/*
 * PATCH /api/auth/change-password
 */
const changePassword = async (
  req,
  res,
  next
) => {
  try {
    const {
      currentPassword,
      newPassword
    } = req.body;

    if (
      !currentPassword ||
      !newPassword
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Current password and new password are required"
      });
    }

    if (
      !isStrongPassword(newPassword)
    ) {
      return res.status(400).json({
        success: false,
        message:
          "New password must be at least 8 characters and contain uppercase, lowercase and number"
      });
    }

    await authService.changePassword(
      req.user._id,
      currentPassword,
      newPassword
    );

    clearRefreshCookie(res);

    res.status(200).json({
      success: true,
      message:
        "Password changed successfully. Please login again."
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  refresh,
  logout,
  getMe,
  updateProfile,
  changePassword
};