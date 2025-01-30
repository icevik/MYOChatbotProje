import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import RouteGuard from './components/RouteGuard';
import Layout from './components/Layout/Layout';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import ProfilePage from './pages/ProfilePage';
import CoursePage from './pages/CoursePage';
import CategoryPage from './pages/CategoryPage';

const App: React.FC = () => {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    {/* Public route */}
                    <Route
                        path="/login"
                        element={
                            <RouteGuard>
                                <LoginPage />
                            </RouteGuard>
                        }
                    />

                    {/* Protected routes */}
                    <Route
                        path="/"
                        element={
                            <RouteGuard requireAuth>
                                <Layout />
                            </RouteGuard>
                        }
                    >
                        {/* Admin routes */}
                        <Route
                            path="admin"
                            element={
                                <RouteGuard requireAuth requireAdmin>
                                    <AdminPage />
                                </RouteGuard>
                            }
                        />

                        {/* User routes */}
                        <Route path="profile" element={<ProfilePage />} />
                        <Route path="category/:categoryId" element={<CategoryPage />} />
                        <Route path="course/:courseId" element={<CoursePage />} />
                    </Route>
                </Routes>
            </AuthProvider>
        </Router>
    );
};

export default App;
