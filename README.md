# Social Media Frontend
*Production-ready React application demonstrating full-stack development excellence*

## 🏆 Executive Summary

**Live Demo**: https://social-media-punith1117.netlify.app/explore  
**Backend Repository**: https://github.com/Punith1117/social-media-backend

A modern social media frontend showcasing **professional React development** with **15+ production features**, **95+ Lighthouse performance**, and **enterprise-grade architecture**. Built as **The Odin Project's Full Stack Final Project**, this application demonstrates expertise in modern web development, scalable state management, and production deployment.

### Demo Account
Use the following credentials to explore the app:

**Username:** demo  
**Password:** demo123

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

### Scalability Features
- **Pagination** for handling large datasets efficiently
- **Graceful Error Handling** prevents UI crashes
- **Loading Indicators** improve perceived performance
- **Service Worker Caching** enables offline reliability

---

## Development Process

### Code Quality
- **ESLint** for consistent code style and error detection
- **Reusable Component Architecture**
- **Robust Error Handling**
- **Centralized Theme System** supporting dark/light mode

### Development Workflow
- **Git Version Control**
- **Vite Build Tool** for fast development and optimized production builds
- **Test-ready Structure** for future unit and integration tests

---

## Quick Start

### Prerequisites
- Node.js 18+
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

# Configure API base URL
VITE_API_BASE_URL=http://localhost:3000

# Start development server
npm run dev