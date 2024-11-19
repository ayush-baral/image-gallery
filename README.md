# Image Gallery Project Documentation

## Overview

This is a modern React application built with cutting-edge web development technologies to create an efficient and responsive image gallery. The project leverages powerful tools and libraries to ensure optimal performance and developer experience.

## Technology Stack

- **Frontend Framework**: React
- **Build Tool**: Vite (for lightning-fast development and builds)
- **Styling**: Tailwind CSS
- **Data Fetching**: 
  - Axios for API requests
  - TanStack Query for server state management and caching
- **List Rendering**: React Window for virtualized list performance

## Prerequisites

### System Requirements
- Node.js (v18+)
- Package Manager:
  - pnpm (recommended)
  - npm
  - yarn

### Recommended Development Environment
- Visual Studio Code
- Latest version of Chrome/Firefox
- Git 

## Project Setup

### 1. Clone the Repository
```bash
git clone https://github.com/ayush-baral/image-gallery.git
cd image-gallery
```

### 2. Install Dependencies
```bash
# Using pnpm (recommended)
pnpm install

# Alternative: npm
npm install

# Alternative: yarn
yarn install
```

### 3. Configure Environment
Create a `.env` file in the project root:
```
VITE_BASE_URL=https://picsum.photos
```

## Development Workflow

### Running the Application
```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Folder Structure

```
src/
│
├── assets/         # Static resources
├── components/     # Reusable UI components
├── config/         # Application configurations
├── lib/            # Utility functions
├── services/       # API service layers
└── types/          # TypeScript type definitions
```

### Key Architectural Decisions
- **Modularity**: Components designed for maximum reusability
- **Type Safety**: Comprehensive TypeScript type definitions
- **Performance**: Virtualized rendering for large datasets

## Performance Optimizations
- Virtualized list rendering with React Window
- Efficient data fetching and caching via TanStack Query
- Minimal bundle size with Vite

