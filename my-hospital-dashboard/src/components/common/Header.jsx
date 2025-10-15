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
    <header className="app-header">
      <div className="app-header__brand">
        <button
          onClick={toggleSidebar}
          className="app-header__menu"
          aria-label="Toggle sidebar"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <Link to={getDashboardLink(userRole)} className="app-header__title">
          AI Readiness Command
        </Link>
      </div>

      <nav className="app-header__nav">
        {userRole === ROLES.ADMIN && (
          <Link to="/app/admin">Admin Dashboard</Link>
        )}
        {userRole === ROLES.DOCTOR && (
          <Link to="/app/doctor">My Dashboard</Link>
        )}
        {userRole === ROLES.INVENTORY && (
          <Link to="/app/inventory">Inventory</Link>
        )}
        {userRole === ROLES.ERT && (
          <Link to="/ert-console">ERT Console</Link>
        )}
        <Link to="/advisory">Public Advisory</Link>
        <button onClick={handleLogout} className="app-header__logout">
          Logout
        </button>
      </nav>
    </header>
  );
};

export default Header;
