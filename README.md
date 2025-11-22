# Juspay UI Assignment - Dashboard

A modern, responsive dashboard application built with React and TypeScript, featuring dark/light theme support, interactive charts, and comprehensive e-commerce analytics.

![Dashboard Screenshot](./src/assets/Website%20Screenshot.png)

## 🌐 Live Demo

**Website URL:** [https://juspay-ui-assignment.onrender.com/](https://juspay-ui-assignment.onrender.com/)

## 🚀 Tech Stack

### Core Framework
- **React:** `18.3.1`
- **React DOM:** `18.3.1`
- **TypeScript:** `~5.6.2`
- **Vite:** `^7.2.4`

### Styling
- **Tailwind CSS:** `^4.1.17`
- **@tailwindcss/vite:** `^4.1.17`
- **PostCSS:** `^8.5.6`
- **Autoprefixer:** `^10.4.22`

### Chart Libraries
- **Chart.js:** `^4.5.1`
- **react-chartjs-2:** `^5.3.1`
- **Recharts:** `^3.4.1`

### Maps
- **react-simple-maps:** `^3.0.0`

### Routing
- **react-router-dom:** `^7.9.6`

### Development Tools
- **ESLint:** `^9.39.1`
- **TypeScript ESLint:** `^8.46.4`
- **@vitejs/plugin-react:** `^5.1.1`

## ✨ Features

- 🎨 **Dark/Light Theme Toggle** - Seamless theme switching with persistent state
- 📊 **Interactive Charts** - Multiple chart types (Line, Bar, Doughnut, Maps)
- 📱 **Responsive Design** - Mobile-first approach with adaptive layouts
- 🎯 **E-commerce Metrics** - Revenue tracking, sales analytics, and projections
- 📋 **Order Management** - Comprehensive order list with search and pagination
- 🗺️ **Revenue Maps** - Geographic revenue visualization
- 🎭 **Smooth Animations** - Fade-in and slide animations for better UX

## 🛠️ Installation & Setup

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn package manager

### Steps to Run

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd juspay-ui-assignment
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   - The application will be available at `http://localhost:5173` (or the port shown in terminal)

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Lint Code

```bash
npm run lint
```

## 📁 Project Structure

```
src/
├── assets/          # Images, icons, and SVG files
├── components/       # React components
│   ├── Charts/      # Chart components
│   ├── Navigation/  # Navigation components
│   └── ...
├── hooks/           # Custom React hooks
│   └── useTheme.ts  # Theme management hook
├── pages/           # Page components
├── utils/           # Utility functions and data
└── App.tsx          # Main application component
```

## 🎨 Tailwind CSS Usage

This project uses **Tailwind CSS v4** with the Vite plugin for optimal performance. Tailwind is configured for:

- Utility-first styling
- Responsive design breakpoints
- Dark mode support (via theme context)
- Custom color palette
- Animation utilities

## 🔧 Key Components

- **EcommerceMetrics** - Metric cards with trend indicators
- **ProjectionBarChart** - Stacked bar chart for projections vs actuals
- **RevenueLineChart** - Multi-line chart for revenue trends
- **RevenueMap** - World map with revenue markers
- **SalesDoughnut** - Curved doughnut chart for sales breakdown
- **TopSellingProducts** - Product sales table
- **OrderList** - Comprehensive order management table
- **LeftNavigation** - Collapsible sidebar navigation
- **RightNavigation** - Notifications and contacts panel
- **Navbar** - Top navigation bar with search and theme toggle

## 🌓 Theme System

The application features a comprehensive theme system:

- **Theme Context** - Centralized theme state management
- **Theme Provider** - React Context provider for theme
- **Dynamic Colors** - Theme-aware color utilities
- **Automatic Icon Theming** - SVG icons adapt to theme

## 📝 License

This project is part of a UI assignment for Juspay.

## 👨‍💻 Author

Built as part of the Juspay UI assignment.

---

For more information, visit the [live demo](https://juspay-ui-assignment.onrender.com/).
