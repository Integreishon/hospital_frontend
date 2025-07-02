import React from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Link } from 'react-router-dom';

const AppointmentList = ({ appointments }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'SCHEDULED':
        return 'bg-blue-50 text-blue-700 ring-blue-600/20';
      case 'CONFIRMED':
        return 'bg-green-50 text-green-700 ring-green-600/20';
      case 'COMPLETED':
        return 'bg-gray-50 text-gray-600 ring-gray-500/10';
      case 'CANCELLED':
        return 'bg-red-50 text-red-700 ring-red-600/10';
      case 'NO_SHOW':
        return 'bg-yellow-50 text-yellow-700 ring-yellow-600/20';
      case 'PENDING_VALIDATION':
        return 'bg-purple-50 text-purple-700 ring-purple-600/20';
      case 'IN_PROGRESS':
        return 'bg-indigo-50 text-indigo-700 ring-indigo-600/20';
      default:
        return 'bg-gray-50 text-gray-600 ring-gray-500/10';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'SCHEDULED':
        return 'Programada';
      case 'CONFIRMED':
        return 'Confirmada';
      case 'COMPLETED':
        return 'Completada';
      case 'CANCELLED':
        return 'Cancelada';
      case 'NO_SHOW':
        return 'No Asistió';
      case 'PENDING_VALIDATION':
        return 'Pendiente';
      case 'IN_PROGRESS':
        return 'En Curso';
      default:
        return status || 'Desconocido';
    }
  };

  const getTimeBlockText = (timeBlock) => {
    switch (timeBlock) {
      case 'MORNING':
        return 'Mañana (8:00 - 12:00)';
      case 'AFTERNOON':
        return 'Tarde (14:00 - 18:00)';
      case 'EVENING':
        return 'Noche (18:00 - 22:00)';
      default:
        return timeBlock || 'Horario no especificado';
    }
  };

  const formatDate = (dateStr) => {
    try {
      if (!dateStr) return 'Fecha no disponible';
      
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return 'Fecha inválida';
      
      return format(date, "EEEE d 'de' MMMM, yyyy", { locale: es });
    } catch (error) {
      console.error('Error al formatear fecha:', error);
      return 'Error en formato de fecha';
    }
  };

  if (!appointments || appointments.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No hay citas para mostrar</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      <ul role="list" className="divide-y divide-gray-100">
        {appointments.map((appointment) => (
          <li
            key={appointment.id}
            className="relative flex justify-between gap-x-6 py-5 hover:bg-gray-50 transition-colors"
          >
            <div className="flex min-w-0 gap-x-4">
              <div className="h-12 w-12 flex-none rounded-full bg-emerald-50 flex items-center justify-center">
                <svg className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  <Link to={`/appointments/${appointment.id}`} className="hover:underline">
                    {appointment.doctorName || 'Doctor no asignado'}
                  </Link>
                </p>
                <p className="mt-1 flex text-xs leading-5 text-gray-500">
                  <span className="truncate">{appointment.specialtyName || 'Especialidad no especificada'}</span>
                </p>
                {appointment.reason && (
                  <p className="mt-1 text-xs leading-5 text-gray-500 truncate">
                    Motivo: {appointment.reason}
                  </p>
                )}
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-x-4">
              <div className="hidden sm:flex sm:flex-col sm:items-end">
                <p className="text-sm leading-6 text-gray-900">
                  {formatDate(appointment.appointmentDate)}
                </p>
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  {getTimeBlockText(appointment.timeBlock)}
                </p>
              </div>
              <div className="flex flex-col items-end">
                <p
                  className={`rounded-md whitespace-nowrap mt-0.5 px-2 py-1 text-xs font-medium ring-1 ring-inset ${getStatusColor(
                    appointment.status
                  )}`}
                >
                  {getStatusText(appointment.status)}
                </p>
                {appointment.paymentStatus && (
                  <p className={`mt-1 text-xs leading-5 rounded-md px-2 py-0.5 ${
                    appointment.paymentStatus === 'COMPLETED' 
                      ? 'text-green-700 bg-green-50' 
                      : 'text-yellow-700 bg-yellow-50'
                  }`}>
                    {appointment.paymentStatus === 'COMPLETED' ? 'Pago completado' : 'Pago pendiente'}
                  </p>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AppointmentList; 