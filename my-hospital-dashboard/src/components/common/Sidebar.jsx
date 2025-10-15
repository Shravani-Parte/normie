import { Link, useLocation } from 'react-router-dom';
import { ROLES } from '@/utils/constants';

const Sidebar = ({ isOpen, toggleSidebar, userRole }) => {
  const location = useLocation();

  const navItems = [
    { path: '/app/admin', name: 'Admin Dashboard', roles: [ROLES.ADMIN] },
    { path: '/app/doctor', name: 'Doctor Dashboard', roles: [ROLES.DOCTOR] },
    { path: '/app/inventory', name: 'Inventory Management', roles: [ROLES.INVENTORY] },
    { path: '/ert-console', name: 'ERT Console', roles: [ROLES.ERT] },
    { path: '/advisory', name: 'Public Advisory', roles: [ROLES.ADMIN, ROLES.DOCTOR, ROLES.INVENTORY, ROLES.ERT] },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-grey-900 bg-opacity-50 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 transform border-r border-grey-200 bg-white p-5 shadow-lg transition-transform duration-300 ease-in-out lg:relative lg:block ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="mb-6 flex items-center justify-between text-2xl font-bold text-grey-900">
          AI Readiness
          <button
            onClick={toggleSidebar}
            className="text-grey-600 transition-colors hover:text-primary-500 focus:outline-none lg:hidden"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="space-y-2">
          {navItems.map((item) => {
            if (!item.roles.includes(userRole)) {
              return null;
            }

            const isActive = location.pathname.startsWith(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-grey-700 hover:bg-grey-100 hover:text-primary-500'
                }`}
                onClick={toggleSidebar}
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
