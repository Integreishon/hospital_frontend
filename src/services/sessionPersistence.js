/**
 * Servicio para garantizar la persistencia de la sesión
 * Este servicio se encarga de asegurar que la sesión del usuario
 * se mantenga activa incluso después de recargar la página.
 */

// Verificar si hay una sesión activa en localStorage
export const hasActiveSession = () => {
  const token = localStorage.getItem('token');
  return !!token;
};

// Obtener el usuario de la sesión actual
export const getSessionUser = () => {
  try {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    return JSON.parse(userStr);
  } catch (err) {
    console.error('Error al obtener usuario de sesión:', err);
    return null;
  }
};

// Guardar la sesión actual
export const saveSession = (token, user) => {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
};

// Limpiar la sesión actual
export const clearSession = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

// Verificar si la sesión actual es válida
export const validateSession = async () => {
  const token = localStorage.getItem('token');
  if (!token) return false;
  
  // En una implementación real, aquí verificarías el token con el backend
  // Por ahora, simplemente asumimos que es válido si existe
  return true;
};

// Inicializar listeners para mantener la sesión
export const initSessionPersistence = () => {
  // Prevenir que la sesión se cierre al recargar
  window.addEventListener('beforeunload', (event) => {
    // No hacer nada especial, solo asegurarnos de que localStorage persista
    // lo cual es el comportamiento predeterminado
  });
  
  // Verificar la sesión al iniciar
  if (hasActiveSession()) {
    console.log('Sesión activa detectada');
  }
};

export default {
  hasActiveSession,
  getSessionUser,
  saveSession,
  clearSession,
  validateSession,
  initSessionPersistence
}; 