import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  // Estructura de navegación basada en el backend
  const navSections = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      path: '/dashboard',
      hasSubmenu: false
    },
    {
      id: 'medical',
      title: 'Médico',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      hasSubmenu: true,
      submenu: [
        { title: 'Historial Médico', path: '/medical-records' },
        { title: 'Resultados', path: '/medical/results' },
        { title: 'Recetas', path: '/medical/prescriptions' }
      ]
    },
    {
      id: 'appointment',
      title: 'Citas',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      hasSubmenu: true,
      submenu: [
        { title: 'Mis Citas', path: '/appointments' },
        { title: 'Agendar Cita', path: '/appointments/new' },
        { title: 'Historial', path: '/appointments/history' }
      ]
    },
    {
      id: 'catalog',
      title: 'Catálogo',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      hasSubmenu: true,
      submenu: [
        { title: 'Especialidades', path: '/catalog/specialties' },
        { title: 'Doctores', path: '/catalog/doctors' },
        { title: 'Servicios', path: '/catalog/services' }
      ]
    },
    {
      id: 'payment',
      title: 'Pagos',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
      hasSubmenu: true,
      submenu: [
        { title: 'Mis Pagos', path: '/payment/history' },
        { title: 'Realizar Pago', path: '/payment/new' },
        { title: 'Facturación', path: '/payment/invoices' }
      ]
    },
    {
      id: 'user',
      title: 'Mi Cuenta',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      hasSubmenu: true,
      submenu: [
        { title: 'Mi Perfil', path: '/profile' },
        { title: 'Configuración', path: '/user/settings' },
        { title: 'Notificaciones', path: '/user/notifications' }
      ]
    }
  ];

  return (
    <aside 
      className={`fixed inset-y-0 left-0 z-20 flex flex-col h-full bg-white border-r border-gray-200 shadow-lg transition-all duration-300 ease-in-out ${
        isOpen ? 'w-64' : 'w-20'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
        <div className={`flex items-center transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 w-0'}`}>
          <div className="h-9 w-9 rounded-full bg-[#0066CC] flex items-center justify-center">
            <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <span className="ml-2 text-xl font-bold text-[#0066CC]">Urovital</span>
        </div>
        <button 
          onClick={toggleSidebar} 
          className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} />
          </svg>
        </button>
      </div>

      {/* User info */}
      {isOpen && (
        <div className="px-4 py-4 border-b border-gray-200">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-[#0066CC]/10 flex items-center justify-center">
              <span className="text-[#0066CC] font-semibold text-lg">
                {user?.name?.charAt(0) || 'U'}
              </span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">{user?.name || 'Usuario'}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email || 'usuario@ejemplo.com'}</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        <div className="px-3 space-y-1">
          {navSections.map((section) => (
            <div key={section.id} className="mb-2">
              {section.hasSubmenu ? (
                <div>
                  <button
                    onClick={() => toggleSection(section.id)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200
                      ${expandedSection === section.id || location.pathname.startsWith(`/${section.id}`) 
                        ? 'bg-[#0066CC]/10 text-[#0066CC]' 
                        : 'text-gray-700 hover:bg-gray-100'}
                      ${!isOpen ? 'justify-center' : ''}
                    `}
                  >
                    <div className="flex items-center">
                      <span className={expandedSection === section.id ? 'text-[#0066CC]' : 'text-gray-500'}>
                        {section.icon}
                      </span>
                      {isOpen && <span className="ml-3">{section.title}</span>}
                    </div>
                    {isOpen && (
                      <svg
                        className={`w-4 h-4 transition-transform duration-200 ${
                          expandedSection === section.id ? 'transform rotate-180' : ''
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </button>
                  
                  {isOpen && expandedSection === section.id && (
                    <div className="mt-1 pl-10 space-y-1">
                      {section.submenu.map((item) => (
                        <NavLink
                          key={item.path}
                          to={item.path}
                          className={({ isActive }) =>
                            `block py-2 px-3 text-sm rounded-md ${
                              isActive
                                ? 'bg-[#0066CC]/5 text-[#0066CC] font-medium'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                            }`
                          }
                        >
                          {item.title}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <NavLink
                  to={section.path}
                  className={({ isActive }) =>
                    `flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200
                      ${isActive ? 'bg-[#0066CC]/10 text-[#0066CC]' : 'text-gray-700 hover:bg-gray-100'}
                      ${!isOpen ? 'justify-center' : ''}
                    `
                  }
                  title={section.title}
                >
                  <span className={location.pathname === section.path ? 'text-[#0066CC]' : 'text-gray-500'}>
                    {section.icon}
                  </span>
                  {isOpen && <span className="ml-3">{section.title}</span>}
                </NavLink>
              )}
            </div>
          ))}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={logout}
          className={`flex items-center w-full px-3 py-2 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50
            ${!isOpen ? 'justify-center' : ''}
          `}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          {isOpen && <span className="ml-3">Cerrar Sesión</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar; 