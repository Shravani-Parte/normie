import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import { ROLES } from '@/utils/constants';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  // 1. Check if the user is authenticated
  if (!isAuthenticated) {
    // Redirect them to the /auth/login page, but save the current location they were
    // trying to go to. This allows us to send them back after they log in.
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  // 2. Check if the user has the required role for this specific route
  const userHasRequiredRole = user && allowedRoles ? allowedRoles.includes(user.role) : true;

  if (!userHasRequiredRole) {
    // If the user is logged in but tries to access a page they don't have permission for,
    // send them to a safe default page instead of an error page.
    // For simplicity, we can send them to the main landing page.
    return <Navigate to="/" replace />;
  }

  // 3. If everything is fine, render the requested page
  return children;
};

export default ProtectedRoute;