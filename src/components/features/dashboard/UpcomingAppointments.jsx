import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../../ui/Spinner';
import Button from '../../ui/Button';

const UpcomingAppointments = () => {
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      setAppointments([
        { id: 1, doctor: 'Dr. Ana García', specialty: 'Medicina General', date: '2025-07-02', time: '10:30' },
        { id: 2, doctor: 'Dr. Carlos Mendoza', specialty: 'Cardiología', date: '2025-07-15', time: '15:00' },
      ]);
      setLoading(false);
    }, 1500);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Tus próximas atenciones</h2>
        <Link to="/appointments" className="text-sm font-semibold text-emerald-600 hover:text-emerald-700">
          Ver todas
        </Link>
      </div>
      
      {appointments.length === 0 ? (
        <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">No tienes citas programadas</h3>
          <p className="mt-1 text-sm text-gray-500">¡Tu agenda está libre!</p>
          <div className="mt-6">
            <Link to="/appointments/new">
              <Button>Agendar una cita</Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {appointments.map(app => (
            <div key={app.id} className="bg-white rounded-2xl p-4 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center">
                <div className="bg-emerald-100 text-emerald-700 rounded-lg p-3 mr-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{app.specialty}</p>
                  <p className="text-sm text-gray-600">
                    {new Date(app.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })} - {app.time}
                  </p>
              </div>
              </div>
              <Link to={`/appointments/${app.id}`} className="text-sm font-medium text-emerald-600 hover:text-emerald-700">
                Ver detalle
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UpcomingAppointments; 