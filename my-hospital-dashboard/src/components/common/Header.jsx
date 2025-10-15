import React from 'react';
import useAuth from '@/hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';
import { ROLES } from '@/utils/constants';

const Header = ({ toggleSidebar, userRole }) => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    // Determine dashboard link based on role
    const getDashboardLink = (role) => {
        switch (role) {
            case ROLES.ADMIN: return '/admin';
            case ROLES.DOCTOR: return '/doctor';
            case ROLES.INVENTORY: return '/inventory';
            case ROLES.ERT: return '/ert'; // ERT has a special, full-screen page, so this link might not be used
            default: return '/';
        }
    };

    return (
        <header className="bg-white shadow-sm p-4 flex justify-between items-center border-b border-grey-200 sticky top-0 z-10">
            <div className="flex items-center">
                <button onClick={toggleSidebar} className="lg:hidden text-grey-600 hover:text-primary-500 mr-4 focus:outline-none">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                </button>
                <Link to={getDashboardLink(userRole)} className="text-2xl font-bold text-grey-900 hover:text-primary-700 transition-colors">
                    AI Readiness
                </Link>
            </div>
            
            <nav className="flex items-center space-x-4">
                {userRole === ROLES.ADMIN && (
                     <Link to="/admin" className="text-grey-600 hover:text-primary-500 text-sm font-medium">Admin Dashboard</Link>
                )}
                {userRole === ROLES.DOCTOR && (
                     <Link to="/doctor" className="text-grey-600 hover:text-primary-500 text-sm font-medium">My Dashboard</Link>
                )}
                {userRole === ROLES.INVENTORY && (
                     <Link to="/inventory" className="text-grey-600 hover:text-primary-500 text-sm font-medium">Inventory</Link>
                )}
                {/* ERT has a full-screen, dedicated page, so typically wouldn't navigate from here */}
                
                <Link to="/advisory" className="text-grey-600 hover:text-primary-500 text-sm font-medium">Public Advisory</Link>
                
                <button 
                    onClick={handleLogout} 
                    className="bg-primary-500 hover:bg-primary-600 text-white font-bold py-2 px-4 rounded-lg text-sm transition-colors"
                >
                    Logout
                </button>
            </nav>
        </header>
    );
};

export default Header;