import React from 'react';

const MedicalRecordsPage = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Mi Historial Médico</h1>
          <p className="mt-2 text-sm text-gray-500">
            Accede a tu historial médico completo y resultados de estudios.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="text-center py-12">
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
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No hay registros médicos disponibles</h3>
            <p className="mt-1 text-sm text-gray-500">
              Tu historial médico aparecerá aquí después de tu primera consulta.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalRecordsPage; 