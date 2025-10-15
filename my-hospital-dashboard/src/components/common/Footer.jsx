import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-white text-center py-4 text-sm text-grey-600 border-t border-grey-200 mt-8">
            <p>&copy; {new Date().getFullYear()} Hospital Readiness System. All rights reserved.</p>
        </footer>
    );
};

export default Footer;