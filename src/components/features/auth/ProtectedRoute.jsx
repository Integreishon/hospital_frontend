import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import Spinner from '../../ui/Spinner';

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const [hasLocalToken, setHasLocalToken] = useState(false);
  const [checkingToken, setCheckingToken] = useState(true);

  useEffect(() => {
    // Verificar si hay un token en localStorage
    const token = localStorage.getItem('token');
    setHasLocalToken(!!token);
    setCheckingToken(false);
  }, []);

  // Mostrar spinner mientras se verifica la autenticación o el token local
  if (isLoading || checkingToken) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="large" />
      </div>
    );
  }

  // Si está autenticado según el contexto o hay un token en localStorage, permitir acceso
  return (isAuthenticated || hasLocalToken) ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute; 