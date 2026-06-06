# 🎨 Frontend - Employee CRUD Application

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

## 🎯 Purpose
The frontend serves as the interactive user interface for the Employee Directory. It is built for speed, responsiveness, and a premium user experience, employing a modern "Glassmorphism" aesthetic.

## 🛠️ Technologies Used
- **React 18:** For building robust, state-driven UI components.
- **Vite:** Next-generation frontend tooling for instantaneous hot-module replacement (HMR).
- **Pure CSS:** Custom styling without the bloat of heavy UI frameworks.
- **Lucide React:** Beautiful, consistent SVG icons.

## 🧩 Component Structure
- `App.jsx`: The root entry point.
- `EmployeeDashboard.jsx`: The main view containing the data grid and state management logic.
- `EmployeeCard.jsx`: A reusable card component to display individual employee details.
- `EmployeeModal.jsx`: A React Portal-based modal for adding and editing records.
- `api.js`: A centralized service for handling all backend HTTP requests.

## 📂 Folder Structure
```text
frontend/
├── public/             # Static assets
├── src/
│   ├── assets/         # Images and SVGs
│   ├── components/     # React Components
│   ├── api.js          # API HTTP Fetch logic
│   ├── index.css       # Global Glassmorphism CSS
│   ├── main.jsx        # React DOM rendering
│   └── App.jsx         # Root Component
├── package.json        # Dependencies
└── vite.config.js      # Vite Configuration
```

## ⚙️ Installation & Running Locally
1. Install Node.js.
2. Run `npm install` to download dependencies.
3. Run `npm run dev` to start the local development server.

## 🏗️ Build Instructions
To compile the application for production deployment:
```bash
npm run build
```
This generates optimized, minified static files in the `dist/` directory.

## 🎨 UI Highlights
- **Glassmorphism:** Semi-transparent panels with background blur effects.
- **Dynamic Avatars:** Auto-generated profile avatars based on employee initials, mapped to a dynamic color palette.
- **Accessibility:** Fully labeled form inputs and accessible modal portals.

## 🔮 Future Enhancements
- Implement a Dark Mode toggle.
- Add client-side form validation libraries (e.g., Formik or React Hook Form).
- Implement skeleton loaders for better perceived performance during data fetching.
