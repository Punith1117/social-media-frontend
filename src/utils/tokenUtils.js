import { jwtDecode } from 'jwt-decode';

export const isTokenExpired = (token) => {
  if (!token) {
    return true;
  }

  try {
    const decoded = jwtDecode(token);
    if (!decoded || !decoded.exp) {
      return true;
    }
    
    // Check if token is expired (exp is in seconds, Date.now() is in milliseconds)
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
  } catch (error) {
    // Removed console.error for production
    return true;
  }
};

// Centralized token cleanup function
export const clearExpiredToken = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

// Check if current token is valid
export const isTokenValid = () => {
  const storedToken = localStorage.getItem('token');
  return storedToken && !isTokenExpired(storedToken);
};
