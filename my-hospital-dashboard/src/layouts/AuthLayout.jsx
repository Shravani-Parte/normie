import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100 font-sans">
      <Outlet />
    </main>
  );
};

export default AuthLayout;