import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSignupValidation } from '../../hooks/useValidation';
import { useAuth } from '../../context/AuthContext';
import { CenterContainer, Container, Title, Form, Text } from '../../styles/MinimalStyles';
import Input from '../common/Input';
import Button from '../common/Button';

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
    <CenterContainer>
      <Container>
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
            <div style={{ color: '#cc0000', fontSize: '0.9rem', textAlign: 'center' }}>
              {apiError}
            </div>
          )}
          
          <Button type="submit" disabled={loading}>
            {loading ? 'Creating Account...' : 'Sign Up'}
          </Button>
        </Form>
        
        <Text>
          Already have an account? <a href="/login">Log In</a>
        </Text>
      </Container>
    </CenterContainer>
  );
};

export default SignupForm;
