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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authInitialized, setAuthInitialized] = useState(false);
  
  // Función para cargar datos completos del paciente
  const loadFullUserData = async (basicUser) => {
    if (!basicUser) {
      return null;
    }
    
    if (basicUser && basicUser.role === 'PATIENT') {
      try {
        const fullProfile = await userService.getCurrentUserProfile();
        return fullProfile;
      } catch (err) {
        // Usar console.debug para mensajes informativos, no alarmantes
        console.debug("⚠️ No se pudo cargar el perfil completo del paciente, se usarán los datos básicos.");
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
    let isMounted = true;
    
    const validateToken = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        if (isMounted) {
          setUser(null);
          setIsAuthenticated(false);
          setIsLoading(false);
          setAuthInitialized(true);
        }
        return;
      }
      
      try {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser && isMounted) {
          setUser(storedUser);
          setIsAuthenticated(true);
        }
        
        // El interceptor de API ya maneja la validación y el refresco.
        // Aquí solo necesitamos verificar si la sesión sigue activa.
        const response = await api.get('/auth/validate');
        
        if (isMounted) {
          // La respuesta de validación puede ser tan simple como un 200 OK.
          // La clave es que si la llamada falla (interceptada por 401), el logout se activará.
          // Si tiene éxito, refrescamos los datos del usuario.
          if (response && response.data && response.data.user) {
            const userFromServer = response.data.user;
            const fullUser = await loadFullUserData(userFromServer);
            setUser(fullUser);
            setIsAuthenticated(true);
            localStorage.setItem('user', JSON.stringify(fullUser));
          }
          setIsLoading(false);
          setAuthInitialized(true);
        }
      } catch (err) {
        // El interceptor de API debería manejar los 401 y redirigir.
        // Este catch es para otros errores de red o del servidor.
        console.error("Error al validar la sesión:", err.message);
        if (isMounted) {
          // No necesariamente cerramos sesión, podría ser un error de red temporal.
          // Mantenemos al usuario logueado con los datos de localStorage.
          // La próxima acción que requiera API re-validará.
          setIsLoading(false);
          setAuthInitialized(true);
        }
      }
    };

    validateToken();
    
    return () => {
      isMounted = false;
    };
  }, []);

  const login = async (dni, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const { user: loggedInUser } = await authService.login(dni, password);
      
      const fullUser = await loadFullUserData(loggedInUser);
      setUser(fullUser);
      setIsAuthenticated(true);
      
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
      setIsAuthenticated(true);
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
      setIsAuthenticated(false);
      
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
      setUser(null);
      setIsAuthenticated(false);
      window.location.href = '/login';
    }
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    error,
    authInitialized,
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