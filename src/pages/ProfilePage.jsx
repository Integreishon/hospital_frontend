import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

const ProfilePage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para guardar los cambios
    setIsEditing(false);
  };

  return (
    <div className="p-6">
      {/* Profile Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex items-center">
          <div className="h-20 w-20 rounded-full bg-[#0066CC]/10 flex items-center justify-center">
            <span className="text-[#0066CC] font-bold text-2xl">
              {user?.name?.charAt(0) || 'U'}
            </span>
          </div>
          <div className="ml-5">
            <h2 className="text-xl font-bold text-gray-900">{user?.name || 'Usuario'}</h2>
            <p className="text-sm text-gray-500">{user?.email || 'usuario@ejemplo.com'}</p>
          </div>
        </div>
        <div className="mt-4 md:mt-0">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm ${
              isEditing 
                ? 'text-white bg-gray-600 hover:bg-gray-700' 
                : 'text-white bg-[#0066CC] hover:bg-[#0066CC]/90'
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0066CC]`}
          >
            {isEditing ? 'Cancelar' : 'Editar Perfil'}
          </button>
        </div>
      </div>

      {/* Profile Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('personal')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'personal'
                ? 'border-[#0066CC] text-[#0066CC]'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Información Personal
          </button>
          <button
            onClick={() => setActiveTab('medical')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'medical'
                ? 'border-[#0066CC] text-[#0066CC]'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Historial Médico
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'settings'
                ? 'border-[#0066CC] text-[#0066CC]'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Configuración
          </button>
        </nav>
      </div>

      {/* Profile Content */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {activeTab === 'personal' && (
          <div className="p-6">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                    Nombre
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      defaultValue={user?.firstName || ''}
                      disabled={!isEditing}
                      className={`shadow-sm focus:ring-[#0066CC] focus:border-[#0066CC] block w-full sm:text-sm border-gray-300 rounded-md ${!isEditing && 'bg-gray-50'}`}
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                    Apellidos
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      defaultValue={user?.lastName || ''}
                      disabled={!isEditing}
                      className={`shadow-sm focus:ring-[#0066CC] focus:border-[#0066CC] block w-full sm:text-sm border-gray-300 rounded-md ${!isEditing && 'bg-gray-50'}`}
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <div className="mt-1">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      defaultValue={user?.email || ''}
                      disabled
                      className="bg-gray-50 shadow-sm focus:ring-[#0066CC] focus:border-[#0066CC] block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Teléfono
                  </label>
                  <div className="mt-1">
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      defaultValue={user?.phone || ''}
                      disabled={!isEditing}
                      className={`shadow-sm focus:ring-[#0066CC] focus:border-[#0066CC] block w-full sm:text-sm border-gray-300 rounded-md ${!isEditing && 'bg-gray-50'}`}
                    />
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    Dirección
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="address"
                      id="address"
                      defaultValue={user?.address || ''}
                      disabled={!isEditing}
                      className={`shadow-sm focus:ring-[#0066CC] focus:border-[#0066CC] block w-full sm:text-sm border-gray-300 rounded-md ${!isEditing && 'bg-gray-50'}`}
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                    Ciudad
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="city"
                      id="city"
                      defaultValue={user?.city || ''}
                      disabled={!isEditing}
                      className={`shadow-sm focus:ring-[#0066CC] focus:border-[#0066CC] block w-full sm:text-sm border-gray-300 rounded-md ${!isEditing && 'bg-gray-50'}`}
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                    Departamento
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="state"
                      id="state"
                      defaultValue={user?.state || ''}
                      disabled={!isEditing}
                      className={`shadow-sm focus:ring-[#0066CC] focus:border-[#0066CC] block w-full sm:text-sm border-gray-300 rounded-md ${!isEditing && 'bg-gray-50'}`}
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
                    Código Postal
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="zipCode"
                      id="zipCode"
                      defaultValue={user?.zipCode || ''}
                      disabled={!isEditing}
                      className={`shadow-sm focus:ring-[#0066CC] focus:border-[#0066CC] block w-full sm:text-sm border-gray-300 rounded-md ${!isEditing && 'bg-gray-50'}`}
                    />
                  </div>
                </div>
              </div>

              {isEditing && (
                <div className="mt-6 flex justify-end">
                  <button
                    type="submit"
                    className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#0066CC] hover:bg-[#0066CC]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0066CC]"
                  >
                    Guardar Cambios
                  </button>
                </div>
              )}
            </form>
          </div>
        )}

        {activeTab === 'medical' && (
          <div className="p-6">
            <div className="border-b border-gray-200 pb-5">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Historial Médico</h3>
              <p className="mt-2 max-w-4xl text-sm text-gray-500">
                Información sobre tu historial médico y condiciones de salud.
              </p>
            </div>

            <div className="mt-6">
              <dl className="divide-y divide-gray-200">
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-gray-500">Tipo de Sangre</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">O+</dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-gray-500">Alergias</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">Ninguna</dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-gray-500">Medicación Actual</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">Ninguna</dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-gray-500">Condiciones Preexistentes</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">Ninguna</dd>
                </div>
              </dl>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="p-6">
            <div className="border-b border-gray-200 pb-5">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Configuración</h3>
              <p className="mt-2 max-w-4xl text-sm text-gray-500">
                Administra tus preferencias y configuración de la cuenta.
              </p>
            </div>

            <div className="mt-6">
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Notificaciones</h4>
                  <div className="mt-4 space-y-4">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="email_notifications"
                          name="email_notifications"
                          type="checkbox"
                          defaultChecked={true}
                          className="focus:ring-[#0066CC] h-4 w-4 text-[#0066CC] border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="email_notifications" className="font-medium text-gray-700">
                          Notificaciones por Email
                        </label>
                        <p className="text-gray-500">Recibe recordatorios de citas y actualizaciones importantes.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="sms_notifications"
                          name="sms_notifications"
                          type="checkbox"
                          defaultChecked={false}
                          className="focus:ring-[#0066CC] h-4 w-4 text-[#0066CC] border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="sms_notifications" className="font-medium text-gray-700">
                          Notificaciones por SMS
                        </label>
                        <p className="text-gray-500">Recibe recordatorios de citas por mensaje de texto.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <h4 className="text-sm font-medium text-gray-900">Seguridad</h4>
                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0066CC]"
                    >
                      Cambiar Contraseña
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage; 