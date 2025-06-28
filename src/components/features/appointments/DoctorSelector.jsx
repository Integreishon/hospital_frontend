import { useState, useEffect } from 'react';
import doctorService from '../../../services/doctorService';
import Spinner from '../../ui/Spinner';

export default function DoctorSelector({ specialtyId, onSelect, selectedDoctor }) {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!specialtyId) {
      setDoctors([]);
      return;
    }

    const fetchDoctors = async () => {
      try {
    setLoading(true);
        const doctorsData = await doctorService.getDoctorsBySpecialty(specialtyId);
        setDoctors(doctorsData.map(doctor => ({
          id: doctor.id,
          name: doctor.firstName && doctor.lastName 
            ? `Dr. ${doctor.firstName} ${doctor.lastName}`
            : 'Sin nombre',
          specialties: doctor.specialties || []
        })));
        setError(null);
      } catch (err) {
        console.error('Error fetching doctors:', err);
        setError('No se pudieron cargar los médicos. Por favor, intente nuevamente.');
        setDoctors([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [specialtyId]);

  const filteredDoctors = searchTerm
    ? doctors.filter(doctor =>
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : doctors;

  if (!specialtyId) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm text-center text-gray-500">
        Por favor, seleccione una especialidad primero
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

  if (error) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
        </div>
      </div>
    );
  }

  if (doctors.length === 0) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm text-center text-gray-500 py-8">
        No hay médicos disponibles para esta especialidad
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h3 className="text-xl font-semibold mb-4">Seleccione un médico</h3>
      
      {/* Buscador de médicos */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar médico..."
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
      
      <div className="space-y-4">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor) => (
          <div
            key={doctor.id}
            onClick={() => onSelect(doctor.id)}
              className={`cursor-pointer transition-all duration-200 ${
              selectedDoctor === doctor.id
                  ? 'bg-emerald-50 border-emerald-500 border-2 shadow-md'
                  : 'bg-white border border-gray-200 hover:border-emerald-300 hover:shadow-md'
              } rounded-xl p-4`}
          >
            <div className="flex items-center">
                <div className="flex-shrink-0">
                  {doctor.image ? (
                    <img 
                      src={doctor.image} 
                      alt={doctor.name} 
                      className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-500">
                      <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
                  )}
                </div>
                <div className="ml-4 flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-lg text-gray-800">{doctor.name}</h4>
                  </div>
                  {doctor.specialties && doctor.specialties.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {doctor.specialties.map((specialty, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800"
                        >
                          {specialty.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 py-4">
            No se encontraron médicos que coincidan con la búsqueda
          </div>
        )}
      </div>
    </div>
  );
} 