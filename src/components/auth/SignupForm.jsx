import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSignupValidation } from '../../hooks/useValidation';
import { useAuth } from '../../context/AuthContext';
import Input from '../common/Input';
import Button from '../common/Button';
import {
  AuthContainer,
  FormContainer,
  Title,
  Form,
  ErrorMessage,
  AuthText
} from './SignupForm.styles';

const SignupForm = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const { errors, validateField, validateForm, clearErrors } = useSignupValidation();
  
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Real-time validation
    validateField(name, value);
    
    // Clear API error when user starts typing
    if (apiError) {
      setApiError(null);
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm(formData.username, formData.password)) {
      return;
    }

    setLoading(true);
    setApiError(null);

    try {
      const result = await signup(formData.username, formData.password);
      
      if (result.success) {
        clearErrors();
        navigate('/login', { 
          state: { message: 'Account created successfully! Please log in.' }
        });
      } else {
        setApiError(result.error);
      }
    } catch (error) {
      setApiError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContainer>
      <FormContainer>
        <Title>Sign Up</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            label="Username"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleInputChange}
            onBlur={handleBlur}
            error={errors.username || (apiError?.field === 'username' ? apiError.error : null)}
            placeholder="Enter your username"
            disabled={loading}
          />
          
          <Input
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            onBlur={handleBlur}
            error={errors.password || (apiError?.field === 'password' ? apiError.error : null)}
            placeholder="Enter your password"
            disabled={loading}
          />
          
          {apiError && !apiError.field && (
            <ErrorMessage>
              {apiError}
            </ErrorMessage>
          )}
          
          <Button type="submit" disabled={loading}>
            {loading ? 'Creating Account...' : 'Sign Up'}
          </Button>
        </Form>
        
        <AuthText>
          Already have an account? <Link to="/login">Log In</Link>
        </AuthText>
      </FormContainer>
    </AuthContainer>
  );
};

export default SignupForm;
