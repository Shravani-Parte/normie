import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import Header from '@/components/common/Header';
import Sidebar from '@/components/common/Sidebar';
import Footer from '@/components/common/Footer';
import useAuth from '@/hooks/useAuth';
import { ROLES } from '@/utils/constants';

const AppLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useAuth();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Define navigation links based on roles
  const navLinks = [
    { to: '/app/admin', label: 'Admin Dashboard', allowed: [ROLES.ADMIN] },
    { to: '/app/doctor', label: 'My Dashboard', allowed: [ROLES.DOCTOR] },
    { to: '/app/inventory', label: 'Inventory', allowed: [ROLES.INVENTORY] },
    { to: '/ert-console', label: 'ERT Console', allowed: [ROLES.ERT] },
  ];

  const availableLinks = navLinks.filter(link => link.allowed.includes(user?.role));

  return (
    <div className="flex min-h-screen bg-grey-50 font-sans">
      <Sidebar 
        isOpen={isSidebarOpen} 
        toggleSidebar={toggleSidebar} 
        links={availableLinks} // Pass links to the sidebar
      />
      <div className="flex-1 flex flex-col">
        <Header 
          toggleSidebar={toggleSidebar} 
          user={user} 
        />
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
          <Outlet /> 
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default AppLayout;
