import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Layout } from './components/Layout/Layout';
import { LoginPage } from './pages/LoginPage';
import { HomePage } from './pages/HomePage';
import { CategoryPage } from './pages/CategoryPage';
import { CoursePage } from './pages/CoursePage';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2'
        }
    }
});

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return null;
    }

    if (!user) {
        return <Navigate to="/login" />;
    }

    return <Layout>{children}</Layout>;
};

function App() {
    return (
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <AuthProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/login" element={<LoginPage />} />
                            <Route
                                path="/"
                                element={
                                    <PrivateRoute>
                                        <HomePage />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/category/:category"
                                element={
                                    <PrivateRoute>
                                        <CategoryPage />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/course/:courseId"
                                element={
                                    <PrivateRoute>
                                        <CoursePage />
                                    </PrivateRoute>
                                }
                            />
                        </Routes>
                    </BrowserRouter>
                </AuthProvider>
            </ThemeProvider>
        </GoogleOAuthProvider>
    );
}

export default App;
