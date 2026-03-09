# Social Media Frontend

A modern, full-featured social media frontend application built with React and Vite. This is the frontend component of **The Odin Project's Full Stack Curriculum Final Project**, demonstrating professional web development practices and real-world functionality.

## 🚀 Features

### **User Authentication & Management**
- Secure JWT-based authentication with automatic token expiration handling
- User registration and login with form validation
- Profile management with photo upload/delete capabilities
- Persistent user sessions with localStorage

### **Social Features**
- **Post Management**: Create, read, update, and delete posts
- **Engagement**: Like/unlike posts with optimistic UI updates
- **Comments**: Comment system with pagination
- **Follow System**: Follow/unfollow users with real-time follower counts
- **User Discovery**: Search users and explore public content
- **Content Sharing**: Native Web Share API with clipboard fallback

### **User Experience**
- **Responsive Design**: Adaptive layouts for mobile and desktop
- **Infinite Scrolling**: Intersection Observer API for seamless content loading
- **Advanced Form Validation**: Real-time field validation with error states
- **Smart Search**: Debounced search functionality to reduce API calls
- **Content Controls**: Character counters for comments (100 characters) and posts (300 characters)
- **Navigation**: Protected routes with authentication-based access control
- **User Feedback**: Back to top button for long feeds and loading states
- **Performance**: Optimistic updates with automatic rollback on errors
- **Feedback Systems**: Loading states and error handling
- **Pagination**: Efficient data loading for posts and comments

### **Progressive Web App (PWA)**
- **Offline-First Architecture**: Service worker-powered caching for reliable performance even without internet connectivity
- **Native App Installability**: Web app manifest with custom icons enabling one-click installation on mobile and desktop devices
- **Enhanced User Experience**: App-like behavior with standalone mode, responsive design, and cross-platform compatibility
- **Performance Optimization**: Intelligent resource caching and background updates for lightning-fast load times

## 🛠️ Technical Architecture

### **Frontend Stack**
- **React 19** with modern hooks and functional components
- **Vite** for fast development and optimized builds
- **React Router** for client-side routing with protected routes
- **Styled Components** for component-scoped styling
- **Lucide React** for modern iconography

### **State Management**
- **Context API** for authentication and profile state
- **Custom Hooks** for reusable logic (debouncing, feed management, follow functionality, form validation)
- **Local Storage** for session persistence

### **API Integration**
- **Centralized API Service** with standardized error handling
- **RESTful Architecture** with proper HTTP methods
- **JWT Authentication** with automatic token management
- **File Upload** support for profile images

### **Code Quality**
- **ESLint** configuration for consistent code style
- **Component Architecture** with separation of concerns
- **Comprehensive Error Handling** throughout the application
- **Optimistic Updates** for enhanced user experience

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── auth/           # Authentication forms
│   ├── common/         # Shared components (buttons, modals, etc.)
│   ├── comments/       # Comment system
│   ├── layout/         # App layout and navigation
│   ├── posts/          # Post-related components
│   ├── profile/       # User profile components
│   └── users/          # User listing components
├── context/            # React context providers
├── hooks/              # Custom React hooks
├── pages/              # Route-level components
├── services/           # API service layer
├── utils/              # Utility functions
└── styles/             # Global styles and themes
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Backend API service (Node.js + Express + PostgreSQL)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd social-media-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   # Configure VITE_API_BASE_URL to point to your backend
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

5. **Build for Production**
   ```bash
   npm run build
   ```

## 🔧 Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌐 API Integration

The frontend is designed to work with a RESTful API backend. Key endpoints include:

- **Authentication**: `/auth/login`, `/auth/signup`
- **Users**: `/users/me`, `/users/:username`, `/users/search`
- **Posts**: `/posts`, `/posts/:id`, `/users/:username/posts`
- **Follows**: `/follow/:userId`, `/follow/stats/:userId`
- **Comments**: `/posts/:id/comments`
- **Feed**: `/feed/home`, `/feed/explore`

## 💡 Key Implementation Highlights

### **Authentication Flow**
- JWT tokens with automatic expiration detection
- Periodic token validation checks (every 60 seconds)
- Secure logout with token cleanup
- Protected routes with automatic redirects

### **Performance Optimizations**
- Optimistic updates for immediate UI feedback
- Pagination for large datasets
- Component memoization where beneficial
- Efficient state management with context

### **Error Handling**
- Standardized error objects across API calls
- User-friendly error messages
- Graceful degradation for network issues

### **User Experience**
- Loading states for all async operations
- Form validation with inline error messages
- Responsive design for mobile and desktop
- Accessibility considerations

## 🎯 Demonstrated Skills

This project, completed as **The Odin Project's Full Stack Final Project**, showcases proficiency in:
- Modern React development (hooks, context, functional components)
- State management patterns and architecture
- RESTful API integration and error handling
- Component-based design and reusability
- Responsive web development
- Authentication and security best practices
- Performance optimization techniques
- Professional code organization and maintainability
- Progressive Web App (PWA) development with service workers and web app manifests

## 🔗 Backend Repository

https://github.com/Punith1117/social-media-backend

---

**Built with ❤️ as The Odin Project's Full Stack Final Project**
