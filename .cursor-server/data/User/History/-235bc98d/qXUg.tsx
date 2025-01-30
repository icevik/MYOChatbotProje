import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { authAPI } from '../services/api';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    error: string | null;
    login: (token: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // Token varsa kullanıcı bilgilerini al
            // Bu örnekte token'da user bilgisi olduğunu varsayıyoruz
            // Gerçek uygulamada /me gibi bir endpoint'ten alınabilir
            try {
                const userData = JSON.parse(localStorage.getItem('user') || '');
                setUser(userData);
            } catch (err) {
                console.error('User verisi parse edilemedi:', err);
        }
        }
        setLoading(false);
    }, []);

    const login = async (token: string) => {
        try {
            setLoading(true);
            const response = await authAPI.googleLogin(token);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            setUser(response.data.user);
            setError(null);
        } catch (err: any) {
            setError(err.response?.data?.error || 'Giriş yapılırken bir hata oluştu');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, error, login, logout }}>
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