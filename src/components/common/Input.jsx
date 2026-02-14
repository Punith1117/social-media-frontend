import React from 'react';
import { FormGroup, Label, Input as StyledInput, ErrorMessage } from '../../styles/MinimalStyles';

const Input = ({ 
  label, 
  type = 'text', 
  value, 
  onChange, 
  onBlur, 
  error, 
  placeholder,
  disabled = false,
  ...props 
}) => {
  return (
    <FormGroup>
      {label && <Label>{label}</Label>}
      <StyledInput
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        $hasError={!!error}
        disabled={disabled}
        {...props}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </FormGroup>
  );
};

export default Input;
