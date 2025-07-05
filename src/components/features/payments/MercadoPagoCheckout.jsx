import { useState, useEffect, useRef } from 'react';
import { initMercadoPago, Payment } from '@mercadopago/sdk-react';
import appointmentService from '../../../services/appointmentService';
import Spinner from '../../ui/Spinner';
import Alert from '../../ui/Alert';

const MERCADOPAGO_PUBLIC_KEY = 'TEST-14097700-6b59-4c65-b705-a42a232990e7';

export default function MercadoPagoCheckout({ appointment, onPaymentSuccess }) {
  const [preferenceId, setPreferenceId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  // Ref to track if the initialization and preference creation has run.
  // This is to prevent duplicate runs in React's StrictMode during development.
  const effectRan = useRef(false);

  useEffect(() => {
    // In React.StrictMode, this effect runs twice. 
    // The cleanup function and the ref ensure our logic only executes once.
    if (effectRan.current === false) {
      const initAndCreatePreference = async () => {
        try {
          setLoading(true);
          setError(null);
          
          // Inicializar SDK de Mercado Pago
          initMercadoPago(MERCADOPAGO_PUBLIC_KEY, { locale: 'es-PE' });

          if (!appointment || !appointment.id) {
            throw new Error('No se recibió información válida de la cita');
          }

          // Verificar si tenemos precio
          if (!appointment.price && (!appointment.specialty || !appointment.specialty.consultationPrice)) {
            try {
              // Intentar obtener la cita completa del backend si no tiene precio
              const appointmentData = await appointmentService.getAppointmentById(appointment.id);
              if (appointmentData && (appointmentData.price || 
                  (appointmentData.specialty && appointmentData.specialty.consultationPrice))) {
                appointment = {
                  ...appointment,
                  ...appointmentData,
                  price: appointmentData.price || 
                         (appointmentData.specialty ? appointmentData.specialty.consultationPrice : 0)
                };
              }
            } catch (err) {
              console.error('Error al obtener información adicional de la cita:', err);
            }
          }

          const price = appointment.price || 
                       (appointment.specialty ? appointment.specialty.consultationPrice : 0) || 
                       50; // Precio por defecto si no hay otro disponible
          
          // Crear preferencia de pago
          const prefId = await appointmentService.createMercadoPagoPreference(
            appointment.id,
            {
              title: `Cita de ${appointment.specialtyName || 'Consulta médica'}`,
              price: price,
            }
          );

          if (prefId) {
            setPreferenceId(prefId);
          } else {
            throw new Error('El backend no devolvió un ID de preferencia.');
          }
        } catch (err) {
          console.error('Error al crear preferencia de Mercado Pago:', err);
          const errorMessage = err.response?.data?.message || err.message || 'Error desconocido';
          setError(`No se pudo crear la preferencia de pago: ${errorMessage}`);
        } finally {
          setLoading(false);
        }
      };

      if (appointment?.id) {
        initAndCreatePreference();
      } else {
        setError('No se proporcionó información de la cita');
        setLoading(false);
      }
    }

    // The cleanup function is called when the component unmounts.
    // In StrictMode, this happens after the first run.
    // We set the ref to true here.
    return () => {
      effectRan.current = true;
    };
  }, [appointment, retryCount]);

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    setPreferenceId(null);
    setLoading(true);
    setError(null);
    effectRan.current = false; // Reset the effect guard for retry
  };

  if (loading) {
    return (
      <div className="text-center p-4">
        <Spinner />
        <p className="text-gray-500 mt-2">Creando link de pago...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <Alert type="error" title="Error de Pago" message={error} />
        <button 
          onClick={handleRetry}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="p-2 bg-gray-50 rounded-lg">
      <h3 className="text-base font-semibold text-gray-800 mb-3 text-center">Finaliza tu Pago</h3>
      
      {/* Resumen de la cita */}
      <div className="mb-3 p-2 bg-white rounded-lg border border-gray-200">
        <h4 className="font-medium text-sm text-gray-700 mb-1">Resumen de la cita:</h4>
        <ul className="space-y-0.5 text-xs text-gray-600">
          <li><span className="font-medium">Especialidad:</span> {appointment.specialtyName || 'Consulta médica'}</li>
          {appointment.doctorName && (
            <li><span className="font-medium">Doctor:</span> {appointment.doctorName}</li>
          )}
          {appointment.appointmentDate && (
            <li><span className="font-medium">Fecha:</span> {appointment.appointmentDate}</li>
          )}
          <li><span className="font-medium">Monto a pagar:</span> S/. {appointment.price || 
            (appointment.specialty ? appointment.specialty.consultationPrice : 0) || 
            '(Consultando...)'}</li>
        </ul>
      </div>
      
      {isSubmitting && (
        <div className="text-center p-3">
          <Spinner />
          <p className="text-gray-500 mt-2 text-sm">Procesando pago, por favor espera...</p>
        </div>
      )}
      {submitError && (
        <Alert type="error" title="Error al Procesar el Pago" message={submitError} />
      )}
      
      {!isSubmitting && preferenceId && (
        <>
          {submitError && (
            <div className="mb-3">
              <Alert type="error" title="El pago fue rechazado" message={submitError} />
              
              {/* Mensaje informativo para entorno de pruebas */}
              <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-xs text-yellow-800">
                <p className="font-semibold">⚠️ Información importante:</p>
                {submitError.includes('usuarios de prueba') ? (
                  <>
                    <p>Para usar el entorno de pruebas de Mercado Pago, debes:</p>
                    <ol className="list-decimal ml-4 mt-1">
                      <li>Crear usuarios de prueba desde el panel de desarrollador de Mercado Pago</li>
                      <li>Usar el correo de un usuario de prueba como comprador</li>
                      <li>Usar las tarjetas de prueba proporcionadas por Mercado Pago</li>
                    </ol>
                    <p className="mt-1 font-medium">Ejemplo de tarjeta de prueba:</p>
                    <ul className="ml-4 mt-1">
                      <li>Número: 5031 7557 3453 0604</li>
                      <li>CVV: 123</li>
                      <li>Fecha: 11/25</li>
                      <li>Nombre: APRO</li>
                    </ul>
                  </>
                ) : (
                  <>
                    <p>En el entorno de pruebas, algunas tarjetas están configuradas para ser rechazadas a propósito.</p>
                    <p className="mt-1">Prueba con otra tarjeta de la documentación de Mercado Pago.</p>
                  </>
                )}
              </div>
              
              <button 
                onClick={() => setSubmitError(null)}
                className="mt-2 w-full px-3 py-1.5 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
              >
                Intentar con otro método de pago
              </button>
            </div>
          )}
          <div style={{ display: submitError ? 'none' : 'block' }}>
            <div className="max-h-[400px] md:max-h-[450px] overflow-y-auto pr-1 custom-scrollbar">
              <Payment
                initialization={{
                  amount: appointment.price || 
                         (appointment.specialty ? appointment.specialty.consultationPrice : 0) || 
                         50,
                  preferenceId: preferenceId,
                }}
                customization={{
                  paymentMethods: {
                    mercadoPago: 'all',
                    creditCard: 'all',
                    debitCard: 'all',
                  },
                  visual: {
                    hideFormTitle: true,
                    hidePaymentButton: false,
                  }
                }}
                onSubmit={async ({ formData }) => {
                  setIsSubmitting(true);
                  setSubmitError(null);

                  try {
                    const paymentData = {
                      ...formData,
                    };

                    const result = await appointmentService.processPayment(paymentData, appointment.id);
                    
                    if (onPaymentSuccess) {
                      onPaymentSuccess(result);
                    }

                  } catch (err) {
                    setIsSubmitting(false);
                    console.error('Error al procesar el pago:', err);
                    
                    // Manejar errores específicos de Mercado Pago
                    if (err.message.includes('Invalid users involved')) {
                      setSubmitError('Error de configuración de usuarios de prueba en Mercado Pago. Por favor, utiliza los usuarios de prueba proporcionados por Mercado Pago.');
                    } else if (err.message.includes('Api error')) {
                      setSubmitError('Error de comunicación con Mercado Pago. Por favor, intenta con otra tarjeta de prueba.');
                    } else {
                      setSubmitError(err.message);
                    }
                  }
                }}
              />
            </div>
          </div>
        </>
      )}

      {/* Pie de página profesional */}
      <div className="mt-6 pt-4 border-t border-gray-200 text-center text-xs text-gray-500">
        <p>© 2025 Todos los derechos reservados.</p>
        <p className="mt-1">RUC 20612392278</p>
      </div>
    </div>
  );
}