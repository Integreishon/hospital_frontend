// Base API configuration for making requests to the backend

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

// Helper function for handling API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    // Try to get error message from the response
    let errorMessage;
    try {
      const errorData = await response.json();
      // Handle ApiResponse error structure
      if (errorData.message) {
        errorMessage = errorData.message;
      } else if (errorData.error) {
        errorMessage = errorData.error;
      } else {
        errorMessage = `Error: ${response.status}`;
      }
    } catch (e) {
      errorMessage = `Error: ${response.status}`;
    }
    throw new Error(errorMessage);
  }
  
  // Check if response is empty
  const contentType = response.headers.get('content-type');
  if (!contentType || !contentType.includes('application/json')) {
    return null;
  }
  
  const jsonResponse = await response.json();
  
  // Handle ApiResponse structure
  if (jsonResponse.hasOwnProperty('success') && jsonResponse.hasOwnProperty('data')) {
    if (!jsonResponse.success) {
      throw new Error(jsonResponse.message || 'Error en la respuesta del servidor');
    }
    return jsonResponse;
  }
  
  return { success: true, data: jsonResponse };
};

// Create request headers with authentication token if available
const createHeaders = (additionalHeaders = {}) => {
  const headers = {
    'Content-Type': 'application/json',
    ...additionalHeaders,
  };
  
  // Siempre obtenemos el token más reciente del localStorage
  const token = localStorage.getItem('token');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
    // Verificar que no sea un token vacío o inválido
    if (token === 'undefined' || token === 'null') {
      console.warn('Token inválido detectado, eliminando...');
      localStorage.removeItem('token');
      delete headers['Authorization'];
    }
  }
  
  return headers;
};

// API methods
export const api = {
  // GET request
  async get(endpoint, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = `${API_BASE_URL}${endpoint}${queryString ? `?${queryString}` : ''}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: createHeaders(),
      credentials: 'same-origin', // Incluir cookies en las solicitudes
    });
    
    return handleResponse(response);
  },
  
  // POST request
  async post(endpoint, data) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: createHeaders(),
      credentials: 'same-origin',
      body: JSON.stringify(data),
    });
    
    return handleResponse(response);
  },
  
  // PUT request
  async put(endpoint, data) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: createHeaders(),
      credentials: 'same-origin', // Incluir cookies en las solicitudes
      body: JSON.stringify(data),
    });
    
    return handleResponse(response);
  },
  
  // DELETE request
  async delete(endpoint) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: createHeaders(),
      credentials: 'same-origin', // Incluir cookies en las solicitudes
    });
    
    return handleResponse(response);
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
  api.clearAuthState();
});

export default api; 