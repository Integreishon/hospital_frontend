import { Link } from 'react-router-dom';
import AppointmentStatus from './AppointmentStatus';

export default function AppointmentCard({ appointment }) {
  // Formatear fecha
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  // Formatear bloque de tiempo
  const getTimeBlockLabel = (timeBlock) => {
    const blockLabels = {
      'MORNING': 'Mañana (7:00 - 13:00)',
      'AFTERNOON': 'Tarde (16:00 - 20:00)',
      'FULL_DAY': 'Día completo (7:00 - 20:00)'
    };
    return blockLabels[timeBlock] || timeBlock;
  };

  // Obtener icono según especialidad
  const getSpecialtyIcon = (specialtyName) => {
    if (!specialtyName) return '🏥';
    
    const specialtyIcons = {
      'cardiología': '❤️',
      'dermatología': '🧴',
      'neurología': '🧠',
      'ortopedia': '🦴',
      'pediatría': '👶',
      'oftalmología': '👁️',
      'odontología': '🦷',
      'ginecología': '♀️',
      'general': '👨‍⚕️'
  };

    const normalizedName = specialtyName.toLowerCase();
    for (const [key, value] of Object.entries(specialtyIcons)) {
      if (normalizedName.includes(key)) {
        return value;
      }
    }
    
    return '🏥';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
      {/* Encabezado con estado */}
      <div className="bg-gray-50 px-5 py-3 border-b border-gray-100 flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-2xl mr-3">
            {getSpecialtyIcon(appointment.specialtyName)}
          </span>
          <h3 className="font-semibold text-gray-800">{appointment.specialtyName}</h3>
        </div>
        <AppointmentStatus status={appointment.status} />
      </div>
      
      {/* Contenido */}
      <div className="p-5">
        {/* Información del doctor */}
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-500 mr-3">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <p className="font-medium text-gray-800">{appointment.doctorName}</p>
            <p className="text-sm text-gray-500">Médico asignado</p>
          </div>
        </div>
        
        {/* Fecha y hora */}
        <div className="flex flex-col space-y-2 mb-4">
          <div className="flex items-center text-gray-600">
            <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-sm">{formatDate(appointment.appointmentDate)}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm">{getTimeBlockLabel(appointment.timeBlock)}</span>
          </div>
        </div>
        
        {/* Motivo */}
        {appointment.reason && (
          <div className="mb-4">
            <h4 className="text-xs uppercase tracking-wider text-gray-500 font-medium mb-1">Motivo de la consulta</h4>
            <p className="text-sm text-gray-600 line-clamp-2">{appointment.reason}</p>
          </div>
        )}
        
        {/* Precio y estado de pago */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          {appointment.price && (
            <div className="text-gray-800 font-medium">
              S/. {appointment.price.toFixed(2)}
              <span className={`ml-2 text-xs px-2 py-1 rounded-full ${
                appointment.paymentStatus === 'COMPLETED' 
                  ? 'bg-emerald-100 text-emerald-800' 
                  : appointment.paymentStatus === 'PROCESSING'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {appointment.paymentStatus === 'COMPLETED' ? 'Pagado' : 
                 appointment.paymentStatus === 'PROCESSING' ? 'En proceso' : 'Pendiente'}
              </span>
            </div>
          )}
          
          <Link 
            to={`/appointments/${appointment.id}`} 
            className="text-sm font-medium text-emerald-600 hover:text-emerald-700 flex items-center"
          >
            Ver detalle
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
} 