import { useState, useEffect } from 'react';
import appointmentService from '../../../services/appointmentService';
import Spinner from '../../ui/Spinner';

export default function AppointmentCalendar({ doctorId, onSelectDateTime, selectedDate, selectedTimeBlock }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [availableDates, setAvailableDates] = useState([]);
  const [selectedDateObj, setSelectedDateObj] = useState(null);
  const [currentWeekDates, setCurrentWeekDates] = useState([]);
  const [currentWeekStart, setCurrentWeekStart] = useState(new Date());
  const [availableBlocks, setAvailableBlocks] = useState({});

  // Inicializar la fecha seleccionada si se proporciona
  useEffect(() => {
    if (selectedDate) {
      setSelectedDateObj(new Date(selectedDate));
    }
  }, [selectedDate]);

  // Generar las fechas de la semana actual
  useEffect(() => {
    const dates = [];
    const startDate = new Date(currentWeekStart);
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      dates.push(date);
    }
    
    setCurrentWeekDates(dates);
  }, [currentWeekStart]);

  // Cargar disponibilidad para las fechas de la semana actual
  useEffect(() => {
    if (!doctorId || currentWeekDates.length === 0) return;

    const fetchAvailability = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const blocksMap = {};
        
        // Obtener disponibilidad para cada fecha de la semana
        for (const date of currentWeekDates) {
          const dateStr = date.toISOString().split('T')[0];
          try {
            const response = await appointmentService.getAvailableBlocks(doctorId, dateStr);
            
            // La respuesta del servicio ya debería ser el array de bloques.
            if (Array.isArray(response)) {
              blocksMap[dateStr] = response;
            } else {
                // Si la estructura no es un array, es un error o una respuesta inesperada.
                console.error(`Respuesta inesperada para la disponibilidad en ${dateStr}:`, response);
                // Asignamos un array vacío para que los bloques se muestren como no disponibles.
                blocksMap[dateStr] = [];
            }
            
            // Agregar esta fecha a las fechas disponibles si hay al menos un bloque disponible
            if (blocksMap[dateStr].some(block => block.isAvailable)) {
              setAvailableDates(prev => [...prev, dateStr]);
            }
          } catch (err) {
            console.error(`Error al obtener disponibilidad para ${dateStr}:`, err);
            // En caso de error en la llamada para una fecha específica, no hay bloques disponibles para esa fecha.
            blocksMap[dateStr] = [];
          }
        }
        
        setAvailableBlocks(blocksMap);
      } catch (err) {
        console.error('Error general al obtener disponibilidad:', err);
        setError('No se pudo cargar la disponibilidad. Por favor, intente nuevamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchAvailability();
  }, [doctorId, currentWeekDates]);
    
  // Navegar a la semana anterior
  const goToPreviousWeek = () => {
    const prevWeek = new Date(currentWeekStart);
    prevWeek.setDate(currentWeekStart.getDate() - 7);
    setCurrentWeekStart(prevWeek);
  };

  // Navegar a la semana siguiente
  const goToNextWeek = () => {
    const nextWeek = new Date(currentWeekStart);
    nextWeek.setDate(currentWeekStart.getDate() + 7);
    setCurrentWeekStart(nextWeek);
  };

  // Seleccionar una fecha y bloque de tiempo
  const handleSelectDateTime = (date, timeBlock) => {
    setSelectedDateObj(date);
    const dateStr = date.toISOString().split('T')[0];
    onSelectDateTime(dateStr, timeBlock);
  };
    
  // Formatear nombre del día
  const formatDayName = (date) => {
    const today = new Date();
    if (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    ) {
      return 'Hoy';
    }
    
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    if (
      date.getDate() === tomorrow.getDate() &&
      date.getMonth() === tomorrow.getMonth() &&
      date.getFullYear() === tomorrow.getFullYear()
    ) {
      return 'Mañana';
    }
    
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    return days[date.getDay()];
  };

  // Verificar si una fecha es seleccionable (tiene al menos un bloque disponible)
  const isDateSelectable = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    const blocks = availableBlocks[dateStr] || [];
    return blocks.some(block => block.isAvailable);
  };

  // Verificar si un bloque de tiempo está disponible para una fecha
  const isBlockAvailable = (date, blockType) => {
    const dateStr = date.toISOString().split('T')[0];
    const blocks = availableBlocks[dateStr] || [];
    const block = blocks.find(b => b.timeBlock === blockType);
    return block && block.isAvailable;
  };
  
  // Verificar si una fecha y bloque están seleccionados
  const isSelected = (date, blockType) => {
    if (!selectedDateObj) return false;
    
    const isSameDate = 
      date.getDate() === selectedDateObj.getDate() &&
      date.getMonth() === selectedDateObj.getMonth() &&
      date.getFullYear() === selectedDateObj.getFullYear();
    
    return isSameDate && selectedTimeBlock === blockType;
  };
  
  // Obtener el nombre del bloque para mostrar
  const getBlockDisplayName = (blockType) => {
    const blockNames = {
      'MORNING': 'Mañana',
      'AFTERNOON': 'Tarde',
      'FULL_DAY': 'Todo el día'
    };
    return blockNames[blockType] || blockType;
  };
  
  // Verificar si una fecha es anterior a hoy
  const isPastDate = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };
  
  if (loading && Object.keys(availableBlocks).length === 0) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm flex justify-center items-center h-40">
        <Spinner />
      </div>
    );
  }

  if (error && Object.keys(availableBlocks).length === 0) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h3 className="text-xl font-semibold mb-4">Fecha y hora</h3>
      
      {/* Filtros de fecha */}
      <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
        <button 
          className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 whitespace-nowrap"
          onClick={() => {
            const today = new Date();
            setCurrentWeekStart(today);
          }}
        >
          Esta semana
        </button>
        <button 
          className="px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 hover:bg-indigo-200 whitespace-nowrap"
          onClick={() => {
            const nextMonth = new Date();
            nextMonth.setDate(nextMonth.getDate() + 30);
            setCurrentWeekStart(nextMonth);
          }}
        >
          Este mes
        </button>
        <button 
          className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 whitespace-nowrap"
          onClick={() => {
            const nextMonth = new Date();
            nextMonth.setDate(nextMonth.getDate() + 60);
            setCurrentWeekStart(nextMonth);
          }}
        >
          Próximo mes
        </button>
      </div>
      
      {/* Navegación de semanas */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={goToPreviousWeek}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </button>
        <span className="font-medium">
          {currentWeekDates.length > 0 && `${currentWeekDates[0].toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}`}
        </span>
          <button
          onClick={goToNextWeek}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      
      {/* Calendario */}
      <div className="grid grid-cols-4 gap-4">
        {currentWeekDates.map((date, index) => {
          const isSelectable = isDateSelectable(date) && !isPastDate(date);
          const dateStr = date.toISOString().split('T')[0];
          const morningAvailable = isBlockAvailable(date, 'MORNING');
          const afternoonAvailable = isBlockAvailable(date, 'AFTERNOON');
          
          return (
            <div
              key={dateStr} 
              className={`border rounded-lg overflow-hidden ${
                isSelectable 
                  ? 'border-gray-200' 
                  : 'border-gray-100 bg-gray-50 opacity-60'
              }`}
            >
              <div className="bg-gray-50 p-3 text-center">
                <div className="font-medium">{formatDayName(date)}</div>
                <div className="text-gray-500 text-sm">{date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })}</div>
              </div>
              
              <div className="p-3 space-y-3">
                {/* Turno mañana */}
                <div 
                  className={`p-2 rounded-md text-center ${
                    isPastDate(date)
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : morningAvailable
                        ? isSelected(date, 'MORNING')
                          ? 'bg-emerald-100 text-emerald-700 border border-emerald-300'
                          : 'bg-white border border-gray-200 hover:border-emerald-300 cursor-pointer'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                  onClick={() => {
                    if (morningAvailable && !isPastDate(date)) {
                      handleSelectDateTime(date, 'MORNING');
                    }
                  }}
                >
                  <div className="text-sm font-medium">
                    {getBlockDisplayName('MORNING')}
                  </div>
                  <div className="text-xs text-gray-500">
                    07:00 - 13:00
                  </div>
                </div>
                
                {/* Turno tarde */}
                <div 
                  className={`p-2 rounded-md text-center ${
                    isPastDate(date)
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : afternoonAvailable
                        ? isSelected(date, 'AFTERNOON')
                          ? 'bg-emerald-100 text-emerald-700 border border-emerald-300'
                          : 'bg-white border border-gray-200 hover:border-emerald-300 cursor-pointer'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                  onClick={() => {
                    if (afternoonAvailable && !isPastDate(date)) {
                      handleSelectDateTime(date, 'AFTERNOON');
                    }
                  }}
                >
                  <div className="text-sm font-medium">
                    {getBlockDisplayName('AFTERNOON')}
                  </div>
                  <div className="text-xs text-gray-500">
                    16:00 - 20:00
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
} 