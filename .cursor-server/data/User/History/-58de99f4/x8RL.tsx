import React, { createContext, useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { User } from '../types';

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void;
    getAccessToken: () => Promise<string>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const {
        user: auth0User,
        isLoading,
        isAuthenticated,
        loginWithRedirect,
        logout: auth0Logout,
        getAccessTokenSilently
    } = useAuth0();

    const login = () => {
        loginWithRedirect();
    };

    const logout = () => {
        auth0Logout({ returnTo: window.location.origin });
    };

    const getAccessToken = () => {
        return getAccessTokenSilently();
    };

    const user: User | null = auth0User ? {
        id: auth0User.sub as string,
        email: auth0User.email as string,
        name: auth0User.name as string,
        role: 'user'
    } : null;

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoading,
                isAuthenticated,
                login,
                logout,
                getAccessToken
            }}
        >
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