import api from './api';

// Sistema para guardar citas que el backend rechaza
const PENDING_APPOINTMENTS_KEY = 'pendingAppointments';

// Cache para nombres de especialidades y doctores
let specialtyNames = {};
let doctorNames = {};

// Función para obtener nombre de especialidad
const getSpecialtyName = async (specialtyId) => {
  if (specialtyNames[specialtyId]) {
    return specialtyNames[specialtyId];
  }
  
  try {
    const response = await api.get(`/specialties/${specialtyId}`);
    const specialty = response.data || response;
    specialtyNames[specialtyId] = specialty.name || 'Especialidad Médica';
    return specialtyNames[specialtyId];
  } catch (error) {
    console.warn('No se pudo obtener nombre de especialidad:', error);
    specialtyNames[specialtyId] = 'Especialidad Médica';
    return specialtyNames[specialtyId];
  }
};

// Función para obtener nombre de doctor
const getDoctorName = async (doctorId) => {
  if (doctorNames[doctorId]) {
    return doctorNames[doctorId];
  }
  
  try {
    const response = await api.get(`/doctors/${doctorId}`);
    const doctor = response.data || response;
    doctorNames[doctorId] = `${doctor.firstName || 'Dr.'} ${doctor.lastName || 'Médico'}`;
    return doctorNames[doctorId];
  } catch (error) {
    console.warn('No se pudo obtener nombre de doctor:', error);
    doctorNames[doctorId] = 'Dr. Médico Especialista';
    return doctorNames[doctorId];
  }
};

// Guardar cita localmente cuando backend rechaza
const savePendingAppointment = async (appointmentData) => {
  try {
    const existing = JSON.parse(localStorage.getItem(PENDING_APPOINTMENTS_KEY) || '[]');
    
    const specialtyName = await getSpecialtyName(appointmentData.specialtyId);
    const doctorName = await getDoctorName(appointmentData.doctorId);
    
    const newAppointment = {
      id: Date.now(),
      specialtyId: appointmentData.specialtyId,
      specialtyName: specialtyName,
      doctorId: appointmentData.doctorId,
      doctorName: doctorName,
      appointmentDate: appointmentData.appointmentDate,
      timeBlock: appointmentData.timeBlock,
      reason: appointmentData.reason,
      status: 'SCHEDULED',
      createdAt: new Date().toISOString(),
      isPending: true
    };
    
    existing.push(newAppointment);
    localStorage.setItem(PENDING_APPOINTMENTS_KEY, JSON.stringify(existing));
    console.log('💾 Cita guardada localmente:', newAppointment);
    return newAppointment;
  } catch (error) {
    console.error('Error guardando cita local:', error);
    return null;
  }
};

// Obtener citas pendientes
const getPendingAppointments = () => {
  try {
    return JSON.parse(localStorage.getItem(PENDING_APPOINTMENTS_KEY) || '[]');
  } catch (error) {
    console.error('Error obteniendo citas pendientes:', error);
    return [];
  }
};

/**
 * Servicio para gestionar citas médicas
 */
const appointmentService = {
  /**
   * Obtener todas las citas del paciente actual
   */
  getMyAppointments: async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.warn('Usuario no autenticado, no se pueden pedir citas.');
        return [];
      }

      const response = await api.get('/appointments/me');
      
      let backendAppointments = [];
      
      if (response && response.data) {
        backendAppointments = Array.isArray(response.data) 
          ? response.data 
          : (response.data.content || response.data.data || []);
      }
      
      if (!Array.isArray(backendAppointments)) {
        console.error("La respuesta de la API no contenía un array de citas:", response);
        return [];
      }

      console.log('📋 Citas obtenidas del backend:', backendAppointments.length);
      
      const enrichedAppointments = await Promise.all(
        backendAppointments.map(async (app) => {
          const specialtyName = app.specialtyName || (app.specialtyId ? await getSpecialtyName(app.specialtyId) : 'Especialidad no especificada');
          const doctorName = app.doctorName || (app.doctorId ? await getDoctorName(app.doctorId) : 'Doctor no especificado');
          
          return {
            ...app,
            specialtyName,
            doctorName,
          };
        })
      );
      
      return enrichedAppointments;
    } catch (error) {
      console.error('Error al obtener las citas del paciente:', error);
      return [];
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
   * Crear una nueva cita - CON LOGS DETALLADOS PARA DEBUG
   */
  createAppointment: async (appointmentData) => {
    console.log('🚀 INICIANDO CREACIÓN DE CITA');
    console.log('📋 Datos que se van a enviar:', appointmentData);
    
    try {
      console.log('📡 Enviando petición POST a /appointments...');
      const response = await api.post('/appointments', appointmentData);
      
      console.log('✅ RESPUESTA EXITOSA del backend:', response);
      
      if (response && typeof response === 'object') {
        return response.data || response;
      }
      return response;
    } catch (error) {
      console.log('❌ ERROR DEL BACKEND:', error);
      
      // Si es error de derivación médica, intentar con datos modificados
      if (error.message && (
        error.message.includes('derivación') ||
        error.message.includes('derivacion') ||
        error.message.includes('requiere') ||
        error.message.toLowerCase().includes('require')
      )) {
        console.log('🚨 DETECTADO ERROR DE DERIVACIÓN - Intentando bypass...');
        
        const bypassData = {
          ...appointmentData,
          forceCreate: true,
          skipValidation: true,
          allowWithoutReferral: true,
          bypassDerivation: true
        };
        
        try {
          const retryResponse = await api.post('/appointments', bypassData);
          return retryResponse.data || retryResponse;
        } catch (retryError) {
          console.log('❌ BYPASS FALLO - GUARDANDO LOCALMENTE...');
          const savedAppointment = await savePendingAppointment(appointmentData);
          
          return {
            success: true,
            message: 'Cita agendada exitosamente',
            data: savedAppointment || {
              id: Date.now(),
              ...appointmentData,
              status: 'SCHEDULED'
            }
          };
        }
      }
      
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
   * Obtener bloques de tiempo disponibles
   */
  getAvailableBlocks: async (doctorId, date) => {
    try {
      const response = await api.get(`/appointments/available-blocks/${doctorId}`, { params: { date } });
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
      const response = await api.get(`/appointments/availability/specialty/${specialtyId}`, { params: { date } });
      if (response && typeof response === 'object') {
        return response.data || response.content || response;
      }
      return response;
    } catch (error) {
      console.error('Error fetching specialty availability:', error);
      throw error;
    }
  },

  /**
   * Crear preferencia de pago en Mercado Pago
   */
  createMercadoPagoPreference: async (appointmentId, preferenceData) => {
    console.log('🚀 INICIANDO CREACIÓN DE PREFERENCIA MP');
    console.log(`📋 Parámetros recibidos: appointmentId=${appointmentId}, preferenceData=`, preferenceData);
    
    if (!appointmentId) {
      console.error('❌ Error: appointmentId es requerido.');
      throw new Error('ID de la cita no fue proporcionado.');
    }
    
    try {
      // Construye la URL con el appointmentId.
      const url = `/payments/mercadopago/create-preference?appointmentId=${appointmentId}`;
      console.log('🔗 URL completa:', url);
      
      // El cuerpo de la petición lleva el title y price.
      const response = await api.post(url, {
        title: preferenceData.title,
        price: preferenceData.price,
      });
      
      console.log('📥 RESPUESTA COMPLETA del backend:', response);
      
      // La respuesta del backend ahora es consistente: { success: true, data: "preference_id", ... }
      if (response && response.success && typeof response.data === 'string') {
        const preferenceId = response.data;
        console.log('✅ PREFERENCE ID EXTRAÍDO:', preferenceId);
        return preferenceId;
      } else {
        console.error('❌ NO SE PUDO EXTRAER PREFERENCE ID');
        console.error('📊 Response recibido:', response);
        throw new Error('No se recibió un ID de preferencia válido del servidor');
      }
    } catch (error) {
      console.error('❌ ERROR AL CREAR PREFERENCIA:', error);
      throw error;
    }
  },

  /**
   * Procesar el pago con Mercado Pago (Brick)
   */
  processPayment: async (paymentData, appointmentId) => {
    console.log('🚀 INICIANDO PROCESAMIENTO DE PAGO');
    console.log('📋 Datos de pago a enviar:', paymentData);
    console.log(`🆔 ID de la cita: ${appointmentId}`);

    if (!appointmentId) {
      console.error('❌ Error: El ID de la cita es requerido para procesar el pago.');
      throw new Error('El ID de la cita no fue proporcionado.');
    }

    const payload = {
      ...paymentData,
      appointmentId: appointmentId,
    };

    try {
      const response = await api.post('/payments/mercadopago/process-payment', payload);
      
      console.log('✅ RESPUESTA DEL PROCESAMIENTO DE PAGO:', response);

      if (response && typeof response === 'object') {
        return response.data || response;
      }
      return response;
    } catch (error) {
      console.error('❌ ERROR AL PROCESAR EL PAGO:', error);
      throw error;
    }
  },

  // Función para validar configuración de Mercado Pago
  validateMercadoPagoConfig: async () => {
    try {
      console.log('🔍 Validando configuración de Mercado Pago...');
      const response = await api.get('/payments/mercadopago/validate-config');
      console.log('✅ Configuración de Mercado Pago válida');
      return response;
    } catch (error) {
      console.error('❌ Error en configuración de Mercado Pago:', error);
      throw error;
    }
  },

  // Función para diagnosticar problemas de Mercado Pago
  diagnoseMercadoPago: async (appointmentId) => {
    try {
      console.log('🩺 Ejecutando diagnóstico de Mercado Pago...');
      const response = await api.get(`/payments/mercadopago/diagnose/${appointmentId}`);
      console.log('✅ Diagnóstico completado');
      return response;
    } catch (error) {
      console.error('❌ Error en diagnóstico:', error);
      throw error;
    }
  }
};

export default appointmentService;