import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { authAPI } from '../services/api';
import { useAuth0 } from '@auth0/auth0-react';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    error: string | null;
    login: () => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);
    const { loginWithRedirect, logout: auth0Logout, getAccessTokenSilently, user: auth0User, isLoading } = useAuth0();

    useEffect(() => {
        const initAuth = async () => {
            if (auth0User?.email) {
                try {
                    const token = await getAccessTokenSilently();
                    const response = await authAPI.auth0Login(token);
                    setUser(response.data.user);
                    localStorage.setItem('user', JSON.stringify(response.data.user));
                } catch (err: any) {
                    console.error('Kullanıcı bilgileri alınamadı:', err);
                    const errorMessage = err.response?.data?.error || 'Bir hata oluştu';
                    setError(errorMessage);
                    auth0Logout({ returnTo: window.location.origin });
                    setUser(null);
                    localStorage.removeItem('user');
                }
            } else {
                setUser(null);
                localStorage.removeItem('user');
            }
        };

        if (!isLoading && auth0User) {
            initAuth();
        }
    }, [auth0User, isLoading, getAccessTokenSilently, auth0Logout]);

    const login = () => {
        setError(null);
        loginWithRedirect({
            connection: 'google-oauth2',
            prompt: 'select_account'
        });
    };

    const logout = () => {
        setError(null);
        auth0Logout({ returnTo: window.location.origin });
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, loading: isLoading, error, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}; 