import { createBrowserRouter } from 'react-router-dom';
import App from '@/App';
import AppLayout from '@/layouts/AppLayout';
import AuthLayout from '@/layouts/AuthLayout';
import ProtectedRoute from './ProtectedRoute';
import { ROLES } from '@/utils/constants';

import LandingPage from '@/pages/LandingPage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import AdminDashboardPage from '@/pages/AdminDashboardPage';
import DoctorDashboardPage from '@/pages/DoctorDashboardPage';
import InventoryPage from '@/pages/InventoryPage';
import ERTPage from '@/pages/ERTPage';
import PublicAdvisoryPage from '@/pages/PublicAdvisoryPage';
import NotFoundPage from '@/pages/NotFoundPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // The App component is the root shell
    errorElement: <NotFoundPage />,
    children: [
      // --- Public Routes ---
      { index: true, element: <LandingPage /> },
      { path: 'advisory', element: <PublicAdvisoryPage /> },
      {
        path: 'auth',
        element: <AuthLayout />,
        children: [
          { path: 'login', element: <LoginPage /> },
          { path: 'register', element: <RegisterPage /> },
        ],
      },
      
      // --- Protected Routes ---
      {
        element: <ProtectedRoute />, // This protects ALL nested routes
        children: [
          {
            path: 'app',
            element: <AppLayout />,
            children: [
              { path: 'admin', element: <ProtectedRoute allowedRoles={[ROLES.ADMIN]}><AdminDashboardPage /></ProtectedRoute> },
              { path: 'doctor', element: <ProtectedRoute allowedRoles={[ROLES.DOCTOR]}><DoctorDashboardPage /></ProtectedRoute> },
              { path: 'inventory', element: <ProtectedRoute allowedRoles={[ROLES.INVENTORY]}><InventoryPage /></ProtectedRoute> },
            ]
          },
          {
            path: 'ert-console',
            element: <ProtectedRoute allowedRoles={[ROLES.ERT]}><ERTPage /></ProtectedRoute>
          }
        ]
      }
    ]
  }
]);