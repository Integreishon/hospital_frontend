import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const DoctorsCarousel = () => {
  const doctors = [
    {
      id: 1,
      name: 'Dr. Carlos Mendoza',
      specialty: 'Urología General',
      experience: '15 años',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80',
      profile: '/doctors/1',
    },
    {
      id: 2,
      name: 'Dra. Ana Sánchez',
      specialty: 'Urología Oncológica',
      experience: '12 años',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80',
      profile: '/doctors/2',
    },
    {
      id: 3,
      name: 'Dr. Miguel Torres',
      specialty: 'Endourología',
      experience: '10 años',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80',
      profile: '/doctors/3',
    },
    {
      id: 4,
      name: 'Dra. Lucía Paredes',
      specialty: 'Urología Pediátrica',
      experience: '8 años',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80',
      profile: '/doctors/4',
    },
    {
      id: 5,
      name: 'Dr. Javier Rodríguez',
      specialty: 'Andrología',
      experience: '14 años',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80',
      profile: '/doctors/5',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const maxIndex = Math.max(0, doctors.length - (window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1));
  const containerRef = useRef(null);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(0, prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => Math.min(maxIndex, prevIndex + 1));
  };

  useEffect(() => {
    const handleResize = () => {
      const newMaxIndex = Math.max(0, doctors.length - (window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1));
      setCurrentIndex((prevIndex) => Math.min(prevIndex, newMaxIndex));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [doctors.length]);

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
    <div className="bg-[#E6F3FF]/50 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#4A4A4A] sm:text-4xl font-poppins">
            Nuestros Especialistas
          </h2>
          <p className="mt-4 text-lg text-[#4A4A4A]">
            Médicos certificados con amplia experiencia en urología
          </p>
        </div>

        <div className="mt-16 relative">
          {/* Navigation buttons */}
          <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-4 z-10">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`rounded-full h-12 w-12 flex items-center justify-center bg-white shadow-md ${
                currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#E6F3FF]'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#0066CC]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>
          
          <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-4 z-10">
            <button
              onClick={handleNext}
              disabled={currentIndex === maxIndex}
              className={`rounded-full h-12 w-12 flex items-center justify-center bg-white shadow-md ${
                currentIndex === maxIndex ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#E6F3FF]'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#0066CC]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Carousel container */}
          <div className="overflow-hidden" ref={containerRef}>
            <div 
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / (window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1))}%)` }}
            >
              {doctors.map((doctor) => (
                <div 
                  key={doctor.id} 
                  className="w-full sm:w-1/2 lg:w-1/3 flex-shrink-0 px-4"
                >
                  <div className="bg-white rounded-2xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl">
                    <div className="relative h-64 w-full overflow-hidden">
                      <img
                        src={doctor.image}
                        alt={doctor.name}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-[#0066CC]">
                        {doctor.name}
                      </h3>
                      <p className="mt-1 text-[#4A4A4A] font-medium">
                        {doctor.specialty}
                      </p>
                      <div className="mt-2 flex items-center">
                        <span className="text-sm text-gray-500 mr-2">
                          {doctor.experience} de experiencia
                        </span>
                        <span className="text-sm font-medium text-yellow-700">
                          {doctor.rating}
                        </span>
                        <div className="ml-1 flex">
                          {renderStars(doctor.rating)}
                        </div>
                      </div>
                      <div className="mt-4">
                        <Link
                          to={doctor.profile}
                          className="inline-flex items-center justify-center w-full px-4 py-2 border border-[#0066CC] text-sm font-medium rounded-full text-[#0066CC] bg-white hover:bg-[#E6F3FF] transition-colors duration-200"
                        >
                          Ver perfil
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
                  index === currentIndex ? 'bg-[#0066CC] w-6' : 'bg-[#0066CC]/30'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorsCarousel; 