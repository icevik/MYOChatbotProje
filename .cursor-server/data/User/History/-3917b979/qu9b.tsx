import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LoginPage } from './pages/LoginPage';
import { HomePage } from './pages/HomePage';
import { CategoryPage } from './pages/CategoryPage';
import { CoursePage } from './pages/CoursePage';
import './App.css';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Yükleniyor...</div>;
    }

    if (!user) {
        return <Navigate to="/login" />;
    }

    return <>{children}</>;
};

function App() {
    return (
        <Router>
            <AuthProvider>
                        <Routes>
                            <Route path="/login" element={<LoginPage />} />
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute>
                                <HomePage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/category/:categoryName"
                        element={
                            <ProtectedRoute>
                                <CategoryPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/course/:courseId"
                        element={
                            <ProtectedRoute>
                                    <CoursePage />
                            </ProtectedRoute>
                        }
                    />
                        </Routes>
            </AuthProvider>
        </Router>
    );
}

export default App;
