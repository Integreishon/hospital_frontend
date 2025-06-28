import React from 'react';

const StepsBooking = () => {
  const steps = [
    {
      id: 1,
      title: 'Selecciona especialidad',
      description: 'Elige la especialidad médica que necesitas consultar',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
    },
    {
      id: 2,
      title: 'Elige fecha y hora',
      description: 'Selecciona el día y horario que mejor se adapte a ti',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      id: 3,
      title: 'Completa tus datos',
      description: 'Ingresa tu información personal para la cita',
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
    <div className="bg-[#E6F3FF] py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#4A4A4A] sm:text-4xl font-poppins">
            Agenda tu cita en 4 simples pasos
          </h2>
          <p className="mt-4 text-lg text-[#4A4A4A]">
            Proceso rápido y sencillo para reservar tu consulta médica
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div 
              key={step.id} 
              className="bg-white rounded-2xl shadow-md p-8 text-center transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-[#0066CC]/10 text-[#0066CC]">
                {step.icon}
              </div>
              <div className="mt-4 flex items-center justify-center">
                <span className="h-8 w-8 rounded-full bg-[#0066CC] text-white flex items-center justify-center font-bold">
                  {step.id}
                </span>
                <h3 className="ml-2 text-xl font-semibold text-[#4A4A4A]">{step.title}</h3>
              </div>
              <p className="mt-2 text-base text-gray-500">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StepsBooking; 