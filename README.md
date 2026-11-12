# Around the U.S. — React Application

A responsive photo-sharing application built with **React and Vite**, featuring user authentication, protected routes, and REST API integration.

**[Live Demo](https://jlcambraia.github.io/web_project_around_auth/)**

## Overview

Around the U.S. is an interactive photo-sharing application demonstrating component-based frontend development, client-side routing, authentication workflows, and communication with external APIs.

Developed as part of the **TripleTen Full Stack Web Development program**.

## Features

- User registration and login
- Authentication-aware navigation
- Protected routes
- User profile interface
- Photo-sharing interface
- REST API integration
- Authentication token storage
- Interactive feedback components
- Responsive layouts for desktop and mobile

## Tech Stack

- React 19
- Vite 6
- JavaScript (ES6+)
- React Router 7
- HTML5 and CSS3
- React Hooks
- REST APIs
- GitHub Pages

## Application Structure

The application uses reusable React components to organize its interface and authentication flow.

Key components documented in the project include:

- `Login` — user sign-in interface
- `Register` — account registration interface
- `ProtectedRoute` — access control for authenticated pages
- `InfoTooltip` — feedback for user interactions

React Hooks manage component state and application behavior.

## Authentication Flow

```text
User Registration / Login
           |
           v
  Authentication Request
           |
           v
       Token Storage
           |
           v
      Protected Routes
           |
           v
    Application Content
```

Authentication state is used to control access to protected areas of the application.

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

```bash
git clone https://github.com/jlcambraia/web_project_around_auth.git
cd web_project_around_auth
npm install
```

### Development

```bash
npm run dev
```

Open the local URL displayed by Vite.

### Production Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

### Deployment

The project includes a GitHub Pages deployment script:

```bash
npm run deploy
```

API connectivity depends on the application's configured backend endpoints.

## Learning Outcomes

This project provided practical experience with:

- React component architecture
- Client-side routing
- Authentication workflows
- Protected navigation
- Asynchronous API requests
- State management with React Hooks
- Responsive frontend development

## Potential Improvements

- Expanded automated testing
- Accessibility enhancements
- Internationalization
- Improved image loading performance
- Social sharing functionality

## Author

**João Luiz Cambraia**

[GitHub](https://github.com/jlcambraia) · [LinkedIn](https://www.linkedin.com/in/joaoluizcambraia/)
