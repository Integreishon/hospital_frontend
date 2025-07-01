import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import appointmentService from '../services/appointmentService';
import Spinner from '../components/ui/Spinner';
import Alert from '../components/ui/Alert';
import Button from '../components/ui/Button';

// Componentes del Dashboard
const WelcomeCard = ({ user }) => {
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
              Tu próxima cita está programada para el <span className="font-semibold">12 de julio, 2023</span>
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



const AppointmentCard = ({ appointment }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
      <div className="p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className={`h-10 w-10 rounded-full flex items-center justify-center ${appointment.status === 'Confirmada' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="ml-4">
              <h4 className="text-sm font-medium text-gray-900">{appointment.specialty}</h4>
              <p className="text-xs text-gray-500">Dr. {appointment.doctor}</p>
            </div>
          </div>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            appointment.status === 'Confirmada' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-yellow-100 text-yellow-800'
          }`}>
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
        <div className="mt-4 flex justify-end">
          <Link to={`/appointments/${appointment.id}`} className="text-sm font-medium text-[#0066CC] hover:text-[#0066CC]/80">
            Ver detalles
          </Link>
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

const UpcomingAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getStatusInSpanish = (status) => {
    switch (status) {
      case 'SCHEDULED': return 'Agendada';
      case 'CONFIRMED': return 'Confirmada';
      case 'CANCELLED': return 'Cancelada';
      case 'COMPLETED': return 'Completada';
      default: return status;
    }
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        const data = await appointmentService.getMyAppointments();
        
        const formattedAppointments = data.map(app => ({
          id: app.id,
          specialty: app.specialtyName || 'No especificada',
          doctor: app.doctorName || 'Médico no asignado',
          date: new Date(app.appointmentDate).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' }),
          time: app.timeBlock,
          status: getStatusInSpanish(app.status),
          rawStatus: app.status,
          rawDate: app.appointmentDate,
        }));

        const upcoming = formattedAppointments
          .filter(app => 
            (app.rawStatus === 'SCHEDULED' || app.rawStatus === 'CONFIRMED') &&
            new Date(app.rawDate) >= new Date()
          )
          .sort((a, b) => new Date(a.rawDate) - new Date(b.rawDate))
          .slice(0, 3);

        setAppointments(upcoming);
      } catch (err) {
        console.error("Error fetching upcoming appointments:", err);
        setError('No se pudieron cargar las próximas citas.');
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Próximas Citas</h3>
          <Link to="/appointments" className="text-sm font-medium text-[#0066CC] hover:text-[#0066CC]/80">
            Ver todas
          </Link>
        </div>

        {loading && <div className="flex justify-center p-8"><Spinner /></div>}
        
        {error && !loading && <Alert type="error">{error}</Alert>}

        {!loading && !error && appointments.length === 0 && (
          <div className="text-center text-gray-500 py-6">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No tienes próximas citas</h3>
            <p className="mt-1 text-sm text-gray-500">¡Agenda una nueva cita para empezar!</p>
            <div className="mt-6">
                <Button onClick={() => window.location.href='/appointments/new'} variant="primary">
                  Agendar Cita
                </Button>
            </div>
          </div>
        )}

        {!loading && !error && appointments.length > 0 && (
          <div className="mt-4 space-y-4">
            {appointments.map((appointment) => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const DoctorCard = ({ doctor }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden flex items-center p-4">
      <img
        src={doctor.image}
        alt={doctor.name}
        className="h-16 w-16 rounded-full object-cover"
      />
      <div className="ml-4">
        <h4 className="text-sm font-medium text-gray-900">Dr. {doctor.name}</h4>
        <p className="text-xs text-gray-500">{doctor.specialty}</p>
        <div className="mt-2 flex items-center">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`h-3 w-3 ${i < doctor.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <p className="ml-1 text-xs text-gray-500">{doctor.rating}/5</p>
        </div>
      </div>
      <div className="ml-auto">
        <Link
          to={`/appointments/new?doctor=${doctor.id}`}
          className="inline-flex items-center px-3 py-1.5 border border-[#0066CC] text-xs font-medium rounded-full text-[#0066CC] bg-white hover:bg-[#E6F3FF] focus:outline-none"
        >
          Agendar
        </Link>
      </div>
    </div>
  );
};

const TopDoctors = () => {
  const doctors = [
    {
      id: 1,
      name: 'Carlos Mendoza',
      specialty: 'Urología',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80',
    },
    {
      id: 2,
      name: 'Ana Sánchez',
      specialty: 'Urología Oncológica',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80',
    },
    {
      id: 3,
      name: 'Miguel Torres',
      specialty: 'Endourología',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80',
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Médicos Destacados</h3>
          <Link to="/catalog/doctors" className="text-sm font-medium text-[#0066CC] hover:text-[#0066CC]/80">
            Ver todos
          </Link>
        </div>
        <div className="mt-5 space-y-4">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      </div>
    </div>
  );
};

const DashboardPage = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  // Simulación de carga de datos
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
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
        <WelcomeCard user={user} />
        
    
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Quick Actions */}
          <QuickActions />
          
          {/* Top Doctors */}
          {/* <TopDoctors /> */}
        </div>
        
        {/* Upcoming Appointments */}
        <UpcomingAppointments />
      </div>
    </div>
  );
};

export default DashboardPage; 