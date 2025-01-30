import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface RouteGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requireAdmin?: boolean;
}

const RouteGuard: React.FC<RouteGuardProps> = ({ 
  children, 
  requireAuth = false,
  requireAdmin = false 
}) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div>Yükleniyor...</div>;
  }

  if (requireAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireAdmin && user?.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  // Kullanıcı giriş yapmışsa ve login sayfasına gitmeye çalışıyorsa
  if (user && location.pathname === '/login') {
    if (user.role === 'admin') {
      return <Navigate to="/admin" replace />;
    } else {
      return <Navigate to="/profile" replace />;
    }
  }

  // Giriş yapmış kullanıcıyı rolüne göre yönlendir
  if (user && location.pathname === '/') {
    if (user.role === 'admin') {
      return <Navigate to="/admin" replace />;
    } else {
      return <Navigate to="/profile" replace />;
    }
  }

  return <>{children}</>;
};

export default RouteGuard; 