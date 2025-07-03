import api from './api';

/**
 * Obtiene el historial médico completo de un paciente.
 * @param {number} patientId - El ID del paciente.
 * @returns {Promise<Array>} - Una promesa que resuelve a un array de registros médicos.
 */
export const getMedicalRecordsByPatientId = async (patientId) => {
  try {
    const response = await api.get(`/medical-records/patient/${patientId}`);
    return response;
  } catch (error) {
    console.error('Error fetching medical records:', error);
    // Propagar el error para que el componente que llama pueda manejarlo
    throw error;
  }
}; 