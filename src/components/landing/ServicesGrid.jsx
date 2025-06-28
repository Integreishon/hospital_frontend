import React from 'react';
import { Link } from 'react-router-dom';

const ServicesGrid = () => {
  const services = [
    {
      id: 1,
      title: 'Urología General',
      description: 'Diagnóstico y tratamiento de problemas del tracto urinario y sistema reproductor masculino',
      image: 'https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?auto=format&fit=crop&q=80',
      link: '/appointments?specialty=urology',
    },
    {
      id: 2,
      title: 'Endourología',
      description: 'Procedimientos mínimamente invasivos para tratar cálculos y otras afecciones del tracto urinario',
      image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80',
      link: '/appointments?specialty=endourology',
    },
    {
      id: 3,
      title: 'Urología Oncológica',
      description: 'Diagnóstico y tratamiento de cánceres del sistema urinario y reproductor masculino',
      image: 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1b98?auto=format&fit=crop&q=80',
      link: '/appointments?specialty=oncology',
    },
    {
      id: 4,
      title: 'Andrología',
      description: 'Tratamiento de problemas de salud masculina, incluyendo fertilidad e impotencia',
      image: 'https://images.unsplash.com/photo-1666214280557-f1b5022eb634?auto=format&fit=crop&q=80',
      link: '/appointments?specialty=andrology',
    },
    {
      id: 5,
      title: 'Urología Pediátrica',
      description: 'Atención especializada para niños con problemas urológicos',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80',
      link: '/appointments?specialty=pediatric',
    },
    {
      id: 6,
      title: 'Laboratorio Urológico',
      description: 'Análisis y pruebas diagnósticas especializadas en urología',
      image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80',
      link: '/appointments?specialty=laboratory',
    },
  ];

  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#4A4A4A] sm:text-4xl font-poppins">
            Servicios Especializados
          </h2>
          <p className="mt-4 text-lg text-[#4A4A4A]">
            Ofrecemos una amplia gama de servicios urológicos con tecnología de vanguardia
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-y-10 gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div 
              key={service.id} 
              className="group relative bg-white rounded-2xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl"
            >
              <div className="relative h-80 w-full overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-[#0066CC]">
                  {service.title}
                </h3>
                <p className="mt-2 text-base text-[#4A4A4A]">
                  {service.description}
                </p>
                <div className="mt-4">
                  <Link
                    to={service.link}
                    className="inline-flex items-center text-[#0066CC] font-medium group-hover:underline"
                  >
                    Reservar
                    <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesGrid; 