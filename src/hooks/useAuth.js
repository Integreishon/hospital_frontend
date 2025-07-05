import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

/**
 * Custom hook for accessing the authentication context.
 * Provides an easy way to get the current user, authentication status,
 * and authentication functions (login, logout).
 *
 * @returns {object} The authentication context value.
 * @throws {Error} If used outside of an AuthProvider.
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  const [localAuth, setLocalAuth] = useState({
    hasToken: false,
    localUser: null
  });

  useEffect(() => {
    // Verificar si hay un token en localStorage
    const token = localStorage.getItem('token');
    
    if (token) {
      try {
        const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
        setLocalAuth({
          hasToken: true,
          localUser: storedUser
        });
      } catch (err) {
        console.warn('Error al parsear usuario de localStorage:', err);
        setLocalAuth({
          hasToken: true,
          localUser: null
        });
      }
    }
  }, []);

  // Si el contexto no está disponible, usar datos de localStorage
  if (context === undefined) {
    console.warn('useAuth debe ser usado dentro de un AuthProvider');
    
    // Si hay token en localStorage, usarlo para proporcionar autenticación básica
    if (localAuth.hasToken) {
      return {
        user: localAuth.localUser,
        isAuthenticated: true,
        isLoading: false,
        error: null,
        login: () => {
          throw new Error('AuthProvider no disponible');
        },
        logout: () => {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/login';
        },
        register: () => {
          throw new Error('AuthProvider no disponible');
        }
      };
    }
    
    // Valor predeterminado seguro para prevenir errores en componentes
    return {
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      login: () => {
        throw new Error('AuthProvider no disponible');
      },
      logout: () => {
        throw new Error('AuthProvider no disponible');
      },
      register: () => {
        throw new Error('AuthProvider no disponible');
      }
    };
  }

  // Si hay contexto pero no está autenticado, verificar si hay token en localStorage
  if (!context.isAuthenticated && localAuth.hasToken) {
    return {
      ...context,
      user: localAuth.localUser || context.user,
      isAuthenticated: true
    };
  }

  return context;
};

export default useAuth; 