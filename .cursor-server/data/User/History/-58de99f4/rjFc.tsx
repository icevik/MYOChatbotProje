import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { User } from '../types';
import { authAPI } from '../services/api';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    error: string | null;
    loginWithGoogle: () => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);
    const { loginWithRedirect, logout: auth0Logout, getAccessTokenSilently, isAuthenticated, isLoading, user: auth0User } = useAuth0();

    useEffect(() => {
        const initializeAuth = async () => {
            if (isAuthenticated && auth0User?.email) {
                try {
                    const token = await getAccessTokenSilently();
                    const response = await authAPI.auth0Login(token);
                    setUser(response.data.user);
                    localStorage.setItem('user', JSON.stringify(response.data.user));
                } catch (err: any) {
                    console.error('Kullanıcı bilgileri alınamadı:', err);
                    const errorMessage = err.response?.data?.error || 'Bir hata oluştu';
                    setError(errorMessage);
                    await auth0Logout({ logoutParams: { returnTo: window.location.origin } });
                    setUser(null);
                    localStorage.removeItem('user');
                }
            } else if (!isAuthenticated) {
                setUser(null);
                localStorage.removeItem('user');
            }
        };

        initializeAuth();
    }, [isAuthenticated, auth0User, getAccessTokenSilently, auth0Logout]);

    const loginWithGoogle = async () => {
        try {
            setError(null);
            await loginWithRedirect({
                authorizationParams: {
                    connection: 'google-oauth2'
                }
            });
        } catch (err: any) {
            console.error('Login error:', err);
            setError('Giriş yapılırken bir hata oluştu');
            throw err;
        }
    };

    const logout = async () => {
        try {
            setError(null);
            await auth0Logout({ logoutParams: { returnTo: window.location.origin } });
            setUser(null);
            localStorage.removeItem('user');
        } catch (err: any) {
            console.error('Çıkış yapılırken hata:', err);
            setError('Çıkış yapılırken bir hata oluştu');
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading: isLoading, error, loginWithGoogle, logout }}>
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