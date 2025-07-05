import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-white">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src="https://thumbs.dreamstime.com/b/doctor-con-el-fondo-m%C3%A9dico-19857086.jpg"
          alt="Médico urólogo con paciente"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-teal-900/90 to-teal-700/70"></div>
      </div>
      
      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block px-4 py-1 rounded-full bg-teal-100 text-teal-800 text-sm font-medium mb-6">
              Centro de Urología Especializada
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-poppins leading-tight">
              Cuidando su salud urológica con excelencia
            </h1>
            <p className="text-xl text-teal-50 mb-8 max-w-lg">
              En UroVital, combinamos tecnología avanzada y atención personalizada para ofrecer los mejores tratamientos urológicos en Trujillo.
            </p>
            
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/appointments"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-lg bg-white text-teal-700 hover:bg-teal-50 hover:scale-105 transition-all duration-150"
              >
                Agendar cita ahora
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </Link>
              <a
                href="tel:+51044123456"
                className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-full text-white hover:bg-white/10 transition-colors duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Llámanos ahora
              </a>
            </div>
            
            {/* Trust bullets */}
            <div className="mt-10 grid grid-cols-2 gap-4 text-teal-50">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-teal-500/20 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <span className="ml-3 text-sm">Médicos certificados</span>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-teal-500/20 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="ml-3 text-sm">Atención inmediata</span>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-teal-500/20 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <span className="ml-3 text-sm">Tecnología avanzada</span>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-teal-500/20 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                  </svg>
                </div>
                <span className="ml-3 text-sm">+2,000 pacientes satisfechos</span>
              </div>
            </div>
          </div>
          
          {/* Feature card */}
          <div className="hidden lg:block">
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 shadow-xl">
              <div className="flex items-center mb-6">
                <div className="h-12 w-12 rounded-full bg-teal-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="ml-4 text-xl font-bold text-white">Servicios Urológicos</h3>
              </div>
              
              <ul className="space-y-4">
                <li className="flex items-center text-teal-50">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-teal-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Consultas urológicas generales
                </li>
                <li className="flex items-center text-teal-50">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-teal-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Tratamiento de cálculos renales
                </li>
                <li className="flex items-center text-teal-50">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-teal-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Salud prostática
                </li>
                <li className="flex items-center text-teal-50">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-teal-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Disfunción eréctil
                </li>
                <li className="flex items-center text-teal-50">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-teal-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Cirugías mínimamente invasivas
                </li>
              </ul>
              
              <div className="mt-8">
                <Link 
                  to="/services" 
                  className="inline-flex items-center justify-center w-full px-6 py-3 border border-white text-base font-medium rounded-full text-white bg-teal-600/40 hover:bg-teal-600/60 transition-colors duration-200"
                >
                  Ver todos los servicios
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection; 