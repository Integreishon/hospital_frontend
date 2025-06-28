import React from 'react';
import Badge from '../../ui/Badge';

const AppointmentStatus = ({ status }) => {
  // Configuración de estilos según el estado
  const statusConfig = {
    'SCHEDULED': {
      label: 'Programada',
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-800',
        icon: (
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
      )
      },
    'CONFIRMED': {
      label: 'Confirmada',
      bgColor: 'bg-emerald-100',
      textColor: 'text-emerald-800',
        icon: (
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
      )
      },
    'IN_CONSULTATION': {
      label: 'En consulta',
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-800',
        icon: (
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
      )
      },
    'COMPLETED': {
      label: 'Completada',
      bgColor: 'bg-green-100',
      textColor: 'text-green-800',
        icon: (
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
      )
      },
    'CANCELLED': {
      label: 'Cancelada',
      bgColor: 'bg-red-100',
      textColor: 'text-red-800',
        icon: (
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
      )
    },
    'NO_SHOW': {
      label: 'No asistió',
      bgColor: 'bg-gray-100',
      textColor: 'text-gray-800',
      icon: (
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  };

  // Configuración por defecto si no se encuentra el estado
  const defaultConfig = {
    label: status || 'Desconocido',
    bgColor: 'bg-gray-100',
    textColor: 'text-gray-800',
    icon: (
      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  };

  // Obtener la configuración según el estado o usar la configuración por defecto
  const config = statusConfig[status] || defaultConfig;

  return (
    <div className={`flex items-center px-3 py-1 rounded-full text-xs font-medium ${config.bgColor} ${config.textColor}`}>
      {config.icon}
      {config.label}
    </div>
  );
};

export default AppointmentStatus; 