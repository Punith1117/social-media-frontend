import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { AuthProvider } from './context/AuthContext';
import { ProfileProvider } from './context/ProfileContext';
import { ThemeProvider as CustomThemeProvider, useTheme } from './context/ThemeContext';
import GlobalStyles from './styles/GlobalStyles';
import ProtectedRoute from './components/layout/ProtectedRoute';
import AppLayout from './components/layout/AppLayout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import UserProfilePage from './pages/UserProfilePage';
import MyDetailsPage from './pages/MyDetailsPage';
import PostDetailPage from './pages/PostDetailPage';
import CreatePostPage from './pages/CreatePostPage';
import EditPostPage from './pages/EditPostPage';
import FollowersPage from './pages/FollowersPage';
import FollowingPage from './pages/FollowingPage';
import ExplorePage from './pages/ExplorePage';

// Inner component that uses the theme
const AppContent = () => {
  const theme = useTheme();
  
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AuthProvider>
        <ProfileProvider>
          <Router>
            <AppLayout>
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/users/:username" element={<UserProfilePage />} />
                <Route path="/users/:username/followers" element={<FollowersPage />} />
                <Route path="/users/:username/following" element={<FollowingPage />} />
                <Route 
                  path="/posts/:id/edit" 
                  element={
                    <ProtectedRoute>
                      <EditPostPage />
                    </ProtectedRoute>
                  } 
                />
                <Route path="/posts/:id" element={<PostDetailPage />} />
                <Route 
                  path="/create-post" 
                  element={
                    <ProtectedRoute>
                      <CreatePostPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/me" 
                  element={
                    <ProtectedRoute>
                      <MyDetailsPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/" 
                  element={
                    <ProtectedRoute>
                      <HomePage />
                    </ProtectedRoute>
                  } 
                />
                <Route path="/explore" element={<ExplorePage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </AppLayout>
          </Router>
        </ProfileProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

function App() {
  return (
    <CustomThemeProvider>
      <AppContent />
    </CustomThemeProvider>
  );
}

export default App;
