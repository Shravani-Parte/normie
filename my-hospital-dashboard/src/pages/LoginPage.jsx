import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import { ROLES } from '@/utils/constants';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('password'); // Default password for ease of testing
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // After login, send them to where they were going, or a default dashboard
    const from = location.state?.from?.pathname || '/app/admin';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const user = await login({ email, password });
            
            // Redirect based on role
            switch (user.role) {
                case ROLES.ADMIN: navigate('/app/admin'); break;
                case ROLES.DOCTOR: navigate('/app/doctor'); break;
                // Add other roles here
                default: navigate(from, { replace: true });
            }
        } catch (err) {
            setError(err.message || 'Login failed.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-grey-50">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
                <header className="text-center">
                    <h1 className="text-3xl font-bold text-grey-900">Staff Portal Login</h1>
                </header>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-grey-800 mb-2" htmlFor="email">Email Address</label>
                        <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="e.g., admin@hospital.com" className="w-full px-4 py-2 text-grey-800 bg-grey-100 border border-grey-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500" required />
                        <p className="text-xs text-grey-600 mt-2">Hint: Use 'admin@' or 'doctor@'.</p>
                    </div>
                    {error && <div className="bg-danger-100 text-danger-500 text-sm font-semibold p-3 rounded-lg text-center">{error}</div>}
                    <div>
                        <button type="submit" className="w-full bg-primary-500 hover:bg-primary-600 text-white font-bold py-3 px-4 rounded-lg">Sign In</button>
                    </div>
                </form>
                 <footer className="text-center pt-4 border-t border-grey-200">
                    <Link to="/" className="font-semibold text-primary-600 hover:underline">&larr; Back to Landing Page</Link>
                </footer>
            </div>
        </div>
    );
};

export default LoginPage;