import { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { CheckCircleIcon, XCircleIcon, ClockIcon } from '@heroicons/react/24/solid';
import appointmentService from '../services/appointmentService';
import Spinner from '../components/ui/Spinner';
import Alert from '../components/ui/Alert';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

// Hook para obtener parámetros de la URL
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function PaymentStatusPage() {
  const { status } = useParams(); // 'success', 'failure', 'pending'
  const query = useQuery();
  const appointmentId = query.get('appointment_id');
  const paymentId = query.get('payment_id');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [appointment, setAppointment] = useState(null);

  useEffect(() => {
    if (!appointmentId) {
      setError('No se encontró un ID de cita en la URL.');
      setLoading(false);
      return;
    }

    const verifyPayment = async () => {
      try {
        setLoading(true);
        // En un futuro, aquí se podría llamar a un endpoint del backend 
        // para verificar el estado del pago y obtener los detalles de la cita.
        // Por ahora, solo obtenemos los detalles de la cita.
        const apptDetails = await appointmentService.getAppointmentById(appointmentId);
        setAppointment(apptDetails);

        // Si el estado es exitoso, podríamos invalidar cachés o recargar datos del usuario.
        if (status === 'success') {
          console.log('Pago exitoso, se podrían recargar las citas del usuario.');
        }

      } catch (err) {
        setError('No se pudo verificar el estado de la cita. Por favor, contacte a soporte.');
        console.error("Error al verificar pago:", err);
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [appointmentId, status]);

  const statusConfig = {
    success: {
      Icon: CheckCircleIcon,
      color: 'text-green-500',
      title: '¡Pago Exitoso!',
      message: 'Tu pago ha sido procesado correctamente. Hemos confirmado tu cita.',
    },
    failure: {
      Icon: XCircleIcon,
      color: 'text-red-500',
      title: 'Pago Fallido',
      message: 'Hubo un problema al procesar tu pago. Por favor, intenta de nuevo.',
    },
    pending: {
      Icon: ClockIcon,
      color: 'text-yellow-500',
      title: 'Pago Pendiente',
      message: 'Tu pago está pendiente de confirmación. Te notificaremos cuando se complete.',
    },
  };

  const currentStatus = statusConfig[status] || statusConfig.failure;

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <Spinner />
        <p className="mt-4 text-gray-700">Verificando estado del pago...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-lg text-center shadow-lg">
        <div className="p-6">
          <currentStatus.Icon className={`h-20 w-20 mx-auto ${currentStatus.color}`} />
          <h1 className="mt-4 text-3xl font-bold text-gray-800">{currentStatus.title}</h1>
          <p className="mt-2 text-gray-600">{currentStatus.message}</p>
          
          {error && <Alert type="error" className="mt-4">{error}</Alert>}

          {appointment && (
            <div className="mt-6 text-left bg-gray-50 p-4 rounded-lg border">
              <h2 className="text-lg font-semibold text-gray-700 mb-2">Detalles de la Cita</h2>
              <p><strong>ID de Cita:</strong> {appointment.id}</p>
              <p><strong>Especialidad:</strong> {appointment.specialtyName || appointment.specialty?.name}</p>
              <p><strong>Doctor:</strong> {appointment.doctorName || `${appointment.doctor?.firstName} ${appointment.doctor?.lastName}`}</p>
              <p><strong>Fecha:</strong> {new Date(appointment.appointmentDate).toLocaleDateString()}</p>
            </div>
          )}

          <div className="mt-8">
            <Link to="/my-appointments">
              <Button>
                Ir a Mis Citas
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
} 