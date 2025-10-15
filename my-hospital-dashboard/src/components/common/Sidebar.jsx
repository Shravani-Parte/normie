import { Link, useLocation } from 'react-router-dom';
import { ROLES } from '@/utils/constants';

const Sidebar = ({ isOpen, toggleSidebar, userRole }) => {
  const location = useLocation();

  const navItems = [
    { path: '/app/admin', name: 'Admin Dashboard', roles: [ROLES.ADMIN] },
    { path: '/app/doctor', name: 'Doctor Dashboard', roles: [ROLES.DOCTOR] },
    { path: '/app/inventory', name: 'Inventory Management', roles: [ROLES.INVENTORY] },
    { path: '/ert-console', name: 'ERT Command Center', roles: [ROLES.ERT] },
    { path: '/advisory', name: 'Public Advisory', roles: [ROLES.ADMIN, ROLES.DOCTOR, ROLES.INVENTORY, ROLES.ERT] },
  ];

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={toggleSidebar} />}

      <aside className={`sidebar ${isOpen ? 'sidebar--open' : ''}`}>
        <div className="sidebar__header">
          <h2>AI Readiness</h2>
          <button onClick={toggleSidebar} className="sidebar__close" aria-label="Close sidebar">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="sidebar__nav">
          {navItems.map((item) => {
            if (!item.roles.includes(userRole)) {
              return null;
            }

            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={toggleSidebar}
                className={`sidebar__link ${isActive ? 'sidebar__link--active' : ''}`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
