import React from 'react';

const StepsBooking = () => {
  const steps = [
    {
      id: 1,
      title: 'Selecciona especialidad',
      description: 'Elige la especialidad urológica que necesitas consultar',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
    },
    {
      id: 2,
      title: 'Elige fecha y hora',
      description: 'Selecciona el día y horario que mejor se adapte a tu agenda',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      id: 3,
      title: 'Completa tus datos',
      description: 'Ingresa tu información personal para la consulta médica',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
    {
      id: 4,
      title: 'Recibe confirmación',
      description: 'Obtén los detalles de tu cita por correo y SMS',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="bg-gradient-to-b from-teal-50 to-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 text-sm font-medium text-teal-700 bg-teal-100 rounded-full mb-4">
            Proceso Simple
          </span>
          <h2 className="text-3xl font-bold text-gray-800 sm:text-4xl font-poppins">
            Agenda tu cita en 4 simples pasos
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Proceso rápido y sencillo para reservar tu consulta urológica sin complicaciones
          </p>
        </div>

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-24 left-0 w-full h-1 bg-teal-100 z-0"></div>
          
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 relative z-10">
            {steps.map((step) => (
              <div 
                key={step.id} 
                className="bg-white rounded-2xl shadow-lg p-8 text-center transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-gray-100"
              >
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-teal-100 text-teal-700 mb-6">
                  {step.icon}
                </div>
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <span className="h-10 w-10 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold text-lg shadow-md">
                    {step.id}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{step.title}</h3>
                <p className="text-base text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <a 
            href="/appointments" 
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full shadow-md bg-teal-600 text-white hover:bg-teal-700 transition-colors duration-200"
          >
            Agendar mi cita ahora
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default StepsBooking; 