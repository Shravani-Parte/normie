import React from 'react';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
    // This is a placeholder as registration logic is not part of the core requirements yet.
    return (
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6 text-center">
             <h1 className="text-3xl font-bold text-grey-900">Registration</h1>
             <p className="text-grey-600">
                The registration portal is currently not available. 
                New user accounts are created by the hospital administration.
             </p>
             <Link 
                to="/login"
                className="inline-block bg-primary-500 hover:bg-primary-600 text-white font-bold py-2 px-4 rounded-lg"
            >
                Return to Login
            </Link>
        </div>
    );
};

export default RegisterPage;