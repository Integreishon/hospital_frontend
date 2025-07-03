import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Sidebar from './Sidebar';

// Componente para el Header de cada página
const PageHeader = ({ title, subtitle, actions }) => {
  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          {subtitle && (
            <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
          )}
        </div>
        {actions && <div className="mt-4 md:mt-0 flex space-x-3">{actions}</div>}
      </div>
    </div>
  );
};

// Función para obtener información de la página actual
const getPageInfo = () => {
  const location = useLocation();
  const path = location.pathname;
  
  const pageInfoMap = {
    '/dashboard': {
      title: 'Panel Principal',
      subtitle: 'Resumen de tu información médica'
    },
    '/appointments': {
      title: 'Mis Citas',
      subtitle: 'Gestiona tus citas médicas'
    },
    '/appointments/new': {
      title: 'Nueva Cita',
      subtitle: 'Agenda una nueva cita médica'
    },
    '/medical-records': {
      title: 'Historial Médico',
      subtitle: 'Tu historial médico completo'
    },
    '/profile': {
      title: 'Mi Perfil',
      subtitle: 'Gestiona tu información personal'
    },
    '/payment': {
      title: 'Pagos',
      subtitle: 'Historial y gestión de pagos'
    }
  };
  
  return pageInfoMap[path] || { title: 'Página', subtitle: '' };
};

const MainLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Actualizar la hora cada minuto
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    return () => {
      clearInterval(timer);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const pageInfo = getPageInfo();

  // Formatear la fecha actual
  const formattedDate = new Intl.DateTimeFormat('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit'
  }).format(currentTime);

  // Cerrar menús al hacer clic fuera
  const closeMenus = () => {
    if (userMenuOpen) setUserMenuOpen(false);
    if (notificationsOpen) setNotificationsOpen(false);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      {/* Main Content */}
      <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        {/* Top Navigation */}
        <header className="bg-white shadow-md z-20 sticky top-0">
          <div className="px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
            {/* Fecha y hora actual */}
            <div className="hidden md:flex items-center text-sm text-gray-500">
              <svg className="h-4 w-4 mr-1.5 text-[#0066CC]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="capitalize">{formattedDate}</span>
            </div>
            
            {/* Búsqueda rápida */}
            <div className={`relative mx-auto ${searchFocused ? 'w-96' : 'w-64'} transition-all duration-300`}>
              <input 
                type="text" 
                placeholder="Buscar..." 
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0066CC]/50 focus:border-transparent text-sm bg-gray-50 hover:bg-white transition-all duration-200"
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
              />
              <div className="absolute left-3 top-2.5 text-gray-400">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            
            {/* Acciones rápidas */}
            <div className="flex items-center space-x-3">
              {/* Notificaciones */}
              <div className="relative">
                <button 
                  className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#0066CC]/50 relative transition-all duration-200"
                  onClick={(e) => {
                    e.stopPropagation();
                    setNotificationsOpen(!notificationsOpen);
                    if (userMenuOpen) setUserMenuOpen(false);
                  }}
                  aria-label="Notificaciones"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                  <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500 border border-white animate-pulse"></span>
              </button>
                
                {/* Dropdown de notificaciones */}
                {notificationsOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl py-2 z-50 border border-gray-200 transform transition-all duration-200 origin-top-right">
                    <div className="px-4 py-2 border-b border-gray-200 flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-gray-900">Notificaciones</h3>
                      <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full">3 nuevas</span>
                    </div>
                    <div className="max-h-72 overflow-y-auto">
                      <div className="px-4 py-3 hover:bg-gray-50 border-l-4 border-[#0066CC] cursor-pointer transition-colors duration-200">
                        <div className="flex items-start">
                          <div className="h-8 w-8 rounded-full bg-[#0066CC]/10 flex items-center justify-center text-[#0066CC] mr-3">
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">Recordatorio de cita</p>
                            <p className="text-xs text-gray-500">Tienes una cita programada para mañana a las 10:00 AM</p>
                            <p className="text-xs text-gray-400 mt-1">Hace 2 horas</p>
                          </div>
                        </div>
                      </div>
                      <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors duration-200">
                        <div className="flex items-start">
                          <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3">
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">Resultados disponibles</p>
                            <p className="text-xs text-gray-500">Tus resultados de laboratorio están disponibles</p>
                            <p className="text-xs text-gray-400 mt-1">Ayer</p>
                          </div>
                        </div>
                      </div>
                      <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors duration-200">
                        <div className="flex items-start">
                          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">Pago confirmado</p>
                            <p className="text-xs text-gray-500">Tu pago ha sido procesado correctamente</p>
                            <p className="text-xs text-gray-400 mt-1">12 Jul 2023</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-2 border-t border-gray-200">
                      <Link to="/notifications" className="text-xs text-[#0066CC] font-medium hover:underline flex items-center justify-center">
                        Ver todas las notificaciones
                        <svg className="ml-1 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Perfil de usuario */}
              <div className="relative">
                <button 
                  className="flex items-center space-x-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0066CC]/50 rounded-lg p-1.5 hover:bg-gray-100 transition-colors duration-200"
                  onClick={(e) => {
                    e.stopPropagation();
                    setUserMenuOpen(!userMenuOpen);
                    if (notificationsOpen) setNotificationsOpen(false);
                  }}
                >
                  <div className="h-8 w-8 rounded-full flex items-center justify-center">
                    <svg className="h-6 w-6 text-[#0066CC]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium text-gray-900 line-clamp-1">{user?.name || 'Usuario'}</p>
                    <div className="flex items-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-500 mr-1"></span>
                      <p className="text-xs text-[#0066CC]">Paciente</p>
                    </div>
                  </div>
                  <svg className="hidden md:block h-4 w-4 text-gray-500 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* Dropdown de usuario */}
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl py-1 z-50 border border-gray-200 transform transition-all duration-200 origin-top-right">
                    <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
                      <p className="text-sm font-medium text-gray-900">{user?.name || 'Usuario'}</p>
                      <p className="text-xs text-gray-500 mt-0.5 truncate">{user?.email || 'correo@ejemplo.com'}</p>
                    </div>
                    <div className="py-1">
                      <Link to="/profile" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150">
                        <svg className="h-4 w-4 mr-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Mi Perfil
                      </Link>
                      <Link to="/appointments" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150">
                        <svg className="h-4 w-4 mr-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Mis Citas
                      </Link>
                      <Link to="/medical-records" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150">
                        <svg className="h-4 w-4 mr-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Historial Médico
                      </Link>
                    </div>
                    <div className="border-t border-gray-200">
                      <button 
                        onClick={handleLogout}
                        className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150"
                      >
                        <svg className="h-4 w-4 mr-3 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Cerrar Sesión
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
        
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6" onClick={closeMenus}>
          <Outlet />
        </main>
        
        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 p-4">
          <div className="text-center text-sm text-gray-500">
            <p>© {new Date().getFullYear()} Todos los derechos reservados.</p>
            <p className="mt-1">RUC 20612392278</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default MainLayout; 