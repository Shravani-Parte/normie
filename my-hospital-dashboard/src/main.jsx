import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom'; // <-- IMPORTANT: Import RouterProvider
import { router } from '@/routes/index';             // Import the router configuration we created
import { AuthProvider } from '@/contexts/AuthContext';
import './styles/index.css';

// This is the root of your application
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      {/* This RouterProvider component is the key. 
          It takes our router configuration and makes it available to the entire app.
          This is what makes navigation and all <Link> components work. */}
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);