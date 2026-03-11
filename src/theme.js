import { keyframes } from 'styled-components';

// Centralized color palette - standardized values
export const colors = {
  primary: '#3b82f6',
  primaryLight: 'rgba(59, 130, 246, 0.2)',
  primaryBorder: 'rgba(59, 130, 246, 0.3)',
  background: 'rgba(20, 15, 15, 0.98)',
  text: '#e8d5c7', // Standardized text color
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
  accent: '#8b4513'
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

// Default theme object
const theme = {
  colors,
  animations
};

export default theme;
