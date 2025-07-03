import api from './api';

/**
 * Servicio para interactuar con la API del chatbot
 */
export const chatbotService = {
  /**
   * Obtiene un nuevo ID de sesión para el chatbot
   */
  getSessionId() {
    return localStorage.getItem('chatbot_session_id') || this.generateSessionId();
  },

  /**
   * Genera un nuevo ID de sesión y lo guarda en localStorage
   */
  generateSessionId() {
    const sessionId = 'session_' + Math.random().toString(36).substring(2, 15);
    localStorage.setItem('chatbot_session_id', sessionId);
    return sessionId;
  },

  /**
   * Envía una consulta al chatbot
   * @param {string} query - La pregunta o mensaje para el chatbot
   * @returns {Promise} - Promesa con la respuesta del chatbot
   */
  async sendQuery(query) {
    try {
      const sessionId = this.getSessionId();
      
      const response = await api.post('/chatbot/query', {
        query,
        sessionId,
        source: 'web',
        includeReferences: true,
        language: 'es'
      });

      console.log("Chatbot query raw response:", JSON.stringify(response, null, 2));
      // La respuesta ya está procesada por el método handleResponse en api.js
      return response;
    } catch (error) {
      console.error('Error al consultar chatbot:', error);
      throw error;
    }
  },

  /**
   * Obtiene el historial de conversaciones del chatbot
   * @returns {Promise} - Promesa con el historial de conversaciones
   */
  async getConversationHistory() {
    try {
      const sessionId = this.getSessionId();
      const response = await api.get(`/chatbot/conversations/${sessionId}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener historial de chatbot:', error);
      throw error;
    }
  },

  /**
   * Envía feedback sobre una respuesta del chatbot
   * @param {number} conversationId - ID de la conversación 
   * @param {number} rating - Calificación (1-5)
   * @param {string} comment - Comentario opcional
   * @returns {Promise} - Promesa con la respuesta actualizada
   */
  async sendFeedback(conversationId, rating, comment = '') {
    try {
      const response = await api.post('/chatbot/feedback', {
        conversationId,
        feedbackRating: rating,
        feedbackComment: comment
      });
      return response.data;
    } catch (error) {
      console.error('Error al enviar feedback al chatbot:', error);
      throw error;
    }
  },

  /**
   * Obtiene las preguntas frecuentes para mostrar al usuario
   * @param {number} limit - Número de FAQs a obtener
   * @returns {Promise} - Promesa con las FAQs
   */
  async getFAQs(limit = 5) {
    try {
      const response = await api.get(`/chatbot/faqs?limit=${limit}`);
      console.log("Raw FAQs response:", JSON.stringify(response, null, 2));
      
      // La respuesta ya está procesada por el método handleResponse en api.js
      // que devuelve directamente la respuesta del servidor
      return response;
    } catch (error) {
      console.error('Error al obtener FAQs del chatbot:', error);
      throw error;
    }
  }
};

export default chatbotService; 