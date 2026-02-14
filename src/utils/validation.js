export const validateUsername = (username) => {
  if (!username) {
    return 'Username is required';
  }
  
  if (username.length < 3 || username.length > 20) {
    return 'Username must be 3-20 characters long';
  }
  
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return 'Username must contain only letters, numbers, and underscores';
  }
  
  return null;
};

export const validatePassword = (password) => {
  if (!password) {
    return 'Password is required';
  }
  
  if (password.length < 5) {
    return 'Password must be at least 5 characters long';
  }
  
  if (!/[a-z]/.test(password)) {
    return 'Password must contain at least one lowercase letter';
  }
  
  if (!/[A-Z]/.test(password)) {
    return 'Password must contain at least one uppercase letter';
  }
  
  if (!/[0-9]/.test(password)) {
    return 'Password must contain at least one number';
  }
  
  return null;
};

export const validateSignupForm = (username, password) => {
  const usernameError = validateUsername(username);
  const passwordError = validatePassword(password);
  
  return {
    username: usernameError,
    password: passwordError,
    isValid: !usernameError && !passwordError
  };
};

export const validateLoginForm = (username, password) => {
  const usernameError = !username ? 'Username is required' : null;
  const passwordError = !password ? 'Password is required' : null;
  
  return {
    username: usernameError,
    password: passwordError,
    isValid: !usernameError && !passwordError
  };
};
