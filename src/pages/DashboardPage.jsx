import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import appointmentService from '../services/appointmentService';

// Welcome Card Component
const WelcomeCard = ({ userName, nextAppointment }) => (
  <div className="relative overflow-hidden bg-gradient-to-r from-[#0066CC] to-[#1a85ff] rounded-2xl shadow-lg">
    <div className="absolute inset-0">
      <svg className="absolute right-0 top-0 h-full w-1/2 transform translate-x-1/3 -translate-y-1/8 text-white opacity-10" fill="none" viewBox="0 0 200 200">
        <path d="M45.5,30.2c9.1-13.4,23.1-16.4,39.9-12.1c16.8,4.3,32.6,15.9,41.7,32.2c9.1,16.3,11.3,37.3,3.2,51.8c-8.1,14.5-26.4,22.4-43.3,25.6c-16.9,3.2-32.4,1.8-43.6-6.9C32.2,112.2,25.3,96.3,23,79.1C20.7,61.9,23,43.5,32.1,30.1L45.5,30.2z" fill="currentColor" />
      </svg>
    </div>
    <div className="relative px-6 py-8 sm:px-8 sm:py-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-bold text-white sm:text-2xl">
            Bienvenido, {userName || 'Usuario'}
          </h2>
          <p className="mt-1 text-sm text-white/80">
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
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-[#0066CC] bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white focus:ring-offset-[#0066CC] transition-all duration-200"
          >
            <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Agendar Nueva Cita
          </Link>
        </div>
      </div>
    </div>
  </div>
);

// Quick Actions Component
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
      hoverColor: 'group-hover:bg-[#0055AA]',
      textColor: 'text-[#0066CC]'
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
      hoverColor: 'group-hover:bg-purple-700',
      textColor: 'text-purple-600'
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
      hoverColor: 'group-hover:bg-amber-600',
      textColor: 'text-amber-500'
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
      hoverColor: 'group-hover:bg-green-700',
      textColor: 'text-green-600'
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-semibold text-gray-900">Acciones Rápidas</h3>
          <div className="h-8 w-8 bg-[#0066CC]/10 rounded-full flex items-center justify-center">
            <svg className="h-4 w-4 text-[#0066CC]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {actions.map((action) => (
            <Link
              key={action.id}
              to={action.href}
              className="group relative rounded-xl border border-gray-200 bg-white p-5 shadow-sm flex flex-col items-center hover:border-[#0066CC]/50 hover:shadow-md transition-all duration-200"
            >
              <div className={`absolute inset-0 bg-gradient-to-br from-${action.color.split('-')[1]}-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl`}></div>
              <div className={`relative h-12 w-12 rounded-full ${action.color} text-white flex items-center justify-center mb-3 transition-all duration-300 ${action.hoverColor}`}>
                {action.icon}
              </div>
              <p className="relative text-sm font-medium text-gray-900 group-hover:text-[#0066CC] transition-colors duration-200">{action.name}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

// Appointment Card Component
const AppointmentCard = ({ appointment, onViewDetails }) => {
  const getStatusConfig = (status) => {
    switch (status) {
      case 'Agendada':
        return {
          color: 'bg-[#0066CC]/10 text-[#0066CC] border-[#0066CC]/20',
          iconBg: 'bg-[#0066CC]/10',
          iconColor: 'text-[#0066CC]',
          dot: 'bg-[#0066CC]'
        };
      case 'Pendiente':
        return {
          color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
          iconBg: 'bg-yellow-100',
          iconColor: 'text-yellow-600',
          dot: 'bg-yellow-500'
        };
      case 'Cancelada':
        return {
          color: 'bg-red-100 text-red-800 border-red-200',
          iconBg: 'bg-red-100',
          iconColor: 'text-red-600',
          dot: 'bg-red-500'
        };
      case 'Completada':
        return {
          color: 'bg-green-100 text-green-800 border-green-200',
          iconBg: 'bg-green-100',
          iconColor: 'text-green-600',
          dot: 'bg-green-500'
        };
      default:
        return {
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          iconBg: 'bg-gray-100',
          iconColor: 'text-gray-600',
          dot: 'bg-gray-500'
        };
    }
  };

  const statusConfig = getStatusConfig(appointment.status);
  const navigate = useNavigate();

  const handleViewDetails = () => {
    onViewDetails(appointment.id);
    // Si se necesita navegar a una página de detalles específica
    // navigate(`/appointments/${appointment.id}`);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group">
      <div className="p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className={`h-10 w-10 rounded-full flex items-center justify-center ${statusConfig.iconBg} ${statusConfig.iconColor} transition-all duration-200 group-hover:scale-110`}>
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="ml-4">
              <h4 className="text-sm font-medium text-gray-900">{appointment.specialty}</h4>
              <p className="text-xs text-gray-500">Dr. {appointment.doctor}</p>
            </div>
          </div>
          <div className="flex items-center">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig.color}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${statusConfig.dot} mr-1.5 animate-pulse`}></span>
              {appointment.status}
            </span>
          </div>
        </div>
        
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="flex items-center text-sm text-gray-500">
            <svg className="h-4 w-4 mr-1.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{appointment.date}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <svg className="h-4 w-4 mr-1.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{appointment.time}</span>
          </div>
        </div>
        
        <div className="mt-4 flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center text-xs text-gray-500">
            <svg className="h-3.5 w-3.5 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {appointment.location}
          </div>
          <button 
            onClick={handleViewDetails} 
            className="inline-flex items-center text-sm font-medium text-[#0066CC] hover:text-[#0055AA] transition-colors duration-200 group"
          >
            Ver detalles
            <svg className="h-4 w-4 ml-1 transform transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

// Upcoming Appointments Component
const UpcomingAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const appointmentsFromApi = await appointmentService.getMyAppointments();
        
        if (!Array.isArray(appointmentsFromApi)) {
          console.error("La respuesta de la API no es un array:", appointmentsFromApi);
          throw new Error("Formato de respuesta inesperado del servidor.");
        }

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
        
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const upcomingAppointments = formattedAppointments.filter(appointment => {
          const appointmentDate = new Date(appointment.date);
          appointmentDate.setHours(0, 0, 0, 0);
          
          const isUpcoming = appointmentDate >= today;
          const isActiveStatus = ['Agendada', 'Pendiente'].includes(appointment.status);
          
          return isUpcoming && isActiveStatus;
        })
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .slice(0, 2); // Mostrar solo 2 citas
        
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
    // navigate(`/appointments/${id}`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Próximas Citas</h3>
            <p className="text-sm text-gray-500">Tus citas médicas programadas</p>
          </div>
          <Link 
            to="/appointments" 
            className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-[#0066CC] border border-[#0066CC]/30 rounded-lg hover:bg-[#0066CC]/5 transition-colors duration-200"
          >
            Ver todas
            <svg className="ml-1.5 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="relative">
              <div className="h-12 w-12 rounded-full border-t-2 border-b-2 border-[#0066CC] animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-6 w-6 rounded-full bg-white"></div>
              </div>
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-10 bg-gray-50 rounded-xl">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">{error}</h3>
            <div className="mt-6">
              <Link
                to="/appointments/new"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#0066CC] hover:bg-[#0055AA] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0066CC] transition-colors duration-200"
              >
                <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Nueva Cita
              </Link>
            </div>
          </div>
        ) : appointments.length === 0 ? (
          <div className="text-center py-10 bg-gray-50 rounded-xl">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No tienes próximas citas</h3>
            <p className="mt-1 text-sm text-gray-500">Agenda una nueva cita para cuidar tu salud.</p>
            <div className="mt-6">
              <Link
                to="/appointments/new"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#0066CC] hover:bg-[#0055AA] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0066CC] transition-colors duration-200"
              >
                <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Agendar Cita
              </Link>
            </div>
          </div>
        ) : (
          <div className="mt-5 space-y-5">
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

// Main Dashboard Component
function DashboardPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [nextAppointment, setNextAppointment] = useState(null);
  const [patientName, setPatientName] = useState('Usuario');

  useEffect(() => {
    // Función para cargar datos del paciente si es necesario
    const loadPatientData = async () => {
      if (user?.role === 'PATIENT') {
        try {
          // Intentar obtener datos adicionales del paciente si no están ya disponibles
          if (!user.patientData && !user.firstName) {
            const userService = await import('../services/userService').then(m => m.default);
            const patientData = await userService.getCurrentPatient();
            
            if (patientData) {
              // Construir nombre completo del paciente
              let completeName = 'Usuario';
              
              if (patientData.firstName && patientData.lastName) {
                completeName = `${patientData.firstName} ${patientData.lastName}`;
              } else if (patientData.fullName) {
                completeName = patientData.fullName;
              } else if (user.nombre && user.apellidoPaterno) {
                completeName = `${user.nombre} ${user.apellidoPaterno}`;
              }
              
              setPatientName(completeName);
              return;
            }
          }
        } catch (error) {
          console.error("❌ Error cargando datos del paciente:", error);
        }
      }
      
      // Si no pudimos cargar datos adicionales o hubo un error, usar lo que tengamos
      let nameFallback = 'Usuario';
      
      // Si tenemos nombre/apellido del login
      if (user?.nombre && user?.apellidoPaterno) {
        nameFallback = `${user.nombre} ${user.apellidoPaterno}`;
      }
      // Nueva forma: usando campos directos del usuario enriquecido
      else if (user?.firstName && user?.lastName) {
        nameFallback = `${user.firstName} ${user.lastName}`;
      } else if (user?.fullName) {
        nameFallback = user.fullName;
      } 
      // Usando campo patientData que se carga desde el servicio
      else if (user?.patientData) {
        if (user.patientData.firstName && user.patientData.lastName) {
          nameFallback = `${user.patientData.firstName} ${user.patientData.lastName}`;
        } else if (user.patientData.fullName) {
          nameFallback = user.patientData.fullName;
        }
      }
      
      setPatientName(nameFallback);
    };
    
    loadPatientData();
  }, [user]);

  useEffect(() => {
    const fetchNextAppointment = async () => {
      try {
        const appointments = await appointmentService.getMyAppointments();
        
        if (Array.isArray(appointments) && appointments.length > 0) {
          // Filter and sort upcoming appointments
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
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="relative">
          <div className="h-16 w-16 rounded-full border-4 border-gray-200 border-t-[#0066CC] animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-8 w-8 rounded-full bg-white"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <WelcomeCard userName={patientName} nextAppointment={nextAppointment} />
      <QuickActions />
      <UpcomingAppointments />
    </div>
  );
}

// Make sure to export the component as default
export default DashboardPage;