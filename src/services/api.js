import axios from 'axios';

// Base API configuration for making requests to the backend

const API_BASE_URL = 'http://localhost:8080/api';

// Create an instance of Axios with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  timeout: 10000 // 10 seconds timeout
});

// Variable para controlar si estamos en medio de un refresh de token
let isRefreshingToken = false;
// Cola de peticiones a reintentar después de refreshear el token
let requestsQueue = [];

/**
 * Procesa la respuesta de la API en un formato estandarizado
 * @param {Object} response - La respuesta de Axios
 * @returns {Object} Respuesta estandarizada
 */
const handleResponse = (response) => {
  const data = response.data;
  
  // Si la API devuelve un formato estándar, lo usamos
  if (data && (typeof data === 'object') && ('success' in data)) {
    if (!data.success && data.message) {
      // Si la API indica error, lanzamos una excepción con el mensaje
      throw new Error(data.message);
    }
    return data;
  }
  
  // Si no tiene un formato estándar, creamos uno
  return {
    success: true,
    data: data,
    status: response.status,
    statusText: response.statusText,
    headers: response.headers
  };
};

/**
 * Maneja errores de API de forma estandarizada
 * @param {Object} error - Error de Axios
 * @throws {Error} Error formateado
 */
const handleApiError = (error) => {
  // Formateamos el error de manera más útil
  let errorMessage = 'Error de red o servidor no disponible';
  let statusCode = 500;
  
  if (error.response) {
    // El servidor respondió con un código de error
    statusCode = error.response.status;
    
    // Manejar diferentes tipos de errores según el status code
    if (error.response.data && error.response.data.message) {
      errorMessage = error.response.data.message;
    } else if (error.response.data && typeof error.response.data === 'string') {
      errorMessage = error.response.data;
    } else {
      // Mensajes por defecto según status
      if (statusCode === 401) {
        errorMessage = 'Token no válido o expirado';
      } else if (statusCode === 403) {
        errorMessage = 'No tienes permiso para acceder a este recurso';
      } else if (statusCode === 404) {
        errorMessage = 'Recurso no encontrado';
      } else if (statusCode >= 500) {
        errorMessage = 'Error interno del servidor';
      }
    }
  } else if (error.request) {
    // La solicitud se realizó pero no hubo respuesta
    errorMessage = 'El servidor no respondió a la solicitud';
  }
  
  // Crear un error con información adicional
  const enhancedError = new Error(errorMessage);
  enhancedError.statusCode = statusCode;
  enhancedError.originalError = error;
  
  throw enhancedError;
};

// Interceptor para agregar el token a todas las solicitudes
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar las respuestas
api.interceptors.response.use(
  (response) => {
    // Transformar respuestas exitosas
    return handleResponse(response);
  },
  async (error) => {
    // Para cualquier error, simplemente lo procesamos y lo rechazamos
    // sin intentar manejar tokens o sesiones
    return Promise.reject(handleApiError(error));
  }
);

// Métodos para interactuar con la API
const apiService = {
  /**
   * Realiza una solicitud GET a la API
   * @param {string} endpoint - Ruta del endpoint
   * @param {object} config - Configuración adicional de Axios
   * @returns {Promise<object>} Respuesta procesada
   */
  async get(endpoint, config = {}) {
    try {
      return await api.get(endpoint, config);
    } catch (error) {
      throw error; // Ya procesado por el interceptor
    }
  },
  
  /**
   * Realiza una solicitud POST a la API
   * @param {string} endpoint - Ruta del endpoint
   * @param {object} data - Datos a enviar
   * @param {object} config - Configuración adicional de Axios
   * @returns {Promise<object>} Respuesta procesada
   */
  async post(endpoint, data = {}, config = {}) {
    try {
      return await api.post(endpoint, data, config);
    } catch (error) {
      throw error; // Ya procesado por el interceptor
    }
  },
  
  /**
   * Realiza una solicitud PUT a la API
   * @param {string} endpoint - Ruta del endpoint
   * @param {object} data - Datos a enviar
   * @param {object} config - Configuración adicional de Axios
   * @returns {Promise<object>} Respuesta procesada
   */
  async put(endpoint, data = {}, config = {}) {
    try {
      return await api.put(endpoint, data, config);
    } catch (error) {
      throw error; // Ya procesado por el interceptor
    }
  },
  
  /**
   * Realiza una solicitud DELETE a la API
   * @param {string} endpoint - Ruta del endpoint
   * @param {object} config - Configuración adicional de Axios
   * @returns {Promise<object>} Respuesta procesada
   */
  async delete(endpoint, config = {}) {
    try {
      return await api.delete(endpoint, config);
    } catch (error) {
      throw error; // Ya procesado por el interceptor
    }
  },
  
  // Upload files
  async upload(endpoint, formData) {
    // Don't set Content-Type header as it will be set automatically with the boundary
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: createHeaders({ 'Content-Type': undefined }),
      credentials: 'same-origin', // Incluir cookies en las solicitudes
      body: formData,
    });
    
    return handleResponse(response);
  },
  
  // Método para limpiar cualquier estado de autenticación en el cliente API
  clearAuthState() {
    console.log('Limpiando estado de autenticación en el cliente API');
  }
};

// Escuchar eventos de storage para actualizar el estado de autenticación
window.addEventListener('storage', () => {
  apiService.clearAuthState();
});

export default apiService; 