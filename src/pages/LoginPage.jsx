import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginForm from '../components/features/auth/LoginForm';

const LoginPage = () => {
  const navigate = useNavigate();
  
  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex overflow-hidden">
      {/* Background with single image - Full screen */}
      <div className="absolute inset-0">
        {/* Single background image */}
        <div 
          className="h-full w-full bg-no-repeat bg-cover bg-center" 
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1685997179880-6449203a053e)'
          }}
        ></div>
        
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50"></div>
        
        {/* Logo rwv in bottom left */}
        <div className="absolute bottom-8 left-8 z-20">
          <div className="flex items-center text-white">
            <div className="w-8 h-8 bg-[#043464] rounded-full flex items-center justify-center mr-3">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7v10c0 5.55 3.84 9.739 9 11 5.16-1.261 9-5.45 9-11V7l-10-5z"/>
              </svg>
            </div>
            <span className="text-xl font-bold font-montserrat">Hospital</span>
          </div>
        </div>
      </div>

      {/* Content - Login Card positioned to the right */}
      <div className="relative z-10 w-full h-full flex items-center justify-center md:justify-end p-4 sm:p-6 md:p-8 lg:p-10 overflow-y-auto">
        {/* Login Card Container with max height */}
        <div className="w-full max-w-md my-auto">
          {/* Back Button */}
          <button 
            onClick={handleBack}
            className="flex items-center text-white/80 hover:text-white mb-4 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="font-montserrat">Atrás</span>
          </button>

          {/* Login Form Card with scrollable content if needed */}
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-card hover:shadow-card-hover transition-shadow duration-300 border border-white/20 animate-fade-in max-h-[80vh] overflow-y-auto">
            {/* Step indicator */}
            <div className="mb-6">
              <div className="flex items-center mb-1">
                <div className="h-1.5 w-8 bg-[#043464] rounded-full mr-1.5"></div>
               
              </div>
              <p className="text-sm text-gray-500 font-montserrat mb-2 tracking-wide">Bienvenido</p>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#043464] font-montserrat tracking-tight">
                Iniciar sesión
              </h1>
              <p className="text-gray-600 mt-2 font-montserrat">
                ¿No tienes una cuenta?{' '}
                <Link to="/register" className="text-[#043464] hover:text-[#032a52] font-medium transition-colors underline-offset-4 hover:underline">
                  Crear una cuenta
                </Link>
              </p>
            </div>

            {/* Form */}
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 