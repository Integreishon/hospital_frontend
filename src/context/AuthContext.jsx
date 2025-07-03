import React, { createContext, useState, useEffect, useContext } from 'react';
import { authService } from '../services/authService';
import api from '../services/api';

export const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          // Intentar cargar usuario desde localStorage primero
          const storedUser = localStorage.getItem('user');
          if (storedUser) {
            setUser(JSON.parse(storedUser));
          }
          
          // Validar token con el backend
          try {
            // The backend has a /auth/validate endpoint
            const response = await api.get('/auth/validate');
            if (response.data && response.data.valid) {
              setUser(response.data.user);
            } else {
              authService.logout();
              setUser(null);
            }
          } catch (err) {
            console.error("Error validando token:", err);
            // Si falla la validación pero tenemos usuario en localStorage,
            // mantenemos la sesión para mejorar UX (se validará en próximas peticiones)
            if (!storedUser) {
              authService.logout();
              setUser(null);
            }
          }
        } catch (err) {
          console.error("Error general en validación:", err);
          authService.logout();
          setUser(null);
        }
      }
      setIsLoading(false);
    };

    validateToken();
  }, []);

  const login = async (dni, password) => {
    setIsLoading(true);
    setError(null);
    try {
      // The authService.login function now returns an object with { token, user }
      const { user: loggedInUser } = await authService.login(dni, password);
      setUser(loggedInUser); // The user object is already shaped correctly
      return true;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Error en el inicio de sesión.';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authService.register(userData);
      setUser({
        id: response.userId,
        email: response.email,
        role: response.role,
      });
      return true;
    } catch (err) {
      setError(err.message || 'Failed to register');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      // Primero limpiamos el estado
      setUser(null);
      
      // Luego llamamos al servicio de autenticación para limpiar localStorage, etc.
      await authService.logout();
      
      // Forzamos una limpieza adicional
      authService.clearAllAuthData();
      
      // Opcionalmente, podemos forzar una recarga de la página para limpiar cualquier estado
      // Esto garantiza que todo el estado de la aplicación se reinicie
      window.location.href = '/login';
      
      return true;
    } catch (error) {
      console.error("Error durante el logout:", error);
      // Intentar limpieza de emergencia
      authService.clearAllAuthData();
      window.location.href = '/login';
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    error,
    login,
    logout,
    register,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 