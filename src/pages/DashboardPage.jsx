import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import appointmentService from '../services/appointmentService';
import Button from '../components/ui/Button';

// Componentes del Dashboard
const WelcomeCard = ({ user, nextAppointment }) => {
  return (
    <div className="relative overflow-hidden bg-[#0066CC] rounded-2xl shadow-lg">
      <div className="absolute inset-0">
        <svg className="absolute right-0 top-0 h-full w-1/2 transform translate-x-1/3 -translate-y-1/8 text-[#0066CC] opacity-20" fill="none" viewBox="0 0 200 200">
          <path d="M45.5,30.2c9.1-13.4,23.1-16.4,39.9-12.1c16.8,4.3,32.6,15.9,41.7,32.2c9.1,16.3,11.3,37.3,3.2,51.8c-8.1,14.5-26.4,22.4-43.3,25.6c-16.9,3.2-32.4,1.8-43.6-6.9C32.2,112.2,25.3,96.3,23,79.1C20.7,61.9,23,43.5,32.1,30.1L45.5,30.2z" fill="currentColor" />
        </svg>
      </div>
      <div className="relative px-6 py-8 sm:px-8 sm:py-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-bold text-white sm:text-2xl">
              Bienvenido{user?.gender === 'F' ? 'a' : 'o'}, {user?.name || 'Usuario'}
            </h2>
            <p className="mt-1 text-sm text-[#E6F3FF]">
              {nextAppointment ? (
                <>Tu próxima cita está programada para el <span className="font-semibold">{nextAppointment.date}</span></>
              ) : (
                'No tienes citas programadas próximamente'
              )}
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link
              to="/appointments/new"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-[#0066CC] bg-white hover:bg-[#E6F3FF] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0066CC] focus:ring-offset-[#0066CC]"
            >
              Agendar Nueva Cita
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente para la tarjeta de cita - EXACTO al del módulo de citas que SÍ funciona
const AppointmentCard = ({ appointment, onViewDetails }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Agendada':
        return 'bg-[#0066CC]/10 text-[#0066CC] border-[#0066CC]/20';
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
              appointment.status === 'Agendada' ? 'bg-[#0066CC]/10 text-[#0066CC]' : 
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

const QuickActions = () => {
  const actions = [
    {
      id: 1,
      name: 'Agendar Cita',
      href: '/appointments/new',
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      ),
      color: 'bg-[#0066CC]',
    },
    {
      id: 2,
      name: 'Ver Resultados',
      href: '/medical/results',
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      color: 'bg-purple-600',
    },
    {
      id: 3,
      name: 'Realizar Pago',
      href: '/payment/new',
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
      color: 'bg-amber-500',
    },
    {
      id: 4,
      name: 'Contactar Médico',
      href: '/chat',
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      ),
      color: 'bg-green-600',
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900">Acciones Rápidas</h3>
        <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {actions.map((action) => (
            <Link
              key={action.id}
              to={action.href}
              className="relative rounded-lg border border-gray-200 bg-white p-4 shadow-sm flex flex-col items-center hover:border-[#0066CC]/50 hover:shadow-md transition-all duration-200"
            >
              <div className={`h-12 w-12 rounded-full ${action.color} text-white flex items-center justify-center`}>
                {action.icon}
              </div>
              <p className="mt-3 text-sm font-medium text-gray-900">{action.name}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

// ESTA ES LA FUNCIÓN EXACTA QUE FUNCIONA EN AppointmentsPage
const UpcomingAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // EXACTAMENTE la misma llamada que funciona en AppointmentsPage
        const appointmentsFromApi = await appointmentService.getMyAppointments();
        
        // Verificamos si la respuesta es un array antes de mapear para evitar errores.
        if (!Array.isArray(appointmentsFromApi)) {
          console.error("La respuesta de la API no es un array:", appointmentsFromApi);
          throw new Error("Formato de respuesta inesperado del servidor.");
        }

        // EXACTAMENTE el mismo formateo que funciona en AppointmentsPage
        const formattedAppointments = appointmentsFromApi.map(app => {
          let statusText = 'Desconocido';
          switch (app.status) {
            case 'SCHEDULED':
              statusText = 'Agendada';
              break;
            case 'COMPLETED':
              statusText = 'Completada';
              break;
            case 'CANCELLED':
              statusText = 'Cancelada';
              break;
            case 'PENDING_VALIDATION':
              statusText = 'Pendiente';
              break;
            case 'IN_PROGRESS':
              statusText = 'En Progreso';
              break;
            case 'NO_SHOW':
              statusText = 'No Asistió';
              break;
          }

          return {
            id: app.id,
            specialty: app.specialtyName,
            doctor: app.doctorName,
            date: app.appointmentDate,
            time: app.timeBlock,
            status: statusText,
            location: 'Consultorio Médico'
          };
        });
        
        // Filtrar solo las próximas citas (futuras y activas)
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const upcomingAppointments = formattedAppointments.filter(appointment => {
          const appointmentDate = new Date(appointment.date);
          appointmentDate.setHours(0, 0, 0, 0);
          
          // Solo citas futuras con estados activos
          const isUpcoming = appointmentDate >= today;
          const isActiveStatus = ['Agendada', 'Pendiente'].includes(appointment.status);
          
          return isUpcoming && isActiveStatus;
        })
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .slice(0, 3); // Solo las primeras 3
        
        setAppointments(upcomingAppointments);
      } catch (err) {
        console.error('Error fetching appointments:', err);
        setError('No se pudieron cargar las citas. Intente de nuevo más tarde.');
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

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Próximas Citas</h3>
          <Link to="/appointments" className="text-sm font-medium text-[#0066CC] hover:text-[#0066CC]/80">
            Ver todas
          </Link>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#0066CC]"></div>
          </div>
        ) : error ? (
          <div className="text-center py-8">
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
            <div className="mt-4">
              <Link
                to="/appointments/new"
                className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#0066CC] hover:bg-[#0066CC]/90"
              >
                Nueva Cita
              </Link>
            </div>
          </div>
        ) : appointments.length === 0 ? (
          <div className="text-center py-8">
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
            <h3 className="mt-2 text-sm font-medium text-gray-900">No tienes próximas citas</h3>
            <p className="mt-1 text-sm text-gray-500">Agenda una nueva cita para cuidar tu salud.</p>
            <div className="mt-4">
              <Link
                to="/appointments/new"
                className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#0066CC] hover:bg-[#0066CC]/90"
              >
                Agendar Cita
              </Link>
            </div>
          </div>
        ) : (
          <div className="mt-4 space-y-4">
            {appointments.map(appointment => (
              <AppointmentCard 
                key={appointment.id} 
                appointment={appointment} 
                onViewDetails={handleViewDetails} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const DashboardPage = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [nextAppointment, setNextAppointment] = useState(null);

  // Cargar próxima cita para mostrar en la tarjeta de bienvenida
  useEffect(() => {
    const fetchNextAppointment = async () => {
      try {
        const appointments = await appointmentService.getMyAppointments();
        
        if (Array.isArray(appointments) && appointments.length > 0) {
          // Filtrar y ordenar citas futuras
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          
          const upcomingAppointments = appointments
            .filter(app => {
              const appointmentDate = new Date(app.appointmentDate);
              appointmentDate.setHours(0, 0, 0, 0);
              
              return (
                (app.status === 'SCHEDULED' || 
                 app.status === 'CONFIRMED' || 
                 app.status === 'PENDING_VALIDATION') &&
                appointmentDate >= today
              );
            })
            .sort((a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate));
          
          if (upcomingAppointments.length > 0) {
            const nextApp = upcomingAppointments[0];
            const formatTimeBlock = (timeBlock) => {
              if (timeBlock === 'MORNING') return 'en la mañana';
              if (timeBlock === 'AFTERNOON') return 'en la tarde';
              if (timeBlock === 'EVENING') return 'en la noche';
              return timeBlock ? `en ${timeBlock}` : '';
            };

            setNextAppointment({
              date: new Date(nextApp.appointmentDate).toLocaleDateString('es-ES', { 
                day: 'numeric', 
                month: 'long', 
                year: 'numeric' 
              }) + ' ' + formatTimeBlock(nextApp.timeBlock),
              time: nextApp.timeBlock,
              doctor: nextApp.doctorName,
              specialty: nextApp.specialtyName
            });
          }
        }
      } catch (error) {
        console.error('Error fetching next appointment:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNextAppointment();
  }, []);

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0066CC]"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="space-y-6">
        {/* Welcome Card */}
        <WelcomeCard user={user} nextAppointment={nextAppointment} />
        
        <div className="grid grid-cols-1 gap-6">
          {/* Quick Actions */}
          <QuickActions />
        </div>
        
        {/* Upcoming Appointments */}
        <UpcomingAppointments />
      </div>
    </div>
  );
};

export default DashboardPage;