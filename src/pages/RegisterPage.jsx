import React from 'react';
import { Link } from 'react-router-dom';
import RegisterForm from '../components/features/auth/RegisterForm';

const RegisterPage = () => {
  return (
    <div className="flex h-screen">
      {/* Left Side - Form */}
      <div className="w-full lg:w-[45%] xl:w-[40%] bg-white flex flex-col justify-between p-6 lg:p-12">
        <div>
          {/* Logo */}
          <div className="flex items-center mb-8">
            <div className="h-8 w-8 rounded-lg bg-emerald-600 flex items-center justify-center">
              <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <span className="ml-3 text-lg font-bold text-gray-900">Portal Médico</span>
          </div>

          {/* Welcome Text */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Crear cuenta</h1>
            <p className="text-base text-gray-600">
              Completa el formulario para comenzar tu experiencia con nosotros.
            </p>
          </div>

          {/* Register Form */}
          <RegisterForm />

          {/* Login Link */}
          <div className="mt-4">
            <p className="text-gray-600 text-sm">
              ¿Ya tienes una cuenta?{' '}
              <Link to="/login" className="font-semibold text-emerald-600 hover:text-emerald-500 transition-colors">
                Inicia sesión
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-xs text-gray-500">
          <p>
            Al registrarte, aceptas nuestros{' '}
            <a href="#" className="text-emerald-600 hover:text-emerald-500 transition-colors">
              Términos y Condiciones
            </a>
          </p>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:block lg:w-[55%] xl:w-[60%] relative">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-700/95 to-emerald-900/95"></div>
        <img 
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay" 
          src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop" 
          alt="Healthcare background" 
        />
        <div className="relative h-full flex flex-col items-start justify-center p-12 text-white">
          <div className="max-w-2xl">
            <span className="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-sm font-medium mb-4">
              ✨ Únete a nuestra comunidad médica
            </span>
            <h2 className="text-3xl font-bold mb-4">Tu salud, nuestra prioridad</h2>
            <p className="text-lg text-white/90">
              Accede a todos nuestros servicios médicos y gestiona tus citas de forma sencilla.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage; 