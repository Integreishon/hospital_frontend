import React, { createContext, useState, useEffect, useContext } from 'react';
import { authService } from '../services/authService';
import api from '../services/api';
import userService from '../services/userService';

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
  
  // Función para cargar datos completos del paciente
  const loadFullUserData = async (basicUser) => {
    if (basicUser && basicUser.role === 'PATIENT') {
      try {
        const fullProfile = await userService.getCurrentUserProfile();
        return fullProfile;
      } catch (err) {
        console.error("⚠️ No se pudo cargar el perfil completo del paciente, se usarán los datos básicos.", err);
        // Devolver el usuario básico con campos normalizados para evitar errores
        return {
          ...basicUser,
          fullName: `${basicUser.nombre || ''} ${basicUser.apellidoPaterno || ''}`.trim() || basicUser.email
        };
      }
    }
    return basicUser;
  };
  
  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const storedUser = JSON.parse(localStorage.getItem('user'));
          if (storedUser) {
            // Cargar con datos de localStorage para una carga inicial rápida
             setUser(storedUser);
          }
          
          // Validar y refrescar datos desde el backend
          const response = await api.get('/auth/validate');
          if (response.data && response.data.valid) {
            const userFromServer = response.data.user;
            const fullUser = await loadFullUserData(userFromServer);
            setUser(fullUser);
            localStorage.setItem('user', JSON.stringify(fullUser)); // Actualizar localStorage
          } else {
            // Token inválido
            authService.logout();
            setUser(null);
          }
        } catch (err) {
          console.error("Error validando token o cargando datos de usuario:", err);
          // Si la validación falla, podría ser un problema de red o token expirado.
          // Cerramos la sesión por seguridad.
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
      const { user: loggedInUser } = await authService.login(dni, password);
      
      const fullUser = await loadFullUserData(loggedInUser);
      setUser(fullUser);
      // No es necesario guardar en localStorage aquí porque loadFullUserData ya lo hace.
      
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