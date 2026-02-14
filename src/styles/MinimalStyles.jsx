import styled from 'styled-components';

// Layout
export const Container = styled.div`
  max-width: 400px;
  margin: 2rem auto;
  padding: 1rem;
`;

export const CenterContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

// Typography
export const Title = styled.h1`
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
`;

export const Text = styled.p`
  margin: 1rem 0;
  text-align: center;
  
  a {
    color: #0066cc;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

// Form
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const Label = styled.label`
  font-weight: 500;
`;

export const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid ${props => props.$hasError ? '#cc0000' : '#ccc'};
  border-radius: 4px;
  
  &:focus {
    outline: none;
    border-color: ${props => props.$hasError ? '#cc0000' : '#0066cc'};
  }
`;

export const Button = styled.button`
  padding: 0.5rem 1rem;
  background: #0066cc;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background: #0052a3;
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

export const ErrorMessage = styled.span`
  color: #cc0000;
  font-size: 0.8rem;
`;

export const SuccessMessage = styled.span`
  color: #006600;
  font-size: 0.8rem;
`;
