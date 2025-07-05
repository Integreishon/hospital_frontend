import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Juan Pérez',
      age: 54,
      treatment: 'Cirugía prostática',
      content: 'Excelente atención médica en UroVital. El Dr. Mendoza me explicó detalladamente mi condición y las opciones de tratamiento. La cirugía fue exitosa y la recuperación más rápida de lo esperado. Muy agradecido con todo el equipo.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80',
      rating: 5,
    },
    {
      id: 2,
      name: 'María García',
      age: 48,
      treatment: 'Tratamiento de cálculos renales',
      content: 'Increíble experiencia desde la reserva hasta el tratamiento. El personal muy amable y profesional. La Dra. Sánchez utilizó un procedimiento mínimamente invasivo que me permitió recuperarme rápidamente. Recomendaría UroVital a cualquiera.',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80',
      rating: 5,
    },
    {
      id: 3,
      name: 'Roberto Sánchez',
      age: 62,
      treatment: 'Consulta urológica',
      content: 'La atención fue rápida y eficiente. El médico me explicó todas las opciones de tratamiento y me sentí muy cómodo durante toda la consulta. Aprecio mucho la discreción y profesionalismo del equipo de UroVital.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80',
      rating: 4,
    },
    {
      id: 4,
      name: 'Carmen Rodríguez',
      age: 35,
      treatment: 'Exámenes diagnósticos',
      content: 'Muy satisfecha con la atención recibida. El proceso de reserva online fue sencillo y los exámenes diagnósticos fueron realizados con gran profesionalismo. Los resultados estuvieron listos en tiempo récord. Excelente servicio.',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80',
      rating: 5,
    },
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <svg
        key={index}
        xmlns="http://www.w3.org/2000/svg"
        className={`h-5 w-5 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <div className="bg-gradient-to-b from-teal-50 to-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 text-sm font-medium text-teal-700 bg-teal-100 rounded-full mb-4">
            Testimonios
          </span>
          <h2 className="text-3xl font-bold text-gray-800 sm:text-4xl font-poppins">
            Lo que dicen nuestros pacientes
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Experiencias reales de personas que confiaron en nuestra atención urológica
          </p>
          
          <div className="mt-6 flex items-center justify-center">
            <div className="flex">
              {renderStars(5)}
            </div>
            <span className="ml-2 text-lg font-medium text-gray-800">4.9/5</span>
            <span className="ml-2 text-sm text-gray-500">(256 reseñas verificadas)</span>
          </div>
          
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <div className="flex items-center px-4 py-2 bg-teal-100/50 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-700 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-medium text-gray-700">Certificado por el Colegio Médico del Perú</span>
            </div>
            <div className="flex items-center px-4 py-2 bg-teal-100/50 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-700 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-medium text-gray-700">Verificado por SUSALUD</span>
            </div>
          </div>
        </div>

        {/* Quote icon */}
        <div className="flex justify-center mb-10">
          <div className="h-16 w-16 rounded-full bg-teal-100 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
            </svg>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
            >
              <div className="p-6">
                <div className="flex mb-4">
                  {renderStars(testimonial.rating)}
                </div>
                <p className="text-gray-700 mb-6 italic">
                  "{testimonial.content}"
                </p>
                <div className="pt-4 border-t border-gray-100">
                  <div className="flex items-center">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="h-12 w-12 rounded-full object-cover border-2 border-teal-100"
                    />
                    <div className="ml-4">
                      <h3 className="text-base font-semibold text-gray-800">
                        {testimonial.name}
                      </h3>
                      <div className="flex items-center text-xs text-gray-500">
                        <span>{testimonial.age} años</span>
                        <span className="mx-2">•</span>
                        <span>{testimonial.treatment}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <a 
            href="#"
            className="inline-flex items-center justify-center px-6 py-3 border border-teal-600 text-base font-medium rounded-full text-teal-600 hover:bg-teal-50 transition-colors duration-200"
          >
            Ver más testimonios
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Testimonials; 