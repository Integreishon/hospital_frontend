import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import appointmentService from '../../services/appointmentService';

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);

  const appointmentId = searchParams.get('appointment_id');
  const paymentId = searchParams.get('payment_id');
  const status = searchParams.get('status');

  useEffect(() => {
    const loadAppointmentDetails = async () => {
      if (appointmentId) {
        try {
          const appointmentData = await appointmentService.getAppointmentById(appointmentId);
          setAppointment(appointmentData);
        } catch (error) {
          console.error('Error loading appointment:', error);
        }
      }
      setLoading(false);
    };

    loadAppointmentDetails();
  }, [appointmentId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl rounded-lg sm:px-10">
          <div className="text-center">
            <CheckCircleIcon className="mx-auto h-24 w-24 text-green-600" />
            <h2 className="mt-4 text-3xl font-extrabold text-gray-900">
              ¡Pago Exitoso!
            </h2>
            <p className="mt-2 text-lg text-gray-600">
              Tu pago ha sido procesado correctamente
            </p>
          </div>

          <div className="mt-8 space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="text-lg font-medium text-green-800 mb-2">
                ✅ Detalles del Pago
              </h3>
              <div className="text-sm text-green-700 space-y-1">
                {paymentId && <p><span className="font-medium">ID de Pago:</span> {paymentId}</p>}
                {status && <p><span className="font-medium">Estado:</span> {status}</p>}
                {appointmentId && <p><span className="font-medium">Cita ID:</span> {appointmentId}</p>}
              </div>
            </div>

            {appointment && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="text-lg font-medium text-blue-800 mb-2">
                  📅 Información de la Cita
                </h3>
                <div className="text-sm text-blue-700 space-y-1">
                  <p><span className="font-medium">Especialidad:</span> {appointment.specialtyName}</p>
                  <p><span className="font-medium">Fecha:</span> {appointment.appointmentDate}</p>
                  <p><span className="font-medium">Estado:</span> {appointment.status}</p>
                  {appointment.price && (
                    <p><span className="font-medium">Monto Pagado:</span> S/ {appointment.price}</p>
                  )}
                </div>
              </div>
            )}

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="text-lg font-medium text-yellow-800 mb-2">
                📧 Próximos Pasos
              </h3>
              <div className="text-sm text-yellow-700 space-y-1">
                <p>• Recibirás un email de confirmación</p>
                <p>• Tu cita ha sido confirmada</p>
                <p>• Puedes ver los detalles en tu panel de citas</p>
                <p>• Recuerda llegar 15 minutos antes</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button
                onClick={() => navigate('/appointments')}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
              >
                Ver Mis Citas
              </button>
              <button
                onClick={() => navigate('/dashboard')}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
              >
                Ir al Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}