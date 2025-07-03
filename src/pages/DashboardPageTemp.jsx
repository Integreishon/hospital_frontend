import React from 'react';
import { useAuth } from '../hooks/useAuth';

function DashboardPageTemp() {
  const { user } = useAuth();

  return (
    <div className="p-6">
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900">Dashboard Temporal</h3>
        <p className="mt-2 text-gray-600">
          Esta es una versión temporal del dashboard para resolver problemas de exportación.
        </p>
        <p className="mt-2 text-gray-600">
          Usuario: {user?.name || 'No autenticado'}
        </p>
      </div>
    </div>
  );
}

export default DashboardPageTemp; 