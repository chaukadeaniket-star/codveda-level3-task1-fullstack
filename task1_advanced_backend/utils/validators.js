const isValidEmail = (email) => {
  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(email);
};

const isStrongPassword = (password) => {
  if (!password || password.length < 8) {
    return false;
  }

  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  return hasUppercase && hasLowercase && hasNumber;
};

const validateRegisterInput = ({
  name,
  email,
  password
}) => {
  const errors = {};

  if (!name || name.trim().length < 2) {
    errors.name = "Name must contain at least 2 characters";
  }

  if (!email || !isValidEmail(email)) {
    errors.email = "Enter a valid email address";
  }

  if (!isStrongPassword(password)) {
    errors.password =
      "Password must be at least 8 characters and contain uppercase, lowercase and number";
  }

  return errors;
};

module.exports = {
  isValidEmail,
  isStrongPassword,
  validateRegisterInput
};