import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const DoctorsCarousel = () => {
  const doctors = [
    {
      id: 1,
      name: 'Dr. Carlos Mendoza',
      specialty: 'Urología General',
      experience: '15 años',
      education: 'Universidad Nacional de Trujillo',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80',
      profile: '/doctors/1',
      description: 'Especialista en tratamientos urológicos integrales con enfoque en medicina preventiva.',
    },
    {
      id: 2,
      name: 'Dra. Ana Sánchez',
      specialty: 'Urología Oncológica',
      experience: '12 años',
      education: 'Universidad Peruana Cayetano Heredia',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80',
      profile: '/doctors/2',
      description: 'Especializada en diagnóstico y tratamiento de cáncer urológico con técnicas mínimamente invasivas.',
    },
    {
      id: 3,
      name: 'Dr. Miguel Torres',
      specialty: 'Endourología',
      experience: '10 años',
      education: 'Universidad Nacional Mayor de San Marcos',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80',
      profile: '/doctors/3',
      description: 'Experto en procedimientos endoscópicos y tratamiento de cálculos renales complejos.',
    },
    {
      id: 4,
      name: 'Dra. Lucía Paredes',
      specialty: 'Urología Pediátrica',
      experience: '8 años',
      education: 'Universidad San Martín de Porres',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80',
      profile: '/doctors/4',
      description: 'Dedicada al cuidado urológico de niños y adolescentes con un enfoque compasivo y especializado.',
    },
    {
      id: 5,
      name: 'Dr. Javier Rodríguez',
      specialty: 'Andrología',
      experience: '14 años',
      education: 'Universidad Peruana de Ciencias Aplicadas',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80',
      profile: '/doctors/5',
      description: 'Especialista en salud masculina, fertilidad y disfunción eréctil con tratamientos innovadores.',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const maxIndex = Math.max(0, doctors.length - itemsPerView);
  const containerRef = useRef(null);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(0, prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => Math.min(maxIndex, prevIndex + 1));
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerView(3);
      } else if (window.innerWidth >= 768) {
        setItemsPerView(2);
      } else {
        setItemsPerView(1);
      }
    };

    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Update maxIndex when itemsPerView changes
    const newMaxIndex = Math.max(0, doctors.length - itemsPerView);
    if (currentIndex > newMaxIndex) {
      setCurrentIndex(newMaxIndex);
    }
  }, [itemsPerView, doctors.length, currentIndex]);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      } else {
        stars.push(
          <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      }
    }

    return stars;
  };

  return (
    <div className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 text-sm font-medium text-teal-700 bg-teal-100 rounded-full mb-4">
            Equipo Médico
          </span>
          <h2 className="text-3xl font-bold text-gray-800 sm:text-4xl font-poppins">
            Nuestros Especialistas Urólogos
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Médicos certificados con amplia experiencia en urología, dedicados a brindar la mejor atención
          </p>
        </div>

        <div className="relative">
          {/* Navigation buttons */}
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`absolute top-1/2 -left-5 z-10 -translate-y-1/2 rounded-full h-12 w-12 flex items-center justify-center bg-white shadow-lg ${
              currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-teal-50 text-teal-700'
            }`}
            aria-label="Anterior"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={handleNext}
            disabled={currentIndex === maxIndex}
            className={`absolute top-1/2 -right-5 z-10 -translate-y-1/2 rounded-full h-12 w-12 flex items-center justify-center bg-white shadow-lg ${
              currentIndex === maxIndex ? 'opacity-50 cursor-not-allowed' : 'hover:bg-teal-50 text-teal-700'
            }`}
            aria-label="Siguiente"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Carousel container */}
          <div className="overflow-hidden" ref={containerRef}>
            <div 
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
            >
              {doctors.map((doctor) => (
                <div 
                  key={doctor.id} 
                  className="w-full sm:w-1/2 lg:w-1/3 flex-shrink-0 px-4"
                >
                  <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                    <div className="relative h-64 w-full overflow-hidden">
                      <img
                        src={doctor.image}
                        alt={doctor.name}
                        className="h-full w-full object-cover object-center"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                        <span className="inline-block px-3 py-1 text-xs font-medium text-white bg-teal-600/80 rounded-full mb-1">
                          {doctor.specialty}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-800">
                        {doctor.name}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {doctor.education}
                      </p>
                      <div className="mt-2 flex items-center">
                        <div className="flex mr-2">
                          {renderStars(doctor.rating)}
                        </div>
                        <span className="text-sm font-medium text-gray-700">
                          {doctor.rating}
                        </span>
                      </div>
                      <p className="mt-3 text-sm text-gray-600 line-clamp-2">
                        {doctor.description}
                      </p>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-xs font-medium text-gray-500">
                          {doctor.experience} de experiencia
                        </span>
                        <Link
                          to={`/appointments?doctor=${doctor.id}`}
                          className="text-sm font-medium text-teal-600 hover:text-teal-700"
                        >
                          Agendar cita
                        </Link>
                      </div>
                      <div className="mt-4">
                        <Link
                          to={doctor.profile}
                          className="inline-flex items-center justify-center w-full px-4 py-2 border border-teal-600 text-sm font-medium rounded-full text-teal-600 bg-white hover:bg-teal-50 transition-colors duration-200"
                        >
                          Ver perfil completo
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 w-2 rounded-full transition-all duration-200 ${
                  index === currentIndex ? 'bg-teal-600 w-6' : 'bg-teal-200'
                }`}
                aria-label={`Ir a slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <Link
            to="/doctors"
            className="inline-flex items-center justify-center px-8 py-3 border border-teal-600 text-base font-medium rounded-full text-teal-600 hover:bg-teal-50 transition-colors duration-200"
          >
            Conoce a todo nuestro equipo
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DoctorsCarousel; 