import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { authAPI } from '../services/api';
import { auth, googleProvider } from '../config/firebase';
import { signInWithPopup, signOut, onAuthStateChanged, FirebaseError } from 'firebase/auth';

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
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                try {
                    const idToken = await firebaseUser.getIdToken();
                    const response = await authAPI.googleLogin(idToken);
                    setUser(response.data.user);
                    localStorage.setItem('user', JSON.stringify(response.data.user));
                } catch (err: any) {
                    console.error('Kullanıcı bilgileri alınamadı:', err);
                    const errorMessage = err.response?.data?.error || 'Bir hata oluştu';
                    setError(errorMessage);
                    await signOut(auth);
                    setUser(null);
                    localStorage.removeItem('user');
                }
            } else {
                setUser(null);
                localStorage.removeItem('user');
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const loginWithGoogle = async () => {
        try {
            setLoading(true);
            setError(null);
            const result = await signInWithPopup(auth, googleProvider);
            const idToken = await result.user.getIdToken();
            const response = await authAPI.googleLogin(idToken);
            setUser(response.data.user);
            localStorage.setItem('user', JSON.stringify(response.data.user));
        } catch (err: any) {
            console.error('Login error:', err);
            let errorMessage = 'Giriş yapılırken bir hata oluştu';
            
            // Firebase Auth hata mesajlarını kontrol et
            if (err instanceof FirebaseError) {
                switch (err.code) {
                    case 'auth/popup-closed-by-user':
                        errorMessage = 'Giriş penceresi kapatıldı';
                        break;
                    case 'auth/cancelled-popup-request':
                        errorMessage = 'Giriş işlemi iptal edildi';
                        break;
                    case 'auth/popup-blocked':
                        errorMessage = 'Popup penceresi engellendi. Lütfen popup engelleyiciyi kapatın';
                        break;
                    case 'auth/unauthorized-domain':
                        errorMessage = 'Bu domain için yetkilendirme yapılmamış';
                        break;
                    default:
                        errorMessage = err.message || 'Giriş yapılırken bir hata oluştu';
                }
            } else if (err.response?.data?.error) {
                errorMessage = err.response.data.error;
            }

            setError(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            setError(null);
            await signOut(auth);
            setUser(null);
            localStorage.removeItem('user');
        } catch (err: any) {
            console.error('Çıkış yapılırken hata:', err);
            setError('Çıkış yapılırken bir hata oluştu');
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, error, loginWithGoogle, logout }}>
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