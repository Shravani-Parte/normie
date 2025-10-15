import { useState, useMemo } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@/components/common/Header';
import Sidebar from '@/components/common/Sidebar';
import Footer from '@/components/common/Footer';
import useAuth from '@/hooks/useAuth';
import { ROLES } from '@/utils/constants';

const AppLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useAuth();

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const availableRoles = useMemo(() => {
    if (!user?.role) {
      return [];
    }
    return [user.role];
  }, [user?.role]);

  return (
    <div className="flex min-h-screen bg-grey-50">
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        userRole={availableRoles[0]}
      />
      <div className="flex flex-1 flex-col">
        <Header toggleSidebar={toggleSidebar} userRole={availableRoles[0]} />
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default AppLayout;
