import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../../context/ThemeContext';

const TestContainer = styled.div`
  padding: 20px;
  margin: 20px;
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  border: 2px solid ${props => props.theme.colors.primary};
  border-radius: 10px;
  font-family: Inter, sans-serif;
`;

const ThemeTest = () => {
  const { isDarkMode, colors } = useTheme();
  
  return (
    <TestContainer>
      <h3>Theme Test Component</h3>
      <p>Current mode: {isDarkMode ? 'Dark' : 'Light'}</p>
      <p>Background color: {colors.background}</p>
      <p>Text color: {colors.text}</p>
      <p>Primary color: {colors.primary}</p>
    </TestContainer>
  );
};

export default ThemeTest;
