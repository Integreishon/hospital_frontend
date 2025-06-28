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
      ? 'text-[#4A4A4A] hover:text-[#0066CC]'
      : 'text-white hover:text-[#E6F3FF]'
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
                <div className={`h-10 w-10 rounded-lg ${isScrolled ? 'bg-[#0066CC]' : 'bg-white'} flex items-center justify-center`}>
                  <svg className={`h-6 w-6 ${isScrolled ? 'text-white' : 'text-[#0066CC]'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <span className={`ml-2 text-xl font-bold ${
                  isScrolled ? 'text-[#0066CC]' : 'text-white'
                }`}>
                  Urovital
                </span>
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
                Médicos
              </Link>
              <Link to="/contact" className={linkClasses}>
                Contacto
              </Link>
              <Link
                to="/appointments"
                className={`${linkClasses} px-4 py-2 rounded-full border ${
                  isScrolled
                    ? 'border-[#0066CC] text-[#0066CC] hover:bg-[#E6F3FF]'
                    : 'border-white text-white hover:bg-white/10'
                }`}
              >
                Reservar cita
              </Link>
              <Link
                to="/login"
                className="text-sm font-medium px-4 py-2 rounded-full bg-[#0066CC] text-white hover:bg-[#0066CC]/90 transition-colors duration-200 shadow-md"
              >
                Iniciar Sesión
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <a
                href="tel:+51044123456"
                className={`mr-4 ${isScrolled ? 'text-[#0066CC]' : 'text-white'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </a>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`inline-flex items-center justify-center p-2 rounded-md ${
                  isScrolled ? 'text-[#4A4A4A] hover:text-[#0066CC]' : 'text-white hover:text-[#E6F3FF]'
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
                <div className="h-8 w-8 rounded-lg bg-[#0066CC] flex items-center justify-center">
                  <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <span className="ml-2 text-lg font-bold text-[#0066CC]">
                  Urovital
                </span>
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
                className="block text-base font-medium text-[#4A4A4A] hover:text-[#0066CC]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Inicio
              </Link>
              <Link
                to="/services"
                className="block text-base font-medium text-[#4A4A4A] hover:text-[#0066CC]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Servicios
              </Link>
              <Link
                to="/doctors"
                className="block text-base font-medium text-[#4A4A4A] hover:text-[#0066CC]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Médicos
              </Link>
              <Link
                to="/contact"
                className="block text-base font-medium text-[#4A4A4A] hover:text-[#0066CC]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contacto
              </Link>
              <div className="pt-6 space-y-4">
                <Link
                  to="/appointments"
                  className="block w-full px-4 py-3 text-center text-base font-medium text-[#0066CC] border border-[#0066CC] rounded-full hover:bg-[#E6F3FF]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Reservar cita
                </Link>
                <Link
                  to="/login"
                  className="block w-full px-4 py-3 text-center text-base font-medium text-white bg-[#0066CC] rounded-full hover:bg-[#0066CC]/90 shadow-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Iniciar Sesión
                </Link>
              </div>
              <div className="pt-6 border-t border-gray-200">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#0066CC] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <a href="tel:+51044123456" className="text-base font-medium text-[#4A4A4A] hover:text-[#0066CC]">
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