import { useState, useCallback } from 'react';
import { validateUsername, validatePassword, validateSignupForm, validateLoginForm } from '../utils/validation';

export const useSignupValidation = () => {
  const [errors, setErrors] = useState({
    username: null,
    password: null
  });

  const validateField = useCallback((field, value) => {
    const error = field === 'username' ? validateUsername(value) : validatePassword(value);
    
    setErrors(prev => ({
      ...prev,
      [field]: error
    }));
    
    return !error;
  }, []);

  const validateForm = useCallback((username, password) => {
    const result = validateSignupForm(username, password);
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

export const useLoginValidation = () => {
  const [errors, setErrors] = useState({
    username: null,
    password: null
  });

  const validateField = useCallback((field, value) => {
    const error = !value ? `${field.charAt(0).toUpperCase() + field.slice(1)} is required` : null;
    
    setErrors(prev => ({
      ...prev,
      [field]: error
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
