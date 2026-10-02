const User = require("../models/user");

const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  hashToken
} = require("../utils/jwt");

const registerUser = async ({
  name,
  email,
  password
}) => {
  const normalizedEmail = email.toLowerCase().trim();

  const existingUser = await User.findOne({
    email: normalizedEmail
  });

  if (existingUser) {
    const error = new Error("Email is already registered");
    error.statusCode = 409;
    throw error;
  }

  const user = await User.create({
    name: name.trim(),
    email: normalizedEmail,
    password
  });

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  user.refreshTokenHash = hashToken(refreshToken);
  user.refreshTokenExpiresAt = getRefreshTokenExpiration();

  await user.save();

  return {
    user: user.toSafeObject(),
    accessToken,
    refreshToken
  };
};

const loginUser = async ({
  email,
  password
}) => {
  const normalizedEmail = email.toLowerCase().trim();

  const user = await User.findOne({
    email: normalizedEmail
  }).select(
    "+password +refreshTokenHash +refreshTokenExpiresAt"
  );

  if (!user) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  if (!user.isActive) {
    const error = new Error("Your account is disabled");
    error.statusCode = 403;
    throw error;
  }

  const passwordMatch =
    await user.comparePassword(password);

  if (!passwordMatch) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  user.lastLogin = new Date();

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  user.refreshTokenHash = hashToken(refreshToken);
  user.refreshTokenExpiresAt = getRefreshTokenExpiration();

  await user.save();

  return {
    user: user.toSafeObject(),
    accessToken,
    refreshToken
  };
};

const refreshUserToken = async (refreshToken) => {
  if (!refreshToken) {
    const error = new Error("Refresh token is required");
    error.statusCode = 401;
    throw error;
  }

  let payload;

  try {
    payload = verifyRefreshToken(refreshToken);
  } catch (error) {
    const authError = new Error("Invalid or expired refresh token");
    authError.statusCode = 401;
    throw authError;
  }

  const user = await User.findById(payload.sub).select(
    "+refreshTokenHash +refreshTokenExpiresAt"
  );

  if (!user || !user.isActive) {
    const error = new Error("User not found or inactive");
    error.statusCode = 401;
    throw error;
  }

  const tokenHash = hashToken(refreshToken);

  if (
    !user.refreshTokenHash ||
    user.refreshTokenHash !== tokenHash
  ) {
    const error = new Error("Refresh token has been revoked");
    error.statusCode = 401;
    throw error;
  }

  if (
    !user.refreshTokenExpiresAt ||
    user.refreshTokenExpiresAt < new Date()
  ) {
    const error = new Error("Refresh token has expired");
    error.statusCode = 401;
    throw error;
  }

  const newAccessToken = generateAccessToken(user);
  const newRefreshToken = generateRefreshToken(user);

  user.refreshTokenHash = hashToken(newRefreshToken);
  user.refreshTokenExpiresAt =
    getRefreshTokenExpiration();

  await user.save();

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken
  };
};

const logoutUser = async (userId) => {
  await User.findByIdAndUpdate(userId, {
    $set: {
      refreshTokenHash: null,
      refreshTokenExpiresAt: null
    }
  });
};

const getUserById = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  return user;
};

const updateProfile = async (
  userId,
  { name }
) => {
  const user = await User.findById(userId);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  if (name !== undefined) {
    if (name.trim().length < 2) {
      const error = new Error(
        "Name must contain at least 2 characters"
      );
      error.statusCode = 400;
      throw error;
    }

    user.name = name.trim();
  }

  await user.save();

  return user;
};

const changePassword = async (
  userId,
  currentPassword,
  newPassword
) => {
  const user = await User.findById(userId).select(
    "+password"
  );

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  const validPassword =
    await user.comparePassword(currentPassword);

  if (!validPassword) {
    const error = new Error(
      "Current password is incorrect"
    );
    error.statusCode = 401;
    throw error;
  }

  user.password = newPassword;

  /*
   * Revoke existing refresh token after password change.
   */
  user.refreshTokenHash = null;
  user.refreshTokenExpiresAt = null;

  await user.save();
};

const getRefreshTokenExpiration = () => {
  const days = 7;

  return new Date(
    Date.now() +
      days * 24 * 60 * 60 * 1000
  );
};

module.exports = {
  registerUser,
  loginUser,
  refreshUserToken,
  logoutUser,
  getUserById,
  updateProfile,
  changePassword
};