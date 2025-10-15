import React from 'react';
import { Outlet } from 'react-router-dom';

const PublicLayout = () => {
  return (
    <main className="bg-gray-50 min-h-screen font-sans">
      <div className="container mx-auto p-4 md:p-8 max-w-4xl">
         <Outlet />
      </div>
    </main>
  );
};

export default PublicLayout;