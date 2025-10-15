import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ROLES } from '@/utils/constants';

const Sidebar = ({ isOpen, toggleSidebar, userRole }) => {
    const location = useLocation();

    const navItems = [
        { path: '/admin', name: 'Admin Dashboard', roles: [ROLES.ADMIN] },
        { path: '/doctor', name: 'Doctor Dashboard', roles: [ROLES.DOCTOR] },
        { path: '/inventory', name: 'Inventory Management', roles: [ROLES.INVENTORY] },
        { path: '/ert', name: 'ERT Console', roles: [ROLES.ERT] }, // ERT might be full-screen, but keep link for consistency
        { path: '/advisory', name: 'Public Advisory', roles: [ROLES.ADMIN, ROLES.DOCTOR, ROLES.INVENTORY, ROLES.ERT, 'PUBLIC'] },
    ];

    return (
        <>
            {/* Backdrop for mobile */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-grey-900 bg-opacity-50 z-20 lg:hidden" 
                    onClick={toggleSidebar}
                ></div>
            )}

            <aside 
                className={`fixed inset-y-0 left-0 bg-white w-64 p-5 shadow-lg border-r border-grey-200 z-30 transform 
                           ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
                           lg:translate-x-0 transition-transform duration-300 ease-in-out lg:relative lg:block`}
            >
                <h2 className="text-2xl font-bold text-grey-900 mb-6 flex items-center justify-between">
                    AI Readiness
                    <button onClick={toggleSidebar} className="lg:hidden text-grey-600 hover:text-primary-500 focus:outline-none">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </h2>
                <nav className="space-y-2">
                    {navItems.map((item) => {
                        // Only show navigation items relevant to the user's role
                        if (!item.roles.includes(userRole) && userRole !== 'PUBLIC') return null; // 'PUBLIC' role for advisory page to be visible to all

                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center px-4 py-2 rounded-lg transition-colors duration-200 
                                            ${isActive ? 'bg-primary-100 text-primary-700 font-semibold' : 'text-grey-700 hover:bg-grey-100 hover:text-primary-500'}`}
                                onClick={toggleSidebar} // Close sidebar on mobile after clicking
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