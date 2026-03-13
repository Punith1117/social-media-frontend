# Social Media Frontend

A modern **React** social media application demonstrating scalable architecture, real-world features, and production deployment.

This production-ready frontend showcases modern React development with scalable state management, interactive social features, and performance-focused UI design.

Developed as The Odin Project – Full Stack Final Project, the application integrates with a RESTful backend and implements features commonly found in modern social platforms, including follows, likes, comments, infinite scrolling feeds, and Progressive Web App capabilities.

**Live Demo**: https://social-media-punith1117.netlify.app/explore  
(~30 seconds backend server restart time due to free tier hosting)  

**Backend Repository**: https://github.com/Punith1117/social-media-backend

### Demo Account
Use the following credentials to explore the app:  
**Username:** pun  
**Password:** 1Abcd

---

## 🛠️ Tech Stack

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Styled Components](https://img.shields.io/badge/Styled_Components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)

---

## 📋 Table of Contents

- [Core Features](#core-features)
- [Technical Architecture](#technical-architecture)
- [Performance & Scalability](#performance--scalability)
- [Development Process](#development-process)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [API Integration](#api-integration)
- [Deployment & DevOps](#deployment--devops)

---

## 🎬 Feature Demos

### Post Management
Create, delete, and edit posts
![Create/Delete Post](./public/create-delete-post.gif?width=450)

### Infinite Scrolling Feed
Seamless content loading with intersection observer.
![Feed Scroll](./public/feed-scroll.gif?width=450)

### Profile Customization
Personalize your profile with photo uploads and edits.
![Profile Customization](./public/profile-customization.gif?width=450)

### User Search & Follow
Discover and follow other users with debounced search.
![User Search & Follow](./public/user-search-and-follow.gif?width=450)

---

## Core Features

### 🔐 Authentication & User Management
- **Secure JWT Flow**: Token expiration detection with automatic cleanup
- **Profile System**: Profile photo upload and deletion with localStorage persistence
- **Form Validation**: Real-time validation with clear error states

### 📱 Social Engagement
- **Content Management**: Full CRUD operations for posts (300 character limit)
- **Interactive Features**: Like and unlike posts with optimistic UI updates
- **Comment System**: Paginated comments with a 100 character limit
- **Follow Network**: Follow and unfollow users with follower statistics
- **User Discovery**: Search functionality with debounced API requests

### ⚡ User Experience
- **Responsive Design**: Adaptive layouts for both mobile and desktop
- **Infinite Scrolling**: Intersection Observer API for seamless feed loading
- **Smart Navigation**: Protected routes with authentication guards
- **Performance Features**: Loading states, error handling, and back-to-top navigation
- **Native Sharing**: Web Share API with clipboard fallback

### 📱 Progressive Web App
- **Offline Support**: Service worker caching for improved reliability
- **Installable App**: PWA install support with custom icons
- **Cross Platform**: Standalone experience with responsive layouts

**Production Features**: Core features across authentication, social engagement, UX, and PWA capabilities

---

## Technical Architecture

### Component System
- **React 19** with modern functional components and hooks
- **Styled Components** for scoped styling with centralized themes
- **Custom Hooks** for reusable logic (`useDebounced`, `useFeed`, `useFollow`)
- **Context API** for global authentication and profile state

### State Management
- **Global State** handled via Context Providers
- **Local Component State** managed with `useState`
- **Persistence Layer** using `localStorage`
- **Optimistic Updates** for instant UI responsiveness

### API Integration
- **Centralized API Service Layer**
- **JWT Authentication Handling**
- **RESTful Endpoints with Proper HTTP Methods**
- **Multipart File Uploads for Profile Images**

---

## Performance & Scalability

### Performance Optimizations
- **Infinite Scrolling** reduces initial data payload
- **Debounced Search** prevents excessive API calls
- **Optimistic UI Updates** improve user responsiveness
- **Efficient Component Structure** reduces unnecessary re-renders
- **Lazy Loading** for code splitting and faster initial load

### Scalability Features
- **Pagination** for handling large datasets efficiently
- **Graceful Error Handling** prevents UI crashes
- **Loading States** with text indicators during async operations
- **Service Worker Caching** enables offline reliability

---

## Development Process

### Code Quality
- **ESLint** for consistent code style and error detection
- **Reusable Component Architecture**
- **Robust Error Handling** with try-catch blocks and user feedback
- **Centralized Theme System** supporting dark/light mode

### Development Workflow
- **Git Version Control** with conventional commits
- **Vite Build Tool** for fast development and optimized production builds
- **Testing Infrastructure** ready for unit and integration tests

### Security Considerations
- **JWT Authentication** with token expiration handling
- **Input Validation** on forms and API requests
- **Token Storage** using localStorage
- **Token Cleanup** on expiration and logout

**Note:** Tokens are stored in localStorage, which is vulnerable to XSS attacks. For production environments, HttpOnly cookies would be preferable.

### Accessibility
- **Semantic HTML5** for screen reader compatibility
- **ARIA Labels** on interactive elements
- **Keyboard Navigation** support
- **Focus Management** for modal dialogs
- **Color Contrast** meeting WCAG standards

---

## Quick Start

### Prerequisites
- Node.js 20+
- npm
- Running backend API

### Installation

```bash
# Clone repository
git clone https://github.com/Punith1117/social-media-frontend.git

cd social-media-frontend

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env with your configuration:
VITE_API_BASE_URL=http://localhost:3000
VITE_APP_NAME=Social Media App

# Start development server
npm run dev

# Build and preview production build
npm run build && npm run preview
```

---

## Project Structure

* `public/`: Static assets and index.html
* `src/`: Source code for the application
* `src/components/`: Reusable React components
* `src/context/`: Global state management with Context API
* `src/hooks/`: Custom React hooks for reusable logic
* `src/pages/`: Page-level components for routing
* `src/services/`: API service layer for data fetching
* `src/utils/`: Utility functions for miscellaneous tasks

---

## API Integration

* `src/services/api.js`: Centralized API service layer with Axios configuration
* `JWT Authentication`: Bearer token handling and automatic cleanup
* **RESTful Endpoints**: Standard HTTP methods for CRUD operations

---

## Deployment & DevOps

* `netlify.toml`: Netlify configuration for deployment
* `vite.config.js`: Vite configuration for development and production builds