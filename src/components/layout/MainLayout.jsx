import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
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

const MainLayout = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Función para determinar el título de la página según la ruta
  const getPageInfo = () => {
    const path = location.pathname;
    
    if (path === '/dashboard') {
      return {
        title: 'Dashboard',
        subtitle: `Bienvenido${user?.gender === 'F' ? 'a' : 'o'}, ${user?.name || 'Usuario'}`,
      };
    } else if (path.startsWith('/appointments')) {
      if (path === '/appointments/new') {
        return {
          title: 'Agendar Cita',
          subtitle: 'Selecciona especialidad, doctor y horario para tu cita',
        };
      }
      return {
        title: 'Mis Citas',
        subtitle: 'Gestiona tus citas médicas',
      };
    } else if (path === '/medical-records') {
      return {
        title: 'Historial Médico',
        subtitle: 'Consulta tu historial médico completo',
      };
    } else if (path === '/profile') {
      return {
        title: 'Mi Perfil',
        subtitle: 'Administra tu información personal',
      };
    } else if (path.startsWith('/payment')) {
      return {
        title: 'Pagos',
        subtitle: 'Gestiona tus pagos y facturas',
      };
    } else if (path.startsWith('/catalog')) {
      return {
        title: 'Catálogo',
        subtitle: 'Explora nuestros servicios y especialidades',
      };
    }
    
    // Default
    return {
      title: 'Portal del Paciente',
      subtitle: 'Urovital - Cuidamos tu salud',
    };
  };

  const pageInfo = getPageInfo();

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      {/* Main Content */}
      <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        {/* Top Navigation */}
        <header className="bg-white shadow-sm z-10">
          <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-md text-gray-500 hover:bg-gray-100 lg:hidden"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div className="ml-4 lg:ml-0">
                <h2 className="text-lg font-medium text-[#0066CC]">Urovital</h2>
                <p className="text-sm text-gray-500">Portal del Paciente</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Notificaciones */}
              <button className="p-1 rounded-full text-gray-500 hover:bg-gray-100 relative">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
              </button>
              
              {/* Perfil de usuario */}
              <div className="relative">
                <button className="flex items-center space-x-2 text-sm focus:outline-none">
                  <div className="h-8 w-8 rounded-full bg-[#0066CC]/10 flex items-center justify-center">
                    <span className="text-[#0066CC] font-semibold">
                      {user?.name?.charAt(0) || 'U'}
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 sm:p-6 lg:p-8">
          <PageHeader title={pageInfo.title} subtitle={pageInfo.subtitle} />
          <div className="bg-white rounded-lg shadow">
            <Outlet />
          </div>
        </main>
        
        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 p-4">
          <div className="text-center text-sm text-gray-500">
            <p>© {new Date().getFullYear()} Urovital. Todos los derechos reservados.</p>
            <p className="mt-1">RUC 20612392278</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default MainLayout; 