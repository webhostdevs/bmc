import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [showAuthForm, setShowAuthForm] = useState(false);

    useEffect(() => {
        // Attempt to get user info on initial load
        axios.get('/userinfo.php').then(response => {
            if (response.data.authenticated) {
                setIsAuthenticated(true);
                setUser(response.data.user);
            }
        }).catch(error => {
            console.error("Error fetching user info:", error);
        });
    }, []);

    const loginWithRedirect = async (email, password) => {
        try {
            const response = await axios.post('/login.php', { email, password });
            if (response.data.authenticated) {
                setIsAuthenticated(true);
                setUser(response.data.user);
            }
            setShowAuthForm(false);
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    const logout = async () => {
        try {
            await axios.get('/logout.php');
            setIsAuthenticated(false);
            setUser(null);
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    const toggleAuthForm = () => {
        setShowAuthForm(!showAuthForm);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, loginWithRedirect, logout, showAuthForm, toggleAuthForm }}>
            {children}
        </AuthContext.Provider>
    );
};
