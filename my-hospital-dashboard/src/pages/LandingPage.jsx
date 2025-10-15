import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div className="text-center p-8">
            <h1 className="text-4xl font-bold mb-4">Welcome to the AI Hospital Readiness System</h1>
            <p className="mb-8">This is the public-facing landing page.</p>
            <div className="space-x-4">
                <Link to="/login" className="bg-primary-500 hover:bg-primary-600 text-white font-bold py-3 px-6 rounded-lg">
                    Staff Login
                </Link>
                {/* The register link can go to a placeholder page for now */}
                <Link to="/register" className="bg-grey-200 hover:bg-grey-300 text-grey-800 font-bold py-3 px-6 rounded-lg">
                    Register
                </Link>
            </div>
        </div>
    );
};

export default LandingPage;