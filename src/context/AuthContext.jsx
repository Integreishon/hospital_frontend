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
    // Función para inicializar la autenticación desde localStorage
    const initializeAuth = () => {
      const token = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      
      if (!token || !storedUser) {
        setUser(null);
        setIsAuthenticated(false);
        setIsLoading(false);
        setAuthInitialized(true);
        return;
      }
      
      try {
        // Siempre cargar el usuario desde localStorage primero
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
        setIsLoading(false);
        setAuthInitialized(true);
        
        // Intentar actualizar los datos del usuario en segundo plano
        // pero sin afectar la sesión actual si falla
        updateUserData(parsedUser).catch(err => {
          console.warn("Error al actualizar datos de usuario:", err);
          // No hacemos nada si falla, mantenemos los datos de localStorage
        });
      } catch (err) {
        console.error("Error al procesar datos de usuario:", err);
        // Incluso si hay error al procesar JSON, mantenemos la sesión
        setIsLoading(false);
        setAuthInitialized(true);
      }
    };
    
    // Función para actualizar datos del usuario en segundo plano
    const updateUserData = async (currentUser) => {
      try {
        // Intentar obtener datos actualizados del backend
        const response = await api.get('/auth/validate');
        
        if (response && response.data && response.data.user) {
          const userFromServer = response.data.user;
          const fullUser = await loadFullUserData(userFromServer);
          
          // Actualizar estado y localStorage solo si hay datos nuevos
          setUser(fullUser);
          localStorage.setItem('user', JSON.stringify(fullUser));
        }
      } catch (err) {
        // Si hay error, simplemente lo registramos pero no cerramos sesión
        console.warn("Error al validar token:", err.message);
        // Mantenemos la sesión activa con los datos que ya tenemos
      }
    };
    
    // Inicializar autenticación
    initializeAuth();
    
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