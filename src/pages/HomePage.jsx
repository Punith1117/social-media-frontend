import React from 'react';
import { useAuth } from '../context/AuthContext';
import { CenterContainer, Container, Title, Text, Button } from '../styles/MinimalStyles';

const HomePage = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <CenterContainer>
      <Container>
        <Title>Welcome to Social Media App!</Title>
        <Text>
          You have successfully logged in. This is your protected home page where you can access all the features of the application.
        </Text>
        
        <div style={{ textAlign: 'left', margin: '1rem 0' }}>
          <h3>User Information</h3>
          <p><strong>Username:</strong> {user?.username}</p>
          <p><strong>User ID:</strong> {user?.id}</p>
          <p><strong>Member Since:</strong> {new Date(user?.createdAt).toLocaleDateString()}</p>
        </div>
        
        <Button onClick={handleLogout} style={{ background: '#cc0000' }}>
          Logout
        </Button>
      </Container>
    </CenterContainer>
  );
};

export default HomePage;
