import useAuth from '@/hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';
import { ROLES } from '@/utils/constants';

const Header = ({ toggleSidebar, userRole }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth/login');
  };

  const getDashboardLink = (role) => {
    switch (role) {
      case ROLES.ADMIN:
        return '/app/admin';
      case ROLES.DOCTOR:
        return '/app/doctor';
      case ROLES.INVENTORY:
        return '/app/inventory';
      case ROLES.ERT:
        return '/ert-console';
      default:
        return '/';
    }
  };

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between border-b border-grey-200 bg-white p-4 shadow-sm">
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          className="mr-4 text-grey-600 transition-colors hover:text-primary-500 focus:outline-none lg:hidden"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <Link
          to={getDashboardLink(userRole)}
          className="text-2xl font-bold text-grey-900 transition-colors hover:text-primary-700"
        >
          AI Readiness
        </Link>
      </div>

      <nav className="flex items-center space-x-4">
        {userRole === ROLES.ADMIN && (
          <Link to="/app/admin" className="text-sm font-medium text-grey-600 transition-colors hover:text-primary-500">
            Admin Dashboard
          </Link>
        )}
        {userRole === ROLES.DOCTOR && (
          <Link to="/app/doctor" className="text-sm font-medium text-grey-600 transition-colors hover:text-primary-500">
            My Dashboard
          </Link>
        )}
        {userRole === ROLES.INVENTORY && (
          <Link to="/app/inventory" className="text-sm font-medium text-grey-600 transition-colors hover:text-primary-500">
            Inventory
          </Link>
        )}
        {userRole === ROLES.ERT && (
          <Link to="/ert-console" className="text-sm font-medium text-grey-600 transition-colors hover:text-primary-500">
            ERT Console
          </Link>
        )}
        <Link to="/advisory" className="text-sm font-medium text-grey-600 transition-colors hover:text-primary-500">
          Public Advisory
        </Link>
        <button
          onClick={handleLogout}
          className="rounded-lg bg-primary-500 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-primary-600"
        >
          Logout
        </button>
      </nav>
    </header>
  );
};

export default Header;
