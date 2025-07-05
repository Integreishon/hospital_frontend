import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [expandedSection, setExpandedSection] = useState(null);
  const [patientName, setPatientName] = useState('Usuario');

  // Auto-expandir la sección activa según la ruta actual
  useEffect(() => {
    const currentPath = location.pathname;
    const activeSection = navSections.find(section => 
      section.hasSubmenu && section.submenu.some(item => currentPath === item.path || currentPath.startsWith(item.path + '/'))
    );
    
    if (activeSection) {
      setExpandedSection(activeSection.id);
    }
  }, [location.pathname]);
  
  // Cargar datos del paciente si es necesario
  useEffect(() => {
    // Función para cargar datos del paciente
    const loadPatientData = async () => {
      // Si no hay usuario autenticado, no intentar cargar datos
      if (!user) {
        setPatientName('Usuario');
        return;
      }
      
      if (user?.role === 'PATIENT') {
        try {
          // Si no tenemos los datos completos del paciente, intentar cargarlos
          if (!user.firstName || !user.lastName) {
            const userService = await import('../../services/userService').then(m => m.default);
            try {
              const patientData = await userService.getCurrentPatient();
              
              if (patientData) {
                // Construir nombre completo del paciente
                if (patientData.firstName && patientData.lastName) {
                  setPatientName(`${patientData.firstName} ${patientData.lastName}`);
                } else if (patientData.fullName) {
                  setPatientName(patientData.fullName);
                }
                
                return;
              }
            } catch (error) {
              // Capturar error silenciosamente y continuar con datos de respaldo
              console.debug("No se pudieron cargar datos adicionales del paciente en Sidebar");
            }
          } else {
            // Ya tenemos firstName y lastName, usar estos
            setPatientName(`${user.firstName} ${user.lastName}`);
            return;
          }
        } catch (error) {
          // Usar el nivel debug para errores esperados durante el inicio de sesión
          console.debug("Info: No se pudieron cargar datos del paciente en Sidebar");
        }
      }
      
      // Si no pudimos cargar datos o hubo un error, usar el mejor dato disponible
      if (user?.nombre && user?.apellidoPaterno) {
        setPatientName(`${user.nombre} ${user.apellidoPaterno}`);
      } else if (user?.name) {
        setPatientName(user.name);
      } else if (user?.email) {
        setPatientName(user.email);
      } else {
        setPatientName('Usuario');
      }
    };
    
    loadPatientData();
  }, [user]);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleLogout = async () => {
    try {
      await logout();
      // No necesitamos navegar aquí ya que el logout ahora redirige automáticamente
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  // Estructura de navegación basada en el backend
  const navSections = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      hasSubmenu: true,
      submenu: [
        { title: 'Mis Citas', path: '/appointments' },
        { title: 'Agendar Cita', path: '/appointments/new' },
        { title: 'Historial', path: '/medical-records' }
      ]
    },
   
  
    {
      id: 'user',
      title: 'Mi Cuenta',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      hasSubmenu: true,
      submenu: [
        { title: 'Mi Perfil', path: '/profile' }
      ]
    }
  ];

  // Verificar si una sección está activa
  const isSectionActive = (section) => {
    if (!section.hasSubmenu && location.pathname === section.path) {
      return true;
    }
    
    if (section.hasSubmenu && section.submenu.some(item => location.pathname === item.path || location.pathname.startsWith(item.path + '/'))) {
      return true;
    }
    
    return false;
  };

  return (
    <aside 
      className={`fixed inset-y-0 left-0 z-50 flex flex-col h-full bg-white shadow-xl transition-all duration-300 ease-in-out ${
        isOpen ? 'w-64' : 'w-20'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 bg-gradient-to-r from-[#0066CC]/10 to-white">
        <div className={`flex items-center transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'}`}>
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#0066CC] to-[#1a85ff] flex items-center justify-center shadow-lg">
            <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
          <span className="ml-3 text-xl font-bold text-[#0066CC]">Portal</span>
        </div>
        <button 
          onClick={toggleSidebar} 
          className={`p-2 rounded-lg text-gray-500 hover:bg-[#0066CC]/10 hover:text-[#0066CC] focus:outline-none focus:ring-2 focus:ring-[#0066CC]/50 transition-all duration-200 ${!isOpen && 'mx-auto'}`}
          aria-label={isOpen ? "Colapsar menú" : "Expandir menú"}
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} />
          </svg>
        </button>
      </div>

      {/* User info */}
      <div className={`px-4 py-4 border-b border-gray-200 bg-gradient-to-r from-[#0066CC]/10 to-white transition-all duration-300 ${!isOpen && 'py-2'}`}>
        <div className={`flex ${isOpen ? 'items-center' : 'justify-center'}`}>
          <div className={`${isOpen ? 'h-12 w-12' : 'h-10 w-10'} flex items-center justify-center transition-all duration-300`}>
            <svg className={`${isOpen ? 'h-7 w-7' : 'h-6 w-6'} text-[#0066CC]`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          {isOpen && (
            <div className="ml-3 overflow-hidden">
              <p className="text-sm font-medium text-gray-800">
                {patientName}
              </p>
              <div className="flex items-center mt-1">
                <span className="h-2 w-2 rounded-full bg-green-500 mr-1.5 animate-pulse"></span>
                <p className="text-xs font-medium text-[#0066CC] truncate">Paciente</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        <div className="px-3 space-y-2">
          {navSections.map((section) => {
            const isActive = isSectionActive(section);
            
            return (
              <div key={section.id} className="mb-2">
                {section.hasSubmenu ? (
                  <div>
                    <button
                      onClick={() => toggleSection(section.id)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200
                        ${isActive 
                          ? 'bg-gradient-to-r from-[#0066CC]/20 to-[#0066CC]/5 text-[#0066CC] shadow-md' 
                          : 'text-gray-700 hover:bg-gray-50 hover:text-[#0066CC]'}
                        ${!isOpen ? 'justify-center' : ''}
                      `}
                    >
                      <div className="flex items-center">
                        <div className={`p-1.5 rounded-md ${isActive ? 'bg-[#0066CC]/10' : ''}`}>
                          <span className={isActive ? 'text-[#0066CC]' : 'text-gray-500'}>
                            {section.icon}
                          </span>
                        </div>
                        {isOpen && <span className="ml-3">{section.title}</span>}
                      </div>
                      {isOpen && (
                        <svg
                          className={`w-4 h-4 transition-transform duration-300 ${
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
                      <div className="mt-1.5 ml-4 pl-7 space-y-1 border-l-2 border-[#0066CC]/20">
                        {section.submenu.map((item) => {
                          const isItemActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/');
                          
                          return (
                            <NavLink
                              key={item.path}
                              to={item.path}
                              className={({ isActive }) =>
                                `block py-2 px-3 text-sm rounded-md transition-all duration-200 ${
                                  isActive
                                    ? 'bg-[#0066CC]/10 text-[#0066CC] font-medium shadow-sm'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-[#0066CC]'
                                }`
                              }
                            >
                              <div className="flex items-center">
                                {isItemActive && (
                                  <div className="mr-2 h-1.5 w-1.5 rounded-full bg-[#0066CC] animate-pulse"></div>
                                )}
                                <span>{item.title}</span>
                              </div>
                            </NavLink>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ) : (
                  <NavLink
                    to={section.path}
                    className={({ isActive }) =>
                      `flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200
                        ${isActive 
                          ? 'bg-gradient-to-r from-[#0066CC]/20 to-[#0066CC]/5 text-[#0066CC] shadow-md' 
                          : 'text-gray-700 hover:bg-gray-50 hover:text-[#0066CC]'}
                        ${!isOpen ? 'justify-center' : ''}
                      `
                    }
                    title={section.title}
                  >
                    <div className={`p-1.5 rounded-md ${isActive ? 'bg-[#0066CC]/10' : ''}`}>
                      <span className={isActive ? 'text-[#0066CC]' : 'text-gray-500'}>
                        {section.icon}
                      </span>
                    </div>
                    {isOpen && <span className="ml-3">{section.title}</span>}
                  </NavLink>
                )}
              </div>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 bg-gradient-to-r from-[#0066CC]/5 to-white">
        <button
          onClick={handleLogout}
          className={`flex items-center w-full px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200
            hover:bg-red-50 text-red-600
            ${!isOpen ? 'justify-center' : ''}
          `}
        >
          <div className="p-1.5 rounded-md">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </div>
          {isOpen && <span className="ml-3">Cerrar Sesión</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar; 