export function isRequired(value) {
  return (
    value !== undefined &&
    value !== null &&
    String(value).trim().length > 0
  );
}

export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    email
  );
}

export function isValidPhone(phone) {
  return /^[6-9]\d{9}$/.test(
    String(phone).replace(/\s/g, "")
  );
}

export function isValidPassword(password) {
  return (
    typeof password === "string" &&
    password.length >= 8
  );
}

export function passwordsMatch(
  password,
  confirmPassword
) {
  return password === confirmPassword;
}

export function isValidPostalCode(code) {
  return /^\d{6}$/.test(
    String(code).trim()
  );
}

export function validateLoginForm(form) {
  const errors = {};

  if (!isRequired(form.email)) {
    errors.email = "Email is required.";
  } else if (!isValidEmail(form.email)) {
    errors.email = "Enter a valid email.";
  }

  if (!isRequired(form.password)) {
    errors.password = "Password is required.";
  }

  return errors;
}

export function validateRegisterForm(form) {
  const errors = {};

  if (!isRequired(form.name)) {
    errors.name = "Name is required.";
  }

  if (!isRequired(form.email)) {
    errors.email = "Email is required.";
  } else if (!isValidEmail(form.email)) {
    errors.email = "Enter a valid email.";
  }

  if (!isValidPassword(form.password)) {
    errors.password =
      "Password must contain at least 8 characters.";
  }

  if (
    !passwordsMatch(
      form.password,
      form.confirmPassword
    )
  ) {
    errors.confirmPassword =
      "Passwords do not match.";
  }

  return errors;
}