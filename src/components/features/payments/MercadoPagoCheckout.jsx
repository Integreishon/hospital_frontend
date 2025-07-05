import { useState, useEffect, useRef } from 'react';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import appointmentService from '../../../services/appointmentService';
import Spinner from '../../ui/Spinner';
import Alert from '../../ui/Alert';

const MERCADOPAGO_PUBLIC_KEY = 'TEST-14097700-6b59-4c65-b705-a42a232990e7';

export default function MercadoPagoCheckout({ appointment, onPaymentSuccess }) {
  const [preferenceId, setPreferenceId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [debugInfo, setDebugInfo] = useState('');
  const [retryCount, setRetryCount] = useState(0);

  // Ref to track if the initialization and preference creation has run.
  // This is to prevent duplicate runs in React's StrictMode during development.
  const effectRan = useRef(false);

  // Helper for debug logs
  const addDebugInfo = (message) => {
    const time = new Date().toLocaleTimeString('en-GB');
    const log = `[${time}] ${message}`;
    console.log('🔍 DEBUG:', log);
    setDebugInfo(prev => `${prev}\n${log}`);
  };

  useEffect(() => {
    // In React.StrictMode, this effect runs twice. 
    // The cleanup function and the ref ensure our logic only executes once.
    if (effectRan.current === false) {
      const initAndCreatePreference = async () => {
        try {
          setLoading(true);
          setError(null);
          
          addDebugInfo('Inicializando SDK de Mercado Pago...');
          initMercadoPago(MERCADOPAGO_PUBLIC_KEY, { locale: 'es-PE' });

          addDebugInfo(`🚀 Iniciando creación de preferencia para cita ID: ${appointment.id}`);
          addDebugInfo(`📋 Datos de la cita: ${JSON.stringify({
            id: appointment.id,
            status: appointment.status,
            specialtyName: appointment.specialtyName,
            patientName: appointment.patientName,
            price: appointment.price,
          })}`);
          
          addDebugInfo('📡 Enviando solicitud al backend...');
          const prefId = await appointmentService.createMercadoPagoPreference({
            appointmentId: appointment.id,
            title: `Cita de ${appointment.specialtyName}`,
            price: appointment.price,
          });
          addDebugInfo(`📥 Respuesta recibida: "${prefId}"`);

          if (prefId) {
            setPreferenceId(prefId);
            addDebugInfo(`✅ Preferencia creada exitosamente: ${prefId}`);
          } else {
            throw new Error('El backend no devolvió un ID de preferencia.');
          }
        } catch (err) {
          console.error('Error al crear preferencia de Mercado Pago:', err);
          const errorMessage = err.response?.data?.message || err.message || 'Error desconocido';
          setError(`No se pudo crear la preferencia de pago: ${errorMessage}`);
          addDebugInfo(`❌ Error: ${errorMessage}`);
        } finally {
          setLoading(false);
        }
      };

      if (appointment?.id) {
        initAndCreatePreference();
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
    setDebugInfo('');
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
    <div className="p-4 bg-gray-50 rounded-lg">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Finaliza tu Pago</h3>
      {preferenceId ? (
        <div className="mt-6">
          <Wallet
            initialization={{ preferenceId }}
            customization={{
              texts: {
                valueProp: 'smart_option',
                action: 'pay',
              },
              visual: {
                buttonBackground: 'blue', // Corregido: 'default' está obsoleto
                buttonHeight: '48px',
                borderRadius: '6px',
              },
            }}
            onSubmit={(data) => {
              console.log('📝 Pago enviado:', data);
              addDebugInfo(`📝 Datos de envío: ${JSON.stringify(data)}`);
            }}
          />
        </div>
      ) : (
        <div className="text-center p-4">
          <Spinner />
          <p className="text-gray-500 mt-2">Cargando botón de pago...</p>
        </div>
      )}

      {/* Debug Info Box */}
      <div className="mt-6 p-3 bg-gray-100 border border-gray-200 rounded-md text-xs text-gray-600 max-h-40 overflow-y-auto">
        <h4 className="font-semibold mb-2">Información de depuración:</h4>
        <pre className="whitespace-pre-wrap break-all">{debugInfo || 'No hay eventos de depuración.'}</pre>
      </div>
    </div>
  );
}