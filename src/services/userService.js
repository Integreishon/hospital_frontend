import api from './api';

/**
 * Servicio para gestionar la información de usuarios y pacientes
 */
const userService = {
  /**
   * Obtiene la información del paciente actualmente autenticado
   * @returns {Promise<Object>} Datos del paciente
   * @throws {Error} Si no hay usuario autenticado o hay un error en la API
   */
  getCurrentPatient: async () => {
    try {
      // Obtener el ID del usuario del localStorage
      const userString = localStorage.getItem('user');
      const user = userString ? JSON.parse(userString) : null;
      
      if (!user || !user.id) {
        throw new Error('No hay usuario autenticado o falta ID de usuario');
      }
      
      // Usar el endpoint correcto para obtener paciente por ID de usuario
      const response = await api.get(`/patients/byUserId/${user.id}`);
      
      if (response && response.data) {
        return response.data;
      }
      
      throw new Error('La respuesta de la API no contenía datos de paciente.');
      
    } catch (error) {
      // Registrar el error en consola a nivel de debug para evitar mensajes de error alarmantes
      // durante operaciones normales (como carga inicial de componentes)
      console.debug('Error al obtener los datos del paciente:', error);
      
      // Propagar el error para que se pueda manejar en los componentes
      throw error;
    }
  },

  /**
   * Obtiene la información completa del usuario actual, incluyendo datos de paciente si corresponde
   * @returns {Promise<Object>} Datos del usuario con perfil completo
   * @throws {Error} Si no hay usuario autenticado o hay un error en la API
   */
  getCurrentUserProfile: async () => {
    try {
      // Obtener datos del usuario del localStorage
      const userString = localStorage.getItem('user');
      const user = userString ? JSON.parse(userString) : null;
      
      if (!user) {
        throw new Error('No hay usuario autenticado');
      }
      
      // Si el usuario es un paciente, obtener sus datos completos
      if (user.role === 'PATIENT') {
        try {
          const patientData = await userService.getCurrentPatient();
          
          // Combinar los datos de usuario con los datos de paciente
          const enhancedUser = {
            ...user,
            patientData,
            // Campos de conveniencia para facilitar acceso
            firstName: patientData.firstName,
            lastName: patientData.lastName,
            fullName: patientData.fullName,
          };
          
          localStorage.setItem('user', JSON.stringify(enhancedUser)); // Actualizamos el localStorage con los datos completos
          return enhancedUser;
        } catch (error) {
          console.debug('No se pudieron obtener datos adicionales del paciente, se usarán datos básicos');
          return user;
        }
      }
      
      return user;
    } catch (error) {
      console.debug('Error al obtener perfil de usuario:', error);
      throw error;
    }
  }
};

export default userService; 