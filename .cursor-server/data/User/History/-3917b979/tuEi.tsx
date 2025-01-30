import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import { AuthProvider } from './contexts/AuthContext';
import LoginPage from './pages/LoginPage';
import CoursePage from './pages/CoursePage';
import CoursesPage from './pages/CoursesPage';
import PrivateRoute from './components/PrivateRoute';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';

const App: React.FC = () => {
    const domain = process.env.REACT_APP_AUTH0_DOMAIN || '';
    const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID || '';
    const audience = process.env.REACT_APP_AUTH0_AUDIENCE || '';

    return (
        <Auth0Provider
            domain={domain}
            clientId={clientId}
            authorizationParams={{
                redirect_uri: window.location.origin,
                audience: audience,
            }}
        >
            <AuthProvider>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Router>
                        <Routes>
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/courses" element={
                                <PrivateRoute>
                                    <CoursesPage />
                                </PrivateRoute>
                            } />
                            <Route path="/courses/:courseId" element={
                                <PrivateRoute>
                                    <CoursePage />
                                </PrivateRoute>
                            } />
                            <Route path="*" element={<LoginPage />} />
                        </Routes>
                    </Router>
                </ThemeProvider>
            </AuthProvider>
        </Auth0Provider>
    );
};

export default App;
