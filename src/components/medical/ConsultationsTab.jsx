import React, { useState } from 'react';
import MedicalRecordCard from './MedicalRecordCard';
import { Loader, AlertTriangle } from 'lucide-react';
import MedicalRecordDetailModal from './MedicalRecordDetailModal';

const ConsultationsTab = ({ records, loading, error }) => {
  const [selectedRecord, setSelectedRecord] = useState(null);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-10">
        <Loader className="animate-spin h-8 w-8 text-blue-600" />
        <p className="ml-4 text-gray-600">Cargando historial...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-10 bg-red-50 text-red-700 rounded-lg">
        <AlertTriangle className="h-8 w-8 mb-2" />
        <p className="font-semibold">Error al cargar el historial</p>
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        {records && records.length > 0 ? (
          records.map((record) => (
            <MedicalRecordCard 
              key={record.id} 
              record={record} 
              onViewDetails={() => setSelectedRecord(record)}
            />
          ))
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-800">No hay consultas registradas</h3>
            <p className="mt-1 text-sm text-gray-500">
              Las consultas médicas aparecerán aquí una vez sean registradas por un doctor.
            </p>
          </div>
        )}
      </div>
      
      <MedicalRecordDetailModal 
        record={selectedRecord}
        onClose={() => setSelectedRecord(null)}
      />
    </>
  );
};

export default ConsultationsTab; 