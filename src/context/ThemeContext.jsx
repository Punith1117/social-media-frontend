import React, { createContext, useContext, useEffect, useState } from 'react';
import { getDeviceTheme, darkColors, lightColors, animations } from '../theme';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => getDeviceTheme() === 'dark');
  const [colors, setColors] = useState(() => (getDeviceTheme() === 'dark' ? darkColors : lightColors));

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
    
    const handleChange = (e) => {
      const newIsDarkMode = !e.matches;
      setIsDarkMode(newIsDarkMode);
      setColors(newIsDarkMode ? darkColors : lightColors);
    };

    // Add listener for theme changes
    mediaQuery.addEventListener('change', handleChange);

    // Cleanup listener
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const theme = {
    colors,
    isDarkMode,
    animations
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};
