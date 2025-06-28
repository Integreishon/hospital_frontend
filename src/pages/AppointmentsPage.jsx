import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AppointmentList from '../components/features/appointments/AppointmentList';
import AppointmentCalendar from '../components/features/appointments/AppointmentCalendar';
import * as appointmentService from '../services/appointmentService';

// Componente para la tarjeta de cita
const AppointmentCard = ({ appointment, onViewDetails }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmada':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Pendiente':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Cancelada':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Completada':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
              appointment.status === 'Confirmada' ? 'bg-[#0066CC]/10 text-[#0066CC]' : 
              appointment.status === 'Pendiente' ? 'bg-yellow-100 text-yellow-600' : 
              appointment.status === 'Cancelada' ? 'bg-red-100 text-red-600' : 
              'bg-blue-100 text-blue-600'
            }`}>
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="ml-4">
              <h4 className="text-sm font-medium text-gray-900">{appointment.specialty}</h4>
              <p className="text-xs text-gray-500">Dr. {appointment.doctor}</p>
            </div>
          </div>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
            {appointment.status}
          </span>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-500">
            <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {appointment.date}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {appointment.time}
          </div>
        </div>
        <div className="mt-4 flex justify-between">
          <div className="text-xs text-gray-500">
            {appointment.location}
          </div>
          <button 
            onClick={() => onViewDetails(appointment.id)} 
            className="text-sm font-medium text-[#0066CC] hover:text-[#0066CC]/80"
          >
            Ver detalles
          </button>
        </div>
      </div>
    </div>
  );
};

const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [view, setView] = useState('list'); // 'list' or 'calendar'
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all', 'upcoming', 'past', 'cancelled'

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        // Para desarrollo, usamos datos de ejemplo
        const response = await appointmentService.getDemoAppointments();
        setAppointments(response.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const handleViewDetails = (id) => {
    console.log(`Ver detalles de la cita ${id}`);
    // Aquí iría la navegación a la página de detalles
  };

  const filteredAppointments = appointments.filter(appointment => {
    if (filter === 'all') return true;
    if (filter === 'upcoming') return ['Confirmada', 'Pendiente'].includes(appointment.status);
    if (filter === 'past') return appointment.status === 'Completada';
    if (filter === 'cancelled') return appointment.status === 'Cancelada';
    return true;
  });

  // Datos de ejemplo para mostrar en la interfaz
  const mockAppointments = [
    {
      id: 1,
      specialty: 'Urología',
      doctor: 'Juan Pérez',
      date: '12 Jul 2023',
      time: '10:30 AM',
      status: 'Confirmada',
      location: 'Consultorio 302'
    },
    {
      id: 2,
      specialty: 'Laboratorio',
      doctor: 'María López',
      date: '15 Jul 2023',
      time: '09:00 AM',
      status: 'Pendiente',
      location: 'Laboratorio Central'
    },
    {
      id: 3,
      specialty: 'Urología',
      doctor: 'Juan Pérez',
      date: '22 Jul 2023',
      time: '11:00 AM',
      status: 'Confirmada',
      location: 'Consultorio 302'
    },
    {
      id: 4,
      specialty: 'Urología',
      doctor: 'Carlos Mendoza',
      date: '05 Jun 2023',
      time: '09:30 AM',
      status: 'Completada',
      location: 'Consultorio 301'
    },
    {
      id: 5,
      specialty: 'Laboratorio',
      doctor: 'Ana Sánchez',
      date: '10 Jun 2023',
      time: '08:00 AM',
      status: 'Cancelada',
      location: 'Laboratorio Central'
    }
  ];

  return (
    <div className="p-6">
      {/* Filters and Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div className="flex space-x-2 mb-4 sm:mb-0">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 text-sm font-medium rounded-md ${
              filter === 'all' 
                ? 'bg-[#0066CC] text-white' 
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Todas
          </button>
          <button
            onClick={() => setFilter('upcoming')}
            className={`px-3 py-1.5 text-sm font-medium rounded-md ${
              filter === 'upcoming' 
                ? 'bg-[#0066CC] text-white' 
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Próximas
          </button>
          <button
            onClick={() => setFilter('past')}
            className={`px-3 py-1.5 text-sm font-medium rounded-md ${
              filter === 'past' 
                ? 'bg-[#0066CC] text-white' 
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Pasadas
          </button>
          <button
            onClick={() => setFilter('cancelled')}
            className={`px-3 py-1.5 text-sm font-medium rounded-md ${
              filter === 'cancelled' 
                ? 'bg-[#0066CC] text-white' 
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Canceladas
          </button>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="flex rounded-md shadow-sm">
            <button
              type="button"
              onClick={() => setView('list')}
              className={`relative inline-flex items-center px-3 py-1.5 rounded-l-md border text-sm font-medium ${
                view === 'list'
                  ? 'bg-[#0066CC]/10 text-[#0066CC] border-[#0066CC] z-10'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
              Lista
            </button>
            <button
              type="button"
              onClick={() => setView('calendar')}
              className={`relative -ml-px inline-flex items-center px-3 py-1.5 rounded-r-md border text-sm font-medium ${
                view === 'calendar'
                  ? 'bg-[#0066CC]/10 text-[#0066CC] border-[#0066CC] z-10'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Calendario
            </button>
          </div>
          
          <Link
            to="/appointments/new"
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#0066CC] hover:bg-[#0066CC]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0066CC]"
          >
            <svg className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Nueva Cita
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#0066CC]"></div>
          </div>
        ) : mockAppointments.length === 0 ? (
          <div className="text-center py-16">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No tienes citas programadas</h3>
            <p className="mt-1 text-sm text-gray-500">Comienza agendando tu primera cita médica.</p>
            <div className="mt-6">
              <Link
                to="/appointments/new"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#0066CC] hover:bg-[#0066CC]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0066CC]"
              >
                <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Nueva Cita
              </Link>
            </div>
          </div>
        ) : view === 'list' ? (
          <div className="p-6">
            <div className="space-y-4">
              {mockAppointments
                .filter(appointment => {
                  if (filter === 'all') return true;
                  if (filter === 'upcoming') return ['Confirmada', 'Pendiente'].includes(appointment.status);
                  if (filter === 'past') return appointment.status === 'Completada';
                  if (filter === 'cancelled') return appointment.status === 'Cancelada';
                  return true;
                })
                .map(appointment => (
                  <AppointmentCard 
                    key={appointment.id} 
                    appointment={appointment} 
                    onViewDetails={handleViewDetails} 
                  />
                ))
              }
            </div>
          </div>
        ) : (
          <div className="p-6">
            <AppointmentCalendar appointments={mockAppointments} />
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentsPage; 