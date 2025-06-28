import React, { createContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';
import api from '../services/api';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const validateToken = async () => {
    const token = localStorage.getItem('token');
    if (token) {
        try {
          // The backend has a /auth/validate endpoint
          const response = await api.get('/auth/validate');
          if (response.data.valid) {
            setUser(response.data.user);
          } else {
            authService.logout();
          }
        } catch (err) {
          authService.logout();
        }
      }
      setIsLoading(false);
    };

    validateToken();
  }, []);

  const login = async (username, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const userData = await authService.login(username, password);
      setUser({
        id: userData.userId,
        email: userData.email,
        role: userData.role,
      });
      return true;
    } catch (err) {
      setError(err.message || 'Failed to login');
      throw err; // Re-throw to allow component to handle the error
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

  const logout = () => {
    authService.logout();
    setUser(null);
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