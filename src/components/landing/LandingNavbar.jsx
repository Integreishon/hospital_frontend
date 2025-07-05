import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const LandingNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navbarClasses = `fixed w-full z-50 transition-all duration-300 ${
    isScrolled
      ? 'bg-white shadow-md py-2'
      : 'bg-transparent py-4'
  }`;

  const linkClasses = `text-sm font-medium transition-colors duration-200 ${
    isScrolled
      ? 'text-gray-700 hover:text-teal-600'
      : 'text-white hover:text-teal-100'
  }`;

  const mobileMenuClasses = `md:hidden ${
    isMobileMenuOpen ? 'block' : 'hidden'
  } fixed inset-0 z-50 bg-gray-800 bg-opacity-50 backdrop-blur-sm`;

  return (
    <>
      <nav className={navbarClasses}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <div className={`h-10 w-10 rounded-full ${isScrolled ? 'bg-teal-600' : 'bg-white'} flex items-center justify-center`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${isScrolled ? 'text-white' : 'text-teal-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="ml-2 flex flex-col">
                  <span className={`text-xl font-bold ${
                    isScrolled ? 'text-teal-600' : 'text-white'
                  }`}>
                    UroVital
                  </span>
                  <span className={`text-xs ${
                    isScrolled ? 'text-gray-500' : 'text-teal-100'
                  }`}>
                    Centro Urológico Especializado
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-8">
              <Link to="/" className={linkClasses}>
                Inicio
              </Link>
              <Link to="/services" className={linkClasses}>
                Servicios
              </Link>
              <Link to="/doctors" className={linkClasses}>
                Especialistas
              </Link>
              <Link to="/contact" className={linkClasses}>
                Contacto
              </Link>
              <Link
                to="/appointments"
                className={`${linkClasses} px-4 py-2 rounded-full border ${
                  isScrolled
                    ? 'border-teal-600 text-teal-600 hover:bg-teal-50'
                    : 'border-white text-white hover:bg-white/10'
                }`}
              >
                Agendar Cita
              </Link>
              <Link
                to="/login"
                className="text-sm font-medium px-4 py-2 rounded-full bg-teal-600 text-white hover:bg-teal-700 transition-colors duration-200 shadow-md"
              >
                Iniciar Sesión
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <a
                href="tel:+51044123456"
                className={`mr-4 ${isScrolled ? 'text-teal-600' : 'text-white'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </a>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`inline-flex items-center justify-center p-2 rounded-md ${
                  isScrolled ? 'text-gray-700 hover:text-teal-600' : 'text-white hover:text-teal-100'
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
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-teal-600 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="ml-2">
                  <span className="text-lg font-bold text-teal-600">UroVital</span>
                  <span className="block text-xs text-gray-500">Centro Urológico</span>
                </div>
              </div>
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
                to="/"
                className="block text-base font-medium text-gray-700 hover:text-teal-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Inicio
              </Link>
              <Link
                to="/services"
                className="block text-base font-medium text-gray-700 hover:text-teal-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Servicios
              </Link>
              <Link
                to="/doctors"
                className="block text-base font-medium text-gray-700 hover:text-teal-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Especialistas
              </Link>
              <Link
                to="/contact"
                className="block text-base font-medium text-gray-700 hover:text-teal-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contacto
              </Link>
              <div className="pt-6 space-y-4">
                <Link
                  to="/appointments"
                  className="block w-full px-4 py-3 text-center text-base font-medium text-teal-600 border border-teal-600 rounded-full hover:bg-teal-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Agendar Cita
                </Link>
                <Link
                  to="/login"
                  className="block w-full px-4 py-3 text-center text-base font-medium text-white bg-teal-600 rounded-full hover:bg-teal-700 shadow-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Iniciar Sesión
                </Link>
              </div>
              <div className="pt-6 border-t border-gray-200">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <a href="tel:+51044123456" className="text-base font-medium text-gray-700 hover:text-teal-600">
                    (044) 123-456
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingNavbar; 