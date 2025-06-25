import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Check for saved token in localStorage
    const token = localStorage.getItem('token');
    if (token) {
      // In a real app, you would validate the token with your API
      // For now, we'll just set a mock user
      setUser({
        id: '123',
        name: 'John Doe',
        email: 'john.doe@example.com',
        role: 'patient',
      });
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // In a real app, this would be an API call
    // For now, just simulate a successful login
    const mockUser = {
      id: '123',
      name: 'John Doe',
      email,
      role: 'patient',
    };
    
    const mockToken = 'mock-jwt-token';
    localStorage.setItem('token', mockToken);
    setUser(mockUser);
    return mockUser;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const register = async (userData) => {
    // In a real app, this would be an API call
    // For now, just simulate a successful registration
    const mockUser = {
      id: '123',
      name: `${userData.firstName} ${userData.lastName}`,
      email: userData.email,
      role: 'patient',
    };
    
    const mockToken = 'mock-jwt-token';
    localStorage.setItem('token', mockToken);
    setUser(mockUser);
    return mockUser;
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
} 