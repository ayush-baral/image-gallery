### Project Documentation

#### **Overview**

This is a React app built using **Vite**, a fast tool for creating and running web projects. The app uses **Tailwind CSS** for styling, **Axios** to fetch data from APIs, and **TanStack Query** to manage data fetching and caching easily.

---

### **Technologies Used**

- **Vite**: Makes development and builds faster.
- **React**: Used for creating user interfaces.
- **Tailwind CSS**: For styling the app.
- **Axios**: To fetch data from APIs.
- **TanStack Query**: To handle data fetching and caching.

---

### **Requirements**

Before starting, make sure you have:

- **Node.js** (version 18 or later)
- A package manager like **pnpm** (preferred), **npm**, or **yarn**

---

### **How to Set Up and Run**

1. **Clone the Project**

   ```bash
   git clone https://github.com/ayush-baral/image-gallery.git
   cd image-gallery
   ```

2. **Install Dependencies**
   Run this command to install everything the project needs:

   ```bash
   pnpm install
   ```

   If you're using `npm` or `yarn`, you can replace `pnpm` with your package manager.

3. **Start the Development Server**
   To start the app locally:

   ```bash
   pnpm dev
   ```

4. **Build the App**
   To create a version of the app ready to go live:

   ```bash
   pnpm build
   ```

5. **Preview the Built App**
   To test the production build locally:
   ```bash
   pnpm preview
   ```

---

### **Folder Structure**

- **`src/assets`**
  - Stores static files like images, icons, and fonts
- **`src/components`**
  - Contains reusable UI components
  - Each component should be modular and independent
- **`src/config`**
  - Application configuration files
  - Environment variables and global settings
- **`src/lib`**
  - Utility libraries and helpers
  - Includes API interceptors and handlers
- **`src/services`**
  - API integration files
  - Handles all external service communications
- **`src/types`**
  - TypeScript type definitions
  - Shared interfaces and types used across the app

---

### **Features**

- **Responsive Design**: Works well on all devices.
- **Fast Data Fetching**: Uses Axios and caches results with TanStack Query.
- **Optimized Development**: Vite makes the setup and builds fast and efficient.

---

### **Environment Variables**

You need a `.env` file in the root folder for API URLs and other settings:

```
VITE_BASE_URL = https://picsum.photos
```

---

### **Common Commands**

- **Start the app**: `pnpm dev`
- **Build the app**: `pnpm build`
- **Run production preview**: `pnpm preview`
