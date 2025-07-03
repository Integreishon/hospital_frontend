import { useState, useEffect, useRef } from 'react';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import appointmentService from '../../../services/appointmentService';
import Spinner from '../../ui/Spinner';
import Alert from '../../ui/Alert';

// Tu Public Key de prueba
const MERCADOPAGO_PUBLIC_KEY = 'TEST-14097700-6b59-4c65-b705-a42a232990e7';

// Inicialización global única del SDK
let sdkInitialized = false;

const initializeSDKOnce = () => {
  if (!sdkInitialized && typeof window !== 'undefined') {
    try {
      // Limpiar cualquier instancia previa
      if (window.MercadoPago) {
        console.log('🧹 Limpiando instancia previa de MercadoPago');
        delete window.MercadoPago;
      }
      
      initMercadoPago(MERCADOPAGO_PUBLIC_KEY, {
        locale: 'es-PE',
        advancedFraudPrevention: false, // Desactivar para evitar errores de red
      });
      
      sdkInitialized = true;
      console.log('✅ Mercado Pago SDK inicializado ÚNICA vez');
    } catch (error) {
      console.error('❌ Error inicializando SDK:', error);
      sdkInitialized = false;
    }
  }
};

// Inicializar inmediatamente al cargar el módulo
initializeSDKOnce();

export default function MercadoPagoCheckout({ appointment, onPaymentSuccess }) {
  const [preferenceId, setPreferenceId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [debugInfo, setDebugInfo] = useState('');
  const [showDebug, setShowDebug] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  
  // Refs para evitar re-creaciones innecesarias
  const walletRef = useRef(null);
  const creatingPreference = useRef(false);
  const lastAppointmentId = useRef(null);

  // Función para agregar debug info
  const addDebugInfo = (info) => {
    const timestamp = new Date().toLocaleTimeString();
    const logMessage = `[${timestamp}] ${info}`;
    setDebugInfo(prev => prev ? `${prev}\n${logMessage}` : logMessage);
    console.log('🔍 DEBUG:', logMessage);
  };

  // Crear preferencia solo cuando sea necesario
  useEffect(() => {
    // Verificar si realmente necesitamos crear una nueva preferencia
    if (!appointment || !appointment.id) {
      addDebugInfo('⚠️ Esperando datos de la cita...');
      setLoading(false);
      return;
    }

    // Evitar crear múltiples preferencias para la misma cita
    if (lastAppointmentId.current === appointment.id && preferenceId) {
      addDebugInfo(`🔄 Ya existe preferencia para cita ${appointment.id}`);
      setLoading(false);
      return;
    }

    // Evitar múltiples llamadas simultáneas
    if (creatingPreference.current) {
      addDebugInfo('🔄 Creación de preferencia en progreso...');
      return;
    }

    const createPreference = async () => {
      creatingPreference.current = true;
      setLoading(true);
      setError(null);
      
      try {
        addDebugInfo(`🚀 Creando preferencia para cita ID: ${appointment.id}`);
        addDebugInfo(`📋 Datos: ${JSON.stringify({
          id: appointment.id,
          status: appointment.status,
          specialtyName: appointment.specialtyName,
          price: appointment.price
        })}`);
        
        // Usar método simplificado del backend
        const response = await appointmentService.createMercadoPagoPreference(appointment.id);
        
        if (response && typeof response === 'string') {
          addDebugInfo(`✅ Preferencia creada: ${response}`);
          setPreferenceId(response);
          lastAppointmentId.current = appointment.id;
          
          // Crear URL de fallback
          const fallbackUrl = `https://www.mercadopago.com.pe/checkout/v1/redirect?pref_id=${response}`;
          setPaymentUrl(fallbackUrl);
          
        } else {
          throw new Error('Respuesta inválida del servidor');
        }
        
      } catch (err) {
        addDebugInfo(`❌ Error: ${err.message}`);
        console.error('❌ Error completo:', err);
        
        // Mensaje de error más específico
        let errorMessage = 'Error al crear el pago. ';
        
        if (err.message?.includes('400')) {
          errorMessage += 'Datos inválidos de la cita.';
        } else if (err.message?.includes('500')) {
          errorMessage += 'Error del servidor. Intente más tarde.';
        } else if (err.message?.includes('network') || err.message?.includes('conexión')) {
          errorMessage += 'Error de conexión.';
        } else {
          errorMessage += err.message;
        }
        
        setError(errorMessage);
        
        // Auto-retry para errores temporales
        if (retryCount < 2 && (
          err.message?.includes('network') || 
          err.message?.includes('500') ||
          err.message?.includes('timeout')
        )) {
          addDebugInfo(`🔄 Auto-retry en 3 segundos (${retryCount + 1}/2)...`);
          setTimeout(() => {
            setRetryCount(prev => prev + 1);
            creatingPreference.current = false;
          }, 3000);
          return;
        }
        
      } finally {
        setLoading(false);
        creatingPreference.current = false;
      }
    };

    createPreference();
  }, [appointment?.id, retryCount]); // Solo depender del ID de la cita y retry count

  // Función para reintentar
  const handleRetry = () => {
    setError(null);
    setPreferenceId(null);
    setPaymentUrl(null);
    setDebugInfo('');
    setRetryCount(0);
    lastAppointmentId.current = null;
    creatingPreference.current = false;
    setLoading(true);
  };

  // Abrir pago en ventana nueva (fallback)
  const openPaymentWindow = () => {
    if (paymentUrl) {
      const newWindow = window.open(paymentUrl, '_blank', 'width=800,height=600,resizable=yes,scrollbars=yes');
      if (!newWindow) {
        alert('Por favor, permita ventanas emergentes para completar el pago.');
      }
    }
  };

  // Estado de carga
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <Spinner />
        <p className="mt-2 text-gray-600">
          {retryCount > 0 ? `Reintentando... (${retryCount}/2)` : 'Preparando pago...'}
        </p>
        {debugInfo && (
          <div className="mt-4 w-full max-w-md">
            <button 
              onClick={() => setShowDebug(!showDebug)}
              className="text-xs text-blue-600 hover:text-blue-800"
            >
              {showDebug ? 'Ocultar' : 'Ver'} detalles
            </button>
            {showDebug && (
              <pre className="mt-2 text-xs bg-gray-100 p-2 rounded max-h-40 overflow-auto">
                {debugInfo}
              </pre>
            )}
          </div>
        )}
      </div>
    );
  }

  // Estado de error
  if (error) {
    return (
      <div className="space-y-4">
        <Alert type="error">{error}</Alert>
        
        <div className="flex flex-col space-y-2">
          <button 
            onClick={handleRetry}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            🔄 Reintentar
          </button>

          {paymentUrl && (
            <button 
              onClick={openPaymentWindow}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
            >
              🌐 Abrir en Nueva Ventana
            </button>
          )}
          
          <button 
            onClick={() => setShowDebug(!showDebug)}
            className="text-xs text-gray-600 hover:text-gray-800 p-2"
          >
            {showDebug ? '📱 Ocultar' : '🔧 Ver'} información técnica
          </button>
        </div>

        {showDebug && debugInfo && (
          <div className="mt-4 border-t pt-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">📋 Información técnica:</h4>
            <pre className="text-xs bg-gray-100 p-3 rounded max-h-60 overflow-auto border">
              {debugInfo}
            </pre>
          </div>
        )}
      </div>
    );
  }

  // Renderizado principal
  return (
    <div className="space-y-4">
      {/* Información de la transacción */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-lg font-medium text-blue-800 mb-2">
          💳 Proceder al Pago
        </h3>
        <div className="text-sm text-blue-700 space-y-1">
          <p><span className="font-medium">Cita:</span> {appointment?.specialtyName || 'Consulta Médica'}</p>
          <p><span className="font-medium">Paciente:</span> {appointment?.patientName || 'No especificado'}</p>
          {appointment?.appointmentDate && (
            <p><span className="font-medium">Fecha:</span> {appointment.appointmentDate}</p>
          )}
          {appointment?.price && (
            <p><span className="font-medium">Monto:</span> S/ {appointment.price}</p>
          )}
        </div>
      </div>

      {/* Widget de Mercado Pago */}
      {preferenceId && (
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">
              🔒 Pago Seguro con Mercado Pago
            </h4>
          </div>
          
          <Wallet
            key={`wallet-${preferenceId}`} // Key única para forzar re-render limpio
            ref={walletRef}
            initialization={{ 
              preferenceId: preferenceId,
              redirectMode: 'modal' // Usar modal en lugar de redirect
            }}
            customization={{
              visual: {
                style: {
                  theme: 'default',
                  borderRadius: '8px'
                }
              },
              texts: {
                action: 'pay',
                valueProp: 'security_safety'
              }
            }}
            onReady={() => {
              console.log('✅ Mercado Pago Wallet listo');
              addDebugInfo('✅ Widget cargado correctamente');
            }}
            onError={(err) => {
              console.error('❌ Error en Wallet:', err);
              addDebugInfo(`❌ Error en widget: ${JSON.stringify(err)}`);
              
              // Manejo específico de errores del widget
              let widgetError = 'Error al cargar el widget de pago.';
              
              if (err?.message) {
                if (err.message.includes('preference')) {
                  widgetError = 'Error en la preferencia de pago. Intente nuevamente.';
                } else if (err.message.includes('network')) {
                  widgetError = 'Error de conexión. Verifique su internet.';
                }
              }
              
              setError(widgetError);
            }}
            onSubmit={(data) => {
              console.log('📝 Enviando pago a MP:', data);
              addDebugInfo(`📝 Pago enviado: ${JSON.stringify(data)}`);
              addDebugInfo('🚀 Redirigiendo a Mercado Pago...');
            }}
          />

          {/* Opciones adicionales */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row gap-2">
              {paymentUrl && (
                <button 
                  onClick={openPaymentWindow}
                  className="flex-1 px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                >
                  🌐 Abrir en ventana nueva
                </button>
              )}
              
              <button 
                onClick={() => setShowDebug(!showDebug)}
                className="flex-1 px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
              >
                {showDebug ? '📱 Ocultar debug' : '🔧 Mostrar debug'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Información de desarrollo */}
      {showDebug && (
        <div className="mt-4 space-y-2 border-t pt-4">
          <h4 className="text-sm font-medium text-gray-700">🔧 Información de desarrollo</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="text-xs bg-gray-50 p-2 rounded border">
              <strong>ID de Preferencia:</strong> 
              <br/>
              <code className="break-all">{preferenceId || 'No generado'}</code>
            </div>
            
            <div className="text-xs bg-gray-50 p-2 rounded border">
              <strong>SDK Estado:</strong> 
              <br/>
              {sdkInitialized ? '✅ Inicializado' : '❌ No inicializado'}
            </div>
            
            <div className="text-xs bg-gray-50 p-2 rounded border">
              <strong>Cita ID:</strong> 
              <br/>
              <code>{appointment?.id || 'No disponible'}</code>
            </div>
            
            {paymentUrl && (
              <div className="text-xs bg-gray-50 p-2 rounded border">
                <strong>URL Directa:</strong> 
                <br/>
                <code className="break-all text-xs">{paymentUrl}</code>
              </div>
            )}
          </div>

          {debugInfo && (
            <div className="text-xs bg-gray-50 p-2 rounded border">
              <strong>Log de Debug:</strong>
              <pre className="mt-1 max-h-32 overflow-auto whitespace-pre-wrap text-xs">
                {debugInfo}
              </pre>
            </div>
          )}
        </div>
      )}

      {/* URLs de retorno configuradas */}
      <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
        <p><strong>URLs de retorno:</strong></p>
        <p>✅ Éxito: <code>http://localhost:5173/payment/success?appointment_id={appointment?.id}</code></p>
        <p>❌ Error: <code>http://localhost:5173/payment/failure?appointment_id={appointment?.id}</code></p>
        <p>⏳ Pendiente: <code>http://localhost:5173/payment/pending?appointment_id={appointment?.id}</code></p>
      </div>

      {/* Información de seguridad */}
      <div className="text-xs text-gray-500 text-center bg-green-50 p-2 rounded border border-green-200">
        🔒 <strong>Pago seguro procesado por Mercado Pago</strong>
        <br/>
        🧪 <em>Entorno de prueba - No se realizarán cargos reales</em>
      </div>
    </div>
  );
}