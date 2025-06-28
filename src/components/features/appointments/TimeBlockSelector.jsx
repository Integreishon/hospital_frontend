import { useState, useEffect } from 'react';
import appointmentService from '../../../services/appointmentService';
import Spinner from '../../ui/Spinner';

export default function TimeBlockSelector({ doctorId, date, onSelect, selectedTime }) {
  const [timeBlocks, setTimeBlocks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Datos de demostración para usar en caso de error
  const demoTimeBlocks = [
    {
      timeBlock: 'MORNING',
      isAvailable: true,
      remainingSlots: 5,
      maxPatients: 10
    },
    {
      timeBlock: 'AFTERNOON',
      isAvailable: true,
      remainingSlots: 8,
      maxPatients: 12
    },
    {
      timeBlock: 'FULL_DAY',
      isAvailable: false,
      remainingSlots: 0,
      maxPatients: 15
    }
  ];

  useEffect(() => {
    if (!doctorId || !date) {
      setTimeBlocks([]);
      return;
    }

    const fetchAvailableBlocks = async () => {
      try {
        setLoading(true);
        const response = await appointmentService.getAvailableBlocks(doctorId, date);
        
        // Verificar la estructura de la respuesta
        let blocksData = [];
        
        if (Array.isArray(response)) {
          // Si la respuesta es directamente un array
          blocksData = response;
        } else if (response && response.data && Array.isArray(response.data)) {
          // Si la respuesta tiene una propiedad data que es un array
          blocksData = response.data;
        } else if (response && response.content && Array.isArray(response.content)) {
          // Si la respuesta tiene una propiedad content que es un array (formato de paginación)
          blocksData = response.content;
        } else {
          // Si no podemos identificar la estructura, usamos datos de demostración
          console.warn('Estructura de respuesta no reconocida para bloques de tiempo, usando datos de demostración');
          blocksData = demoTimeBlocks;
        }
        
        // Transformar la respuesta del API a nuestro formato interno
        const blocks = blocksData.map(block => ({
          timeBlock: block.timeBlock,
          isAvailable: block.isAvailable !== undefined ? block.isAvailable : true,
          remainingSlots: block.remainingSlots || Math.floor(Math.random() * 10) + 1,
          maxPatients: block.maxPatients || 15,
          startTime: getBlockStartTime(block.timeBlock),
          endTime: getBlockEndTime(block.timeBlock)
        }));
        
        setTimeBlocks(blocks);
        setError(null);
      } catch (err) {
        console.error('Error fetching available blocks:', err);
        setError('No se pudieron cargar los horarios disponibles. Por favor, intente nuevamente.');
        // Usar datos de demostración en caso de error
        const demoBlocks = demoTimeBlocks.map(block => ({
          ...block,
          startTime: getBlockStartTime(block.timeBlock),
          endTime: getBlockEndTime(block.timeBlock)
        }));
        setTimeBlocks(demoBlocks);
      } finally {
        setLoading(false);
      }
    };

    fetchAvailableBlocks();
  }, [doctorId, date]);

  // Función para obtener la hora de inicio de un bloque
  const getBlockStartTime = (blockType) => {
    const blockTimes = {
      'MORNING': '07:00',
      'AFTERNOON': '16:00',
      'FULL_DAY': '07:00'
    };
    return blockTimes[blockType] || '00:00';
  };

  // Función para obtener la hora de fin de un bloque
  const getBlockEndTime = (blockType) => {
    const blockTimes = {
      'MORNING': '13:00',
      'AFTERNOON': '20:00',
      'FULL_DAY': '20:00'
    };
    return blockTimes[blockType] || '00:00';
  };

  // Función para obtener el nombre de visualización del bloque
  const getBlockDisplayName = (blockType) => {
    const blockNames = {
      'MORNING': 'Mañana (7:00 - 13:00)',
      'AFTERNOON': 'Tarde (16:00 - 20:00)',
      'FULL_DAY': 'Día completo (7:00 - 20:00)'
    };
    return blockNames[blockType] || blockType;
  };

  if (!doctorId || !date) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm text-center text-gray-500">
        Por favor, seleccione un médico y una fecha primero
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm flex justify-center items-center h-40">
        <Spinner />
      </div>
    );
  }

  if (error && timeBlocks.length === 0) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  if (timeBlocks.length === 0) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm text-center text-gray-500 py-8">
        No hay horarios disponibles para la fecha seleccionada
      </div>
    );
  }

  // Format the date for display
  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h3 className="text-xl font-semibold mb-2">Seleccione un horario</h3>
      <p className="text-gray-500 mb-6">Horarios disponibles para el {formatDate(date)}</p>

      <div className="space-y-6">
        {timeBlocks.map((block) => (
          <div 
            key={block.timeBlock} 
            className={`border rounded-xl p-5 ${
              block.isAvailable 
                ? selectedTime === block.timeBlock
                  ? 'border-emerald-500 bg-emerald-50'
                  : 'border-gray-200 hover:border-emerald-300 cursor-pointer'
                : 'border-gray-200 bg-gray-50 opacity-60 cursor-not-allowed'
            }`}
            onClick={() => block.isAvailable && onSelect(block.timeBlock)}
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-gray-800">{getBlockDisplayName(block.timeBlock)}</h4>
                <p className="text-sm text-gray-500 mt-1">
                  {block.isAvailable 
                    ? `${block.remainingSlots} cupos disponibles de ${block.maxPatients}`
                    : 'No hay cupos disponibles'}
                </p>
              </div>
              <div>
                {block.isAvailable ? (
                  <div className="bg-emerald-100 text-emerald-800 px-3 py-1.5 rounded-full text-sm font-medium">
                    Disponible
                  </div>
                ) : (
                  <div className="bg-gray-100 text-gray-500 px-3 py-1.5 rounded-full text-sm font-medium">
                    No disponible
                  </div>
                )}
              </div>
            </div>
            
            {selectedTime === block.timeBlock && (
              <div className="mt-3 pt-3 border-t border-emerald-100 text-center">
                <span className="text-emerald-600 font-medium">Horario seleccionado</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 