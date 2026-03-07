import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    background: linear-gradient(135deg, #1a0f0f 0%, #2d1a1a 50%, #0f0f0f 100%);
    min-height: 100vh;
    color: #e8d5c7;
    line-height: 1.6;
  }
`;

export default GlobalStyles;
