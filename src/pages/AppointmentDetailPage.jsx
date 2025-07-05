import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import appointmentService from '../services/appointmentService';
import { useAuth } from '../hooks/useAuth';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Spinner from '../components/ui/Spinner';

const AppointmentDetailPage = () => {
  const { id } = useParams();
  const [appointment, setAppointment] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchAppointment = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await appointmentService.getAppointmentById(id);
        setAppointment(data);
      } catch (err) {
        setError('No se pudo cargar la información de la cita. Por favor, intenta de nuevo más tarde.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchAppointment();
    }
  }, [id]);

  const getStatusInfo = (status) => {
    switch (status) {
        case 'SCHEDULED': return { text: 'Agendada', color: 'text-blue-600', bgColor: 'bg-blue-100' };
        case 'COMPLETED': return { text: 'Completada', color: 'text-green-600', bgColor: 'bg-green-100' };
        case 'CANCELLED': return { text: 'Cancelada', color: 'text-red-600', bgColor: 'bg-red-100' };
        case 'PENDING_VALIDATION': return { text: 'Pendiente de Pago', color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
        default: return { text: status, color: 'text-gray-600', bgColor: 'bg-gray-100' };
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">{error}</p>
        <Button as={Link} to="/appointments" className="mt-4">
          Volver a Mis Citas
        </Button>
      </div>
    );
  }

  if (!appointment) {
    return (
      <div className="text-center py-10">
        <p>No se encontró la cita.</p>
        <Button as={Link} to="/appointments" className="mt-4">
          Volver a Mis Citas
        </Button>
      </div>
    );
  }
  
  const statusInfo = getStatusInfo(appointment.status);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Detalles de la Cita</h1>
            <Button as={Link} to="/appointments" variant="outline">
                &larr; Volver a Mis Citas
            </Button>
        </div>
        
        <Card>
          <div className="p-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center pb-4 border-b border-gray-200">
                <div>
                    <h2 className="text-xl font-semibold text-gray-900">{appointment.specialtyName}</h2>
                    <p className="text-md text-gray-600">con Dr. {appointment.doctorName}</p>
                </div>
                <div className={`mt-3 sm:mt-0 px-3 py-1 rounded-full text-sm font-medium ${statusInfo.bgColor} ${statusInfo.color}`}>
                    {statusInfo.text}
                </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Información del Paciente</h3>
                    <div className="space-y-3">
                        <p><strong>Paciente:</strong> {user?.firstName} {user?.lastName}</p>
                        <p><strong>Email:</strong> {user?.email}</p>
                    </div>
                </div>
                <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Detalles de la Cita</h3>
                    <div className="space-y-3">
                        <p><strong>Fecha:</strong> {appointment.appointmentDate}</p>
                        <p><strong>Hora:</strong> {appointment.timeBlock}</p>
                        <p><strong>Motivo:</strong> {appointment.reason || 'No especificado'}</p>
                        <p><strong>ID de Cita:</strong> {appointment.id}</p>
                    </div>
                </div>
            </div>
            
            {appointment.status === 'PENDING_VALIDATION' && (
                <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                    <h3 className="text-lg font-semibold text-gray-800">Esta cita requiere pago</h3>
                    <p className="text-gray-600 mt-2 mb-4">Para confirmar tu cita, por favor completa el pago.</p>
                    <Button
                        onClick={() => alert('Redirigiendo a la pasarela de pago...')}
                        className="bg-green-500 hover:bg-green-600 text-white"
                    >
                        Pagar S/. {appointment.price}
                    </Button>
                </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AppointmentDetailPage; 