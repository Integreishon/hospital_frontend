import api from './api';

/**
 * Servicio para gestionar citas médicas
 */
const appointmentService = {
  /**
   * Obtener todas las citas del paciente actual
   */
  getMyAppointments: async (page = 0, size = 10) => {
    try {
      const response = await api.get('/appointments/my-appointments', { page, size });
      if (response && typeof response === 'object') {
        return response.data || response.content || response;
      }
      return response;
    } catch (error) {
      console.error('Error fetching appointments:', error);
      throw error;
    }
  },

  /**
   * Obtener una cita por su ID
   */
  getAppointmentById: async (id) => {
    try {
      const response = await api.get(`/appointments/${id}`);
      if (response && typeof response === 'object') {
        return response.data || response;
      }
      return response;
    } catch (error) {
      console.error(`Error fetching appointment ${id}:`, error);
      throw error;
    }
  },

  /**
   * Crear una nueva cita
   */
  createAppointment: async (appointmentData) => {
    try {
      const response = await api.post('/appointments', appointmentData);
      if (response && typeof response === 'object') {
        return response.data || response;
      }
      return response;
    } catch (error) {
      console.error('Error creating appointment:', error);
      throw error;
    }
  },

  /**
   * Cancelar una cita
   */
  cancelAppointment: async (id) => {
    try {
      const response = await api.put(`/appointments/${id}/cancel`);
      if (response && typeof response === 'object') {
        return response.data || response;
      }
      return response;
    } catch (error) {
      console.error(`Error cancelling appointment ${id}:`, error);
      throw error;
    }
  },

  /**
   * Obtener bloques de tiempo disponibles para un doctor en una fecha específica
   */
  getAvailableBlocks: async (doctorId, date) => {
    try {
      const response = await api.get(`/appointments/available-blocks/${doctorId}`, { date });
      if (response && typeof response === 'object') {
        return response.data || response.content || response;
      }
      return response;
    } catch (error) {
      console.error('Error fetching available blocks:', error);
      throw error;
    }
  },

  /**
   * Obtener disponibilidad por especialidad y fecha
   */
  getAvailabilityBySpecialty: async (specialtyId, date) => {
    try {
      const response = await api.get(`/appointments/availability/specialty/${specialtyId}`, { date });
      if (response && typeof response === 'object') {
        return response.data || response.content || response;
      }
      return response;
    } catch (error) {
      console.error('Error fetching specialty availability:', error);
      throw error;
    }
  }
};

export default appointmentService; 