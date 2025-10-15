import React from 'react';
import { Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from './hooks/useAuth';
import { ROLES } from './utils/constants';

// Import all pages here
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import DoctorDashboardPage from './pages/DoctorDashboardPage';
import NotFoundPage from './pages/NotFoundPage';

// --- Helper Components defined directly inside App.jsx for simplicity ---

// 1. The Layout Component (Header, Sidebar, etc.)
const AppLayout = () => {
    // In a real app, you'd have your Header and Sidebar components here.
    // For now, it just provides the structure.
    return (
        <div className="app-layout">
            {/* <Header /> */}
            {/* <Sidebar /> */}
            <main className="p-8">
                <Outlet /> {/* This is where the dashboard pages will render */}
            </main>
        </div>
    );
};

// 2. The Protected Route Component (The Gatekeeper)
const ProtectedRoute = ({ allowedRoles }) => {
    const { isAuthenticated, user } = useAuth();
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        // If wrong role, redirect to a safe page (like the landing page)
        return <Navigate to="/" replace />;
    }

    return <Outlet />; // Render the nested routes
};


// --- The Main App Component with the Router ---
function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/app" element={<AppLayout />}>
            <Route 
                path="admin" 
                element={
                    <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
                        <AdminDashboardPage />
                    </ProtectedRoute>
                } 
            />
            <Route 
                path="doctor" 
                element={
                    <ProtectedRoute allowedRoles={[ROLES.DOCTOR]}>
                        <DoctorDashboardPage />
                    </ProtectedRoute>
                } 
            />
            {/* Add other protected dashboard routes here */}
        </Route>
      </Route>

      {/* Catch-all Not Found Route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;