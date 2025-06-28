import api from './api';

/**
 * Servicio para gestionar doctores
 */
const doctorService = {
  /**
   * Obtener todos los doctores
   */
  getAllDoctors: async (page = 0, size = 10) => {
    try {
      const response = await api.get('/doctors', { page, size });
      if (response?.data?.content) {
        return response.data.content;
      }
      return [];
    } catch (error) {
      console.error('Error fetching doctors:', error);
      throw error;
    }
  },

  /**
   * Obtener doctor por ID
   */
  getDoctorById: async (id) => {
    try {
      const response = await api.get(`/doctors/${id}`);
      if (response?.data) {
        return response.data;
      }
      return null;
    } catch (error) {
      console.error(`Error fetching doctor ${id}:`, error);
      throw error;
    }
  },

  /**
   * Obtener doctores por especialidad
   */
  getDoctorsBySpecialty: async (specialtyId, page = 0, size = 10) => {
    try {
      const response = await api.get(`/doctors/specialty/${specialtyId}`, { page, size });
      if (response?.data?.content) {
        return response.data.content;
      }
      return [];
    } catch (error) {
      console.error(`Error fetching doctors by specialty ${specialtyId}:`, error);
      throw error;
    }
  },

  /**
   * Buscar doctores por nombre
   */
  searchDoctors: async (name, page = 0, size = 10) => {
    try {
      const response = await api.get('/doctors/search', { name, page, size });
      if (response?.data?.content) {
        return response.data.content;
      }
      return [];
    } catch (error) {
      console.error('Error searching doctors:', error);
      throw error;
    }
  }
};

export default doctorService; 