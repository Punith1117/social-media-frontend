import { keyframes } from 'styled-components';

// Dark mode color palette - existing standardized values
export const darkColors = {
  primary: '#3b82f6',
  primaryLight: 'rgba(59, 130, 246, 0.2)',
  primaryBorder: 'rgba(59, 130, 246, 0.3)',
  background: 'rgba(20, 15, 15, 0.98)',
  surface: 'rgba(30, 25, 25, 0.95)',
  text: '#e8d5c7', // Warm cream text for dark backgrounds
  textLight: '#a8a29e',
  textSecondary: '#d4c5a7',
  danger: '#dc3545',
  dangerLight: 'rgba(220, 53, 69, 0.1)',
  dangerBorder: 'rgba(220, 53, 69, 0.3)',
  success: '#28a745',
  successLight: 'rgba(40, 167, 69, 0.1)',
  successBorder: 'rgba(40, 167, 69, 0.3)',
  warning: '#f39c12',
  warningLight: 'rgba(243, 156, 18, 0.1)',
  warningBorder: 'rgba(243, 156, 18, 0.3)',
  darkBg: '#0a0a0a',
  accent: '#8b4513',
  border: 'rgba(255, 255, 255, 0.1)',
  shadow: 'rgba(0, 0, 0, 0.3)'
};

// Light mode color palette - professional, clean design
export const lightColors = {
  primary: '#2563eb', // Slightly deeper blue for better contrast on light backgrounds
  primaryLight: 'rgba(37, 99, 235, 0.1)',
  primaryBorder: 'rgba(37, 99, 235, 0.2)',
  background: '#ffffff', // Pure white background
  surface: '#f8fafc', // Very light gray for cards/surfaces
  text: '#1e293b', // Dark slate for primary text
  textLight: '#64748b', // Medium gray for secondary text
  textSecondary: '#475569', // Darker gray for emphasis
  danger: '#dc2626', // Rich red
  dangerLight: 'rgba(220, 38, 38, 0.1)',
  dangerBorder: 'rgba(220, 38, 38, 0.2)',
  success: '#16a34a', // Modern green
  successLight: 'rgba(22, 163, 74, 0.1)',
  successBorder: 'rgba(22, 163, 74, 0.2)',
  warning: '#d97706', // Warm amber
  warningLight: 'rgba(217, 119, 6, 0.1)',
  warningBorder: 'rgba(217, 119, 6, 0.2)',
  darkBg: '#f1f5f9', // Light gray for dark elements
  accent: '#ea580c', // Vibrant orange accent
  border: 'rgba(0, 0, 0, 0.1)', // Subtle borders
  shadow: 'rgba(0, 0, 0, 0.1)' // Soft shadows
};

// Get device preference for color scheme
export const getDeviceTheme = () => {
  if (typeof window !== 'undefined') {
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }
  return 'dark'; // Default to dark mode for SSR
};

// Get appropriate color palette based on device preference
export const getThemeColors = () => {
  const deviceTheme = getDeviceTheme();
  return deviceTheme === 'light' ? lightColors : darkColors;
};

// Common animations
export const animations = {
  fadeIn: keyframes`
    from { 
      opacity: 0; 
      transform: translateY(20px); 
    }
    to { 
      opacity: 1; 
      transform: translateY(0); 
    }
  `,
  
  fadeInSlide: keyframes`
    from { 
      opacity: 0; 
      transform: translateX(-20px); 
    }
    to { 
      opacity: 1; 
      transform: translateX(0); 
    }
  `,
  
  slideIn: keyframes`
    from { 
      opacity: 0; 
      transform: translateY(-10px); 
    }
    to { 
      opacity: 1; 
      transform: translateY(0); 
    }
  `,
  
  slideUp: keyframes`
    from {
      opacity: 0;
      transform: translateY(20px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  `,
  
  shake: keyframes`
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
  `,
  
  pulse: keyframes`
    0%, 100% {
      box-shadow: 0 0 25px rgba(59, 130, 246, 0.8);
    }
    50% {
      box-shadow: 0 0 40px rgba(59, 130, 246, 1);
    }
  `
};

// Default theme object for initial render (will be overridden by ThemeContext)
const theme = {
  colors: darkColors, // Default to dark colors for SSR
  animations
};

export default theme;
