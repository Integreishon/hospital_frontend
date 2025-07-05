import { useContext } from 'react';
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

  // Si el contexto no está disponible, devolver un valor predeterminado
  // para evitar errores en componentes que intentan renderizar sin el Provider
  if (context === undefined) {
    console.warn('useAuth debe ser usado dentro de un AuthProvider');
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

  return context;
};

export default useAuth; 