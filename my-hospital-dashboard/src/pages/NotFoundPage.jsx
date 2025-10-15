import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-grey-50 text-center px-4">
            <h1 className="text-6xl font-extrabold text-primary-500">404</h1>
            <h2 className="text-3xl font-bold text-grey-900 mt-4">Page Not Found</h2>
            <p className="text-grey-600 mt-2 mb-8">
                Sorry, the page you are looking for does not exist or has been moved.
            </p>
            <Link
                to="/auth/login"
                className="bg-primary-500 hover:bg-primary-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
                Go to Login Page
            </Link>
        </div>
    );
};

export default NotFoundPage;
