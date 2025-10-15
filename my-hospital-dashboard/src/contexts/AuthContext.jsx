import React, { createContext, useState } from 'react';

export const AuthContext = createContext(null);

// This function synchronously gets the initial user state from localStorage.
// This is the key to preventing the "race condition".
const getInitialUser = () => {
    try {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    } catch (error) {
        console.error("Failed to parse user from localStorage", error);
        return null;
    }
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(getInitialUser);
    const isAuthenticated = !!user;

    const login = async (credentials) => {
        const email = credentials.email.toLowerCase();
        let mockUser = { email, name: email.split('@')[0].replace(/\./g, ' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase()) };

        if (email.startsWith('admin')) mockUser.role = 'ADMIN';
        else if (email.startsWith('doctor')) mockUser.role = 'DOCTOR';
        else if (email.startsWith('inventory')) mockUser.role = 'INVENTORY';
        else if (email.startsWith('ert')) mockUser.role = 'ERT';
        else {
            throw new Error("Invalid user. Email must start with a valid role.");
        }

        localStorage.setItem('user', JSON.stringify(mockUser));
        setUser(mockUser);
        return mockUser;
    };

    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
    };

    const value = { user, isAuthenticated, login, logout };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};