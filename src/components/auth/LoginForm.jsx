import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLoginValidation } from '../../hooks/useValidation';
import { useAuth } from '../../context/AuthContext';
import { CenterContainer, Container, Title, Form, Text } from '../../styles/MinimalStyles';
import Input from '../common/Input';
import Button from '../common/Button';

const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const { errors, validateField, validateForm, clearErrors } = useLoginValidation();
  
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
      // Clear the message from location state
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Real-time validation
    validateField(name, value);
    
    // Clear errors when user starts typing
    if (apiError) {
      setApiError(null);
    }
    if (successMessage) {
      setSuccessMessage(null);
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
      const result = await login(formData.username, formData.password);
      
      if (result.success) {
        clearErrors();
        navigate('/');
      } else {
        if (result.tokenExpired) {
          setApiError('Your session has expired. Please login again.');
        } else {
          setApiError(result.error);
        }
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
        <Title>Log In</Title>
        <Form onSubmit={handleSubmit}>
          {successMessage && (
            <div style={{ 
              color: '#006600', 
              fontSize: '0.9rem', 
              textAlign: 'center',
              marginBottom: '1rem'
            }}>
              {successMessage}
            </div>
          )}
          
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
            {loading ? 'Logging In...' : 'Log In'}
          </Button>
        </Form>
        
        <Text>
          Don't have an account? <a href="/signup">Sign Up</a>
        </Text>
      </Container>
    </CenterContainer>
  );
};

export default LoginForm;
