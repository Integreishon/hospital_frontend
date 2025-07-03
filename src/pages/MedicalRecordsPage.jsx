import React, { useState, useEffect } from 'react';
import { Search, ClipboardList } from 'lucide-react';
import ConsultationsTab from '../components/medical/ConsultationsTab';
import { getMedicalRecordsByPatientId } from '../services/medicalService';
import { useAuth } from '../context/AuthContext';

const MedicalRecordsPage = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchRecords = async (patientId) => {
      try {
        setLoading(true);
        setError(null);
        const response = await getMedicalRecordsByPatientId(patientId);
        
        if (response && response.success) {
          setRecords(response.data || []);
        } else {
          setError(response.message || 'No se pudo cargar el historial.');
        }
      } catch (err) {
        setError(err.message || 'Ocurrió un error inesperado de red.');
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchRecords(user.id);
    } else {
      // Si no hay usuario, no es un error, simplemente no cargamos nada.
      setLoading(false);
    }
  }, [user]);

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 flex items-center">
          <ClipboardList className="w-8 h-8 mr-4 text-blue-600" />
          Historial de Consultas
        </h1>
        <p className="text-gray-500 mt-2">
          Aquí encontrarás un registro detallado de todas tus consultas médicas.
        </p>
      </header>
      
      {/* Main Content Area */}
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
        {/* Toolbar: Search and Export */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <div className="relative w-full sm:w-auto sm:flex-grow max-w-lg">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Buscar en consultas..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Consultations List */}
        <div className="mt-4">
          <ConsultationsTab records={records} loading={loading} error={error} />
        </div>
      </div>
    </div>
  );
};

export default MedicalRecordsPage; 