import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ClockIcon } from '@heroicons/react/24/solid';

export default function PaymentPending() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const appointmentId = searchParams.get('appointment_id');
  const paymentId = searchParams.get('payment_id');
  const status = searchParams.get('status');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl rounded-lg sm:px-10">
          <div className="text-center">
            <ClockIcon className="mx-auto h-24 w-24 text-yellow-600" />
            <h2 className="mt-4 text-3xl font-extrabold text-gray-900">
              Pago Pendiente
            </h2>
            <p className="mt-2 text-lg text-gray-600">
              Tu pago está siendo procesado
            </p>
          </div>

          <div className="mt-8 space-y-4">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="text-lg font-medium text-yellow-800 mb-2">
                ⏳ Estado del Pago
              </h3>
              <div className="text-sm text-yellow-700 space-y-1">
                <p>Tu pago está siendo verificado por Mercado Pago.</p>
                {paymentId && <p><span className="font-medium">ID de Pago:</span> {paymentId}</p>}
                {status && <p><span className="font-medium">Estado:</span> {status}</p>}
                {appointmentId && <p><span className="font-medium">Cita ID:</span> {appointmentId}</p>}
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="text-lg font-medium text-blue-800 mb-2">
                📋 Próximos Pasos
              </h3>
              <div className="text-sm text-blue-700 space-y-1">
                <p>• El procesamiento puede tardar hasta 2 días hábiles</p>
                <p>• Recibirás una notificación cuando se confirme</p>
                <p>• Tu cita quedará reservada temporalmente</p>
                <p>• Puedes revisar el estado en tu panel</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button
                onClick={() => navigate('/appointments')}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
              >
                Ver Mis Citas
              </button>
              <button
                onClick={() => navigate('/dashboard')}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
              >
                Ir al Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}