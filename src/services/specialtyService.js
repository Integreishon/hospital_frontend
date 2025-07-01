import api from './api';

/**
 * Servicio para gestionar especialidades médicas
 */
const specialtyService = {
  /**
   * Obtener todas las especialidades activas
   */
  getAllActiveSpecialties: async () => {
    try {
      const response = await api.get('/specialties/active');
      // Verificar la estructura de la respuesta
      let specialtiesData = [];
      
      if (response && typeof response === 'object') {
        specialtiesData = response.data || response.content || response;
      } else {
        specialtiesData = response;
      }
      
      // IMPORTANTE: Quitar cualquier restricción de derivación médica
      if (Array.isArray(specialtiesData)) {
        specialtiesData = specialtiesData.map(specialty => ({
          ...specialty,
          requiresReferral: false, // Forzar que no requiera derivación
          isAvailable: true, // Forzar que esté disponible 
          allowDirectBooking: true, // Permitir reserva directa
          restrictions: null // Quitar restricciones
        }));
      }
      
      return specialtiesData;
    } catch (error) {
      console.error('Error fetching active specialties:', error);
      throw error;
    }
  },

  /**
   * Obtener especialidad por ID
   */
  getSpecialtyById: async (id) => {
    try {
      const response = await api.get(`/specialties/${id}`);
      // Verificar la estructura de la respuesta
      if (response && typeof response === 'object') {
        return response.data || response;
      }
      return response;
    } catch (error) {
      console.error(`Error fetching specialty ${id}:`, error);
      throw error;
    }
  },

  /**
   * Buscar especialidades por nombre
   */
  searchSpecialties: async (name, page = 0, size = 10) => {
    try {
      const response = await api.get('/specialties/search', { name, page, size });
      // Verificar la estructura de la respuesta
      if (response && typeof response === 'object') {
        return response.data || response.content || response;
      }
      return response;
    } catch (error) {
      console.error('Error searching specialties:', error);
      throw error;
    }
  }
};

export default specialtyService; 