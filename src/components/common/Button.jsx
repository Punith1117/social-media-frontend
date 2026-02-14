import React from 'react';
import { Button as StyledButton } from '../../styles/MinimalStyles';

const Button = ({ 
  children, 
  onClick, 
  type = 'button', 
  disabled = false,
  ...props 
}) => {
  return (
    <StyledButton
      type={type}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
