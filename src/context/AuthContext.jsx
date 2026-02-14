import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import { isTokenExpired, clearExpiredToken, isTokenValid } from '../utils/tokenUtils';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (storedToken && storedUser) {
      // Check if token is expired before setting user state
      if (!isTokenExpired(storedToken)) {
        setToken(storedToken);
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        } catch (error) {
          // Clear corrupted user data
          clearExpiredToken();
        }
      } else {
        // Token is expired, clear localStorage
        clearExpiredToken();
      }
    }
    setLoading(false);
  }, []);

  // Periodic token validation check
  useEffect(() => {
    if (!token) return;

    const checkTokenExpiry = () => {
      if (isTokenExpired(token)) {
        clearExpiredToken();
        setUser(null);
        setToken(null);
      }
    };

    // Check every minute
    const interval = setInterval(checkTokenExpiry, 60000);

    return () => clearInterval(interval);
  }, [token]);

  const login = async (username, password) => {
    try {
      const response = await api.login(username, password);
      
      const { user: userData, token: userToken } = response;
      
      localStorage.setItem('token', userToken);
      localStorage.setItem('user', JSON.stringify(userData));
      
      setToken(userToken);
      setUser(userData);
      
      return { success: true };
    } catch (error) {
      // Standardized error handling
      if (error.tokenExpired) {
        clearExpiredToken();
        setUser(null);
        setToken(null);
        return { 
          success: false, 
          error: 'Session expired. Please login again.',
          tokenExpired: true
        };
      }
      return { 
        success: false, 
        error: error.error || 'Login failed',
        field: error.field 
      };
    }
  };

  const signup = async (username, password) => {
    try {
      const response = await api.signup(username, password);
      
      return { success: true, message: response.message };
    } catch (error) {
      // Standardized error handling
      return { 
        success: false, 
        error: error.error || 'Signup failed',
        field: error.field 
      };
    }
  };

  const logout = () => {
    clearExpiredToken();
    setUser(null);
    setToken(null);
  };

  const value = {
    user,
    token,
    loading,
    login,
    signup,
    logout,
    isAuthenticated: !!token,
    isTokenValid // Expose token validation function
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
