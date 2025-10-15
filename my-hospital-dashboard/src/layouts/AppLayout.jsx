import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@/components/common/Header';
import Sidebar from '@/components/common/Sidebar';
import Footer from '@/components/common/Footer';
import useAuth from '@/hooks/useAuth';

const AppLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useAuth();
  const userRole = user?.role ?? null;

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <div className="app-shell">
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        userRole={userRole}
      />
      <div className="app-shell__main">
        <Header toggleSidebar={toggleSidebar} userRole={userRole} />
        <main className="app-shell__content">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default AppLayout;
