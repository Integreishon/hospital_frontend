import api from './api';

/**
 * Función para eliminar todas las cookies
 */
const clearAllCookies = () => {
  // Obtener todas las cookies
  const cookies = document.cookie.split(";");

  // Eliminar cada cookie
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
  }
};

/**
 * Service functions for authentication.
 */
export const authService = {
  /**
   * Logs in a user.
   * @param {string} dni - The user's DNI.
   * @param {string} password - The user's password.
   * @returns {Promise<object>} The server response, typically includes a token and user data.
   */
  async login(dni, password) {
    try {
      const response = await api.post('/auth/login', { dni, password });

      // The backend response is wrapped in our standard ApiResponse format.
      // The actual data (AuthResponse) is in the `data` property.
      if (response && response.data) {
        const { token, id, nombre, apellidoPaterno, role } = response.data;
        
        // Store token and user info in localStorage
        localStorage.setItem('token', token);
        const userToStore = { id, nombre, apellidoPaterno, role };
        localStorage.setItem('user', JSON.stringify(userToStore));
        
        // Return the user data to be used in the AuthContext
        return { token, user: userToStore };
      }
      
      // Handle cases where response.data is not what we expect
      throw new Error(response.message || 'La respuesta del servidor no es válida.');

    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      // Re-throw the error so the UI layer can handle it (e.g., show a toast notification)
      throw error;
    }
  },

  /**
   * Verifica si un DNI ya existe en el sistema
   * @param {string} dni - El DNI a verificar
   * @returns {Promise<boolean>} - True si el DNI ya existe, false en caso contrario
   */
  async checkDniExists(dni) {
    try {
      const response = await api.get(`/patients/check-dni/${dni}`);
      return response.data.exists;
    } catch (error) {
      console.error('Error al verificar DNI:', error);
      // Si hay un error en la petición, asumimos que no existe
      // para evitar bloquear el registro
      return false;
    }
  },

  /**
   * Logs out the current user.
   */
  async logout() {
    try {
      // Llamar al endpoint de logout en el backend
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Error al cerrar sesión en el servidor:', error);
      // Continuar con el logout local incluso si falla la llamada al backend
    } finally {
      // Limpieza completa de datos de autenticación
      this.clearAllAuthData();
    }
  },

  /**
   * Limpia todos los datos de autenticación
   */
  clearAllAuthData() {
    // 1. Limpiar localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    
    // 2. Limpiar sessionStorage por si acaso
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('authToken');
    
    // 3. Limpiar todas las cookies
    clearAllCookies();
    
    // 4. Forzar recarga de la configuración de API
    window.dispatchEvent(new Event('storage')); 
    
    console.log('Logout completado: Todos los datos de autenticación han sido eliminados');
  },

  /**
   * Gets the currently authenticated user from localStorage.
   * This is a placeholder and should be replaced with a call to a /profile or /me endpoint.
   */
  getCurrentUser() {
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    }
    // In a real app, you would decode the token to get user info or call an endpoint
    // For now, we just know a token exists. The AuthContext will hold the full user object.
    return JSON.parse(localStorage.getItem('user'));
  },

  /**
   * Registers a new patient.
   * @param {object} patientData - The patient's registration data.
   * @returns {Promise<object>} The server response.
   */
  async register(patientData) {
    try {
      // The endpoint in the backend is '/patients/register' and is public.
      const response = await api.post('/patients/register', patientData);
      
      // On success, the backend returns the created patient data.
      // We just return the successful response to the context/UI layer.
      return response;

    } catch (error) {
      console.error('Error en el registro:', error);
      // Re-throw the error so the UI layer can display a proper message.
      throw error;
    }
  },

  // Request password reset
  async requestPasswordReset(email) {
    try {
      return await api.post('/auth/forgot-password', { email });
    } catch (error) {
      console.error('Password reset request error:', error);
      throw error;
    }
  },

  // Reset password with token
  async resetPassword(token, newPassword) {
    try {
      return await api.post('/auth/reset-password', { token, newPassword });
    } catch (error) {
      console.error('Password reset error:', error);
      throw error;
    }
  },

  // Check if user is authenticated
  isAuthenticated() {
    return localStorage.getItem('token') !== null;
  }
};

export default authService; 