import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { LoginPage } from './pages/LoginPage';
import { HomePage } from './pages/HomePage';
import { CategoryPage } from './pages/CategoryPage';
import { CoursePage } from './pages/CoursePage';
import './App.css';

function App() {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/" element={<HomePage />} />
                    <Route path="/category/:categoryName" element={<CategoryPage />} />
                    <Route path="/course/:courseId" element={<CoursePage />} />
                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default App;
