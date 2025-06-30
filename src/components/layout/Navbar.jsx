import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const isLandingPage = location.pathname === '/';
  const navbarClasses = `fixed w-full z-50 transition-all duration-300 ${
    isScrolled || !isLandingPage
      ? 'bg-white shadow-md'
      : 'bg-transparent'
  }`;

  const linkClasses = `text-sm font-medium transition-colors duration-200 ${
    isScrolled || !isLandingPage
      ? 'text-gray-700 hover:text-emerald-600'
      : 'text-white hover:text-emerald-200'
  }`;

  const mobileMenuClasses = `md:hidden ${
    isMobileMenuOpen ? 'block' : 'hidden'
  } fixed inset-0 z-50 bg-gray-800 bg-opacity-50 backdrop-blur-sm`;

  return (
    <>
      <nav className={navbarClasses}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/" className="flex items-center">
                <span className={`text-xl font-bold ${
                  isScrolled || !isLandingPage
                    ? 'text-emerald-600'
                    : 'text-white'
                }`}>
                  Urovital
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-8">
              <Link to="/appointments" className={linkClasses}>
                Citas
              </Link>
              <Link to="/medical-records" className={linkClasses}>
                Historial Médico
              </Link>
              {!isAuthenticated ? (
                <>
                  <Link
                    to="/login"
                    className={`${linkClasses} px-4 py-2 rounded-md border ${
                      isScrolled || !isLandingPage
                        ? 'border-emerald-600 text-emerald-600 hover:bg-emerald-50'
                        : 'border-white text-white hover:bg-white/10'
                    }`}
                  >
                    Iniciar Sesión
                  </Link>
                  <Link
                    to="/register"
                    className="text-sm font-medium px-4 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 transition-colors duration-200"
                  >
                    Registrarse
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/profile" className={linkClasses}>
                    Mi Perfil
                  </Link>
                  <button
                    onClick={handleLogout}
                    className={`${linkClasses} cursor-pointer`}
                  >
                    Cerrar Sesión
                  </button>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`inline-flex items-center justify-center p-2 rounded-md ${
                  isScrolled || !isLandingPage
                    ? 'text-gray-700 hover:text-emerald-600'
                    : 'text-white hover:text-emerald-200'
                }`}
              >
                <span className="sr-only">Abrir menú principal</span>
                {!isMobileMenuOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={mobileMenuClasses}>
        <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-xl">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
              <span className="text-xl font-bold text-emerald-600">
                Urovital
              </span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <span className="sr-only">Cerrar menú</span>
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex-1 px-4 py-6 space-y-6 overflow-y-auto">
              <Link
                to="/appointments"
                className="block text-base font-medium text-gray-900 hover:text-emerald-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Citas
              </Link>
              <Link
                to="/medical-records"
                className="block text-base font-medium text-gray-900 hover:text-emerald-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Historial Médico
              </Link>
              {!isAuthenticated ? (
                <div className="space-y-6">
                  <Link
                    to="/login"
                    className="block w-full px-4 py-2 text-center text-base font-medium text-emerald-600 border border-emerald-600 rounded-md hover:bg-emerald-50"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Iniciar Sesión
                  </Link>
                  <Link
                    to="/register"
                    className="block w-full px-4 py-2 text-center text-base font-medium text-white bg-emerald-600 rounded-md hover:bg-emerald-700"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Registrarse
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  <Link
                    to="/profile"
                    className="block text-base font-medium text-gray-900 hover:text-emerald-600"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Mi Perfil
                  </Link>
                  <button
                    onClick={async () => {
                      try {
                        setIsMobileMenuOpen(false);
                        await logout();
                      } catch (error) {
                        console.error('Error al cerrar sesión:', error);
                      }
                    }}
                    className="block w-full text-left text-base font-medium text-gray-900 hover:text-emerald-600"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar; 