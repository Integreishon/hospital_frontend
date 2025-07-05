import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppointmentList from '../components/features/appointments/AppointmentList';
import AppointmentCalendar from '../components/features/appointments/AppointmentCalendar';
import appointmentService from '../services/appointmentService';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Modal from '../components/ui/Modal';
import MercadoPagoCheckout from '../components/features/payments/MercadoPagoCheckout';

// Componente para la tarjeta de cita
const AppointmentCard = ({ appointment, onPayClick }) => {
  const navigate = useNavigate();

  const getStatusColor = (status) => {
    switch (status) {
      case 'SCHEDULED': return 'bg-green-100 text-green-800 border-green-200';
      case 'PENDING_VALIDATION': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'CANCELLED': return 'bg-red-100 text-red-800 border-red-200';
      case 'COMPLETED': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card>
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
              <h4 className="text-sm font-medium text-gray-900">{appointment.specialtyName}</h4>
              <p className="text-xs text-gray-500">Dr. {appointment.doctorName}</p>
              {appointment.price && (
                <p className="text-xs text-green-600 font-medium">S/. {appointment.price}</p>
              )}
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
            {appointment.appointmentDate}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {appointment.timeBlock}
          </div>
        </div>
        <div className="mt-4 flex justify-between">
          <div className="text-xs text-gray-500">
            {appointment.location}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200 flex justify-end items-center space-x-3">
            {appointment.status === 'PENDING_VALIDATION' && (
              <Button 
                onClick={() => onPayClick(appointment)}
                className="bg-emerald-500 hover:bg-emerald-600 text-white text-sm"
                size="sm"
              >
                Pagar Ahora
              </Button>
            )}
            <Button 
              onClick={() => navigate(`/appointments/${appointment.id}`)} 
              variant="outline"
              size="sm"
              className="text-sm"
            >
              Ver detalles
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [view, setView] = useState('list'); // 'list' or 'calendar'
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // 'all', 'upcoming', 'past', 'cancelled'
  const { isAuthenticated, user } = useAuth();

  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const handlePayClick = (appointment) => {
    setSelectedAppointment(appointment);
    setPaymentModalOpen(true);
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      setIsLoading(true);
      setError(null);
      
      if (!isAuthenticated) {
        setError('Debes iniciar sesión para ver tus citas');
        setIsLoading(false);
        return;
      }
      
      try {
        // Obtener citas del paciente autenticado
        const appointmentsFromApi = await appointmentService.getMyAppointments();
        
        // Formatear las citas para la UI
        const formattedAppointments = appointmentsFromApi.map(app => ({
          id: app.id,
          doctorId: app.doctorId,
          doctorName: app.doctorName || 'Dr. Sin Asignar',
          specialtyId: app.specialtyId,
          specialtyName: app.specialtyName || 'Especialidad Sin Asignar',
          appointmentDate: app.appointmentDate,
          timeBlock: app.timeBlock,
          status: app.status,
          reason: app.reason,
          paymentStatus: app.paymentStatus,
          createdAt: app.createdAt,
          price: app.price, // Añadimos el precio si existe
          // Creamos la estructura adecuada para specialty que espera MercadoPagoCheckout
          specialty: {
            id: app.specialtyId,
            name: app.specialtyName || 'Especialidad Sin Asignar',
            consultationPrice: app.price // Usamos el precio de la cita
          }
        }));
        
        setAppointments(formattedAppointments);
      } catch (err) {
        console.error('Error al cargar citas:', err);
        setError('No se pudieron cargar tus citas. Por favor, intenta nuevamente más tarde.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppointments();
  }, [isAuthenticated]);

  // Filtrar citas según el filtro seleccionado
  const filteredAppointments = appointments.filter(appointment => {
    const status = appointment.status;
    
    if (filter === 'all') return true;
    
    if (filter === 'upcoming') {
      return status === 'SCHEDULED' || status === 'CONFIRMED' || status === 'PENDING_VALIDATION';
    }
    
    if (filter === 'past') {
      return status === 'COMPLETED';
    }
    
    if (filter === 'cancelled') {
      return status === 'CANCELLED' || status === 'NO_SHOW';
    }
    
    return true;
  });

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
        ) : error ? (
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
            <h3 className="mt-2 text-sm font-medium text-gray-900">{error}</h3>
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
        ) : filteredAppointments.length === 0 ? (
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
          <div className="p-4 grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map(app => (
                <AppointmentCard key={app.id} appointment={app} onPayClick={handlePayClick} />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500 py-12">No tienes citas con este filtro.</p>
            )}
          </div>
        ) : (
          <div className="p-4">
            <AppointmentCalendar appointments={filteredAppointments} />
          </div>
        )}
      </div>

      {selectedAppointment && (
        <Modal
          isOpen={paymentModalOpen}
          onClose={() => setPaymentModalOpen(false)}
          title={`Pagar Cita #${selectedAppointment.id}`}
        >
          <MercadoPagoCheckout
            appointment={selectedAppointment}
            onPaymentSuccess={() => {
              setPaymentModalOpen(false);
              // Podríamos refrescar la lista de citas aquí
            }}
          />
        </Modal>
      )}
    </div>
  );
};

export default AppointmentsPage; 