import { useState, useEffect } from 'react';
import specialtyService from '../../../services/specialtyService';
import Spinner from '../../ui/Spinner';

// Iconos para especialidades (se pueden personalizar según las especialidades reales)
const specialtyIcons = {
  'Cardiología': '❤️',
  'Dermatología': '🧴',
  'Neurología': '🧠',
  'Ortopedia': '🦴',
  'Pediatría': '👶',
  'Oftalmología': '👁️',
  'Odontología': '🦷',
  'Ginecología': '♀️',
  'Medicina General': '👨‍⚕️',
  'Psiquiatría': '🧠',
  'Urología': '🚽',
  'Otorrinolaringología': '👂',
  'default': '🏥'
};

export default function SpecialtySelector({ onSelect, selectedSpecialty }) {
  const [specialties, setSpecialties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Datos de demostración para usar en caso de error
  const demoSpecialties = [
    {
      id: 1,
      name: 'Medicina General',
      description: 'Consulta médica general para diagnóstico y tratamiento de enfermedades comunes',
      consultationPrice: 80.00,
      discountPercentage: 0,
      finalPrice: 80.00
    },
    {
      id: 2,
      name: 'Cardiología',
      description: 'Especialidad médica que se ocupa del diagnóstico y tratamiento de las enfermedades del corazón',
      consultationPrice: 150.00,
      discountPercentage: 10,
      finalPrice: 135.00
    },
    {
      id: 3,
      name: 'Dermatología',
      description: 'Especialidad médica encargada del estudio de la piel, su estructura, función y enfermedades',
      consultationPrice: 120.00,
      discountPercentage: 5,
      finalPrice: 114.00
    },
    {
      id: 4,
      name: 'Pediatría',
      description: 'Especialidad médica que estudia al niño y sus enfermedades',
      consultationPrice: 100.00,
      discountPercentage: 0,
      finalPrice: 100.00
    },
    {
      id: 5,
      name: 'Oftalmología',
      description: 'Especialidad médica que estudia las enfermedades del ojo y su tratamiento',
      consultationPrice: 130.00,
      discountPercentage: 0,
      finalPrice: 130.00
    }
  ];

  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        setLoading(true);
        const response = await specialtyService.getAllActiveSpecialties();
        
        // Verificar la estructura de la respuesta
        let specialtiesData = [];
        
        if (Array.isArray(response)) {
          // Si la respuesta es directamente un array
          specialtiesData = response;
        } else if (response && response.data && Array.isArray(response.data)) {
          // Si la respuesta tiene una propiedad data que es un array
          specialtiesData = response.data;
        } else if (response && response.content && Array.isArray(response.content)) {
          // Si la respuesta tiene una propiedad content que es un array (formato de paginación)
          specialtiesData = response.content;
        } else {
          // Si no podemos identificar la estructura, usamos datos de demostración
          console.warn('Estructura de respuesta no reconocida, usando datos de demostración para especialidades');
          specialtiesData = demoSpecialties;
        }
        
        setSpecialties(specialtiesData.map(specialty => ({
          id: specialty.id,
          name: specialty.name || 'Especialidad sin nombre',
          description: specialty.description || 'Consulta médica especializada',
          consultationPrice: specialty.consultationPrice || 0,
          discountPercentage: specialty.discountPercentage || 0,
          finalPrice: specialty.finalPrice || specialty.consultationPrice || 0
        })));
        setError(null);
      } catch (err) {
        console.error('Error fetching specialties:', err);
        setError('No se pudieron cargar las especialidades. Por favor, intente nuevamente.');
        // Usar datos de demostración en caso de error
        setSpecialties(demoSpecialties);
      } finally {
        setLoading(false);
      }
    };

    fetchSpecialties();
  }, []);

  const getSpecialtyIcon = (specialtyName) => {
    // Buscar el icono correspondiente o usar el default
    const normalizedName = specialtyName.toLowerCase();
    const iconKey = Object.keys(specialtyIcons).find(key => 
      normalizedName.includes(key.toLowerCase())
    );
    
    return iconKey ? specialtyIcons[iconKey] : specialtyIcons.default;
  };

  const filteredSpecialties = searchTerm 
    ? specialties.filter(specialty => 
        specialty.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : specialties;

  // Formatear precio para mostrar
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN'
    }).format(price);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Spinner />
      </div>
    );
  }

  if (error && specialties.length === 0) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h3 className="text-xl font-semibold mb-4">Seleccione una especialidad</h3>
      
      {/* Buscador de especialidades */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar especialidad..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
          <div className="absolute left-3 top-2.5 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSpecialties.length > 0 ? (
          filteredSpecialties.map((specialty) => (
            <div
              key={specialty.id}
              onClick={() => onSelect(specialty.id)}
              className={`cursor-pointer transition-all duration-200 ${
                selectedSpecialty === specialty.id
                  ? 'bg-emerald-50 border-emerald-500 border-2 shadow-md'
                  : 'bg-white border border-gray-200 hover:border-emerald-300 hover:shadow-md'
              } rounded-xl p-4`}
            >
              <div className="flex items-center mb-3">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <div className="text-xl">
                    {getSpecialtyIcon(specialty.name)}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">{specialty.name}</h4>
                  <p className="text-xs text-gray-500 line-clamp-2">{specialty.description}</p>
                </div>
              </div>
              
              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs text-gray-500">Precio:</span>
                    <div className="font-semibold text-gray-800">
                      {formatPrice(specialty.finalPrice)}
                    </div>
                  </div>
                  
                  {specialty.discountPercentage > 0 && (
                    <div className="text-right">
                      <span className="text-xs text-gray-500">Antes:</span>
                      <div className="line-through text-sm text-gray-400">
                        {formatPrice(specialty.consultationPrice)}
                      </div>
                      <div className="bg-red-100 text-red-700 px-2 py-0.5 rounded-full text-xs font-medium mt-1">
                        -{specialty.discountPercentage}%
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-8 text-gray-500">
            No se encontraron especialidades que coincidan con su búsqueda.
          </div>
        )}
      </div>
    </div>
  );
} 