import { useState, useCallback } from 'react';
import { validateUsername, validatePassword, validateConfirmPassword, validateSignupForm, validateLoginForm } from '../utils/validation';

export const useSignupValidation = () => {
  const [errors, setErrors] = useState({
    username: null,
    password: null,
    confirmPassword: null
  });

  const validateField = useCallback((fieldName, value, password = '') => {
    let error;
    switch (fieldName) {
      case 'username':
        error = validateUsername(value);
        break;
      case 'password':
        error = validatePassword(value);
        break;
      case 'confirmPassword':
        error = validateConfirmPassword(password, value);
        break;
      default:
        error = null;
    }
    
    setErrors(prev => ({
      ...prev,
      [fieldName]: error
    }));
    
    return !error;
  }, []);

  const validateForm = useCallback((username, password, confirmPassword) => {
    const result = validateSignupForm(username, password, confirmPassword);
    setErrors({
      username: result.username,
      password: result.password,
      confirmPassword: result.confirmPassword
    });
    return result.isValid;
  }, []);

  const clearErrors = useCallback(() => {
    setErrors({ username: null, password: null, confirmPassword: null });
  }, []);

  return {
    errors,
    validateField,
    validateForm,
    clearErrors
  };
};

export const useLoginValidation = () => {
  const [errors, setErrors] = useState({
    username: null,
    password: null
  });

  const validateField = useCallback((fieldName, value) => {
    const error = !value ? `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required` : null;
    
    setErrors(prev => ({
      ...prev,
      [fieldName]: error
    }));
    
    return !error;
  }, []);

  const validateForm = useCallback((username, password) => {
    const result = validateLoginForm(username, password);
    setErrors({
      username: result.username,
      password: result.password
    });
    return result.isValid;
  }, []);

  const clearErrors = useCallback(() => {
    setErrors({ username: null, password: null });
  }, []);

  return {
    errors,
    validateField,
    validateForm,
    clearErrors
  };
};
