import React from 'react';
import { Link } from 'react-router-dom';

const ServicesGrid = () => {
  const services = [
    {
      id: 1,
      title: 'Urología General',
      description: 'Diagnóstico y tratamiento integral de problemas del tracto urinario y sistema reproductor masculino. Atención personalizada con tecnología avanzada.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      image: 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1b98?auto=format&fit=crop&q=80&w=2940',
      link: '/appointments?specialty=urology',
    },
    {
      id: 2,
      title: 'Endourología',
      description: 'Procedimientos mínimamente invasivos para tratar cálculos renales y otras afecciones del tracto urinario. Recuperación rápida y menor dolor postoperatorio.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80',
      link: '/appointments?specialty=endourology',
    },
    {
      id: 3,
      title: 'Urología Oncológica',
      description: 'Diagnóstico temprano y tratamiento especializado de cánceres del sistema urinario y reproductor masculino. Enfoque multidisciplinario para mejores resultados.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      image: 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1b98?auto=format&fit=crop&q=80',
      link: '/appointments?specialty=oncology',
    },
    {
      id: 4,
      title: 'Andrología',
      description: 'Tratamiento especializado de problemas de salud masculina, incluyendo fertilidad, disfunción eréctil e hipogonadismo. Soluciones personalizadas y confidenciales.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
        </svg>
      ),
      image: 'https://images.unsplash.com/photo-1666214280557-f1b5022eb634?auto=format&fit=crop&q=80',
      link: '/appointments?specialty=andrology',
    },
    {
      id: 5,
      title: 'Urología Pediátrica',
      description: 'Atención especializada y compasiva para niños con problemas urológicos congénitos o adquiridos. Ambiente amigable y tratamientos adaptados para pacientes pediátricos.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80',
      link: '/appointments?specialty=pediatric',
    },
    {
      id: 6,
      title: 'Laboratorio Urológico',
      description: 'Análisis y pruebas diagnósticas especializadas en urología con resultados precisos y rápidos. Tecnología de vanguardia para detección temprana de patologías.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80',
      link: '/appointments?specialty=laboratory',
    },
  ];

  return (
    <div className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 text-sm font-medium text-teal-700 bg-teal-100 rounded-full mb-4">
            Especialidades
          </span>
          <h2 className="text-3xl font-bold text-gray-800 sm:text-4xl font-poppins">
            Servicios Urológicos Especializados
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Ofrecemos una amplia gama de servicios urológicos con tecnología de vanguardia y atención personalizada
          </p>
        </div>

        <div className="grid grid-cols-1 gap-y-10 gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div 
              key={service.id} 
              className="group bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-gray-100"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-teal-100 flex items-center justify-center text-teal-700">
                    {service.icon}
                  </div>
                  <h3 className="ml-4 text-xl font-semibold text-gray-800">
                    {service.title}
                  </h3>
                </div>
                <p className="text-gray-600 mb-6">
                  {service.description}
                </p>
                <div className="flex items-center justify-between">
                  <Link
                    to={service.link}
                    className="inline-flex items-center text-teal-600 font-medium hover:text-teal-700 transition-colors duration-200"
                  >
                    Agendar consulta
                    <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                  <span className="text-sm text-gray-500">
                    Disponible
                  </span>
                </div>
              </div>
              <div className="h-2 bg-teal-600"></div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Link 
            to="/services" 
            className="inline-flex items-center justify-center px-8 py-3 border border-teal-600 text-base font-medium rounded-full text-teal-600 hover:bg-teal-50 transition-colors duration-200"
          >
            Ver todos nuestros servicios
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServicesGrid; 