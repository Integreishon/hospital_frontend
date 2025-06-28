import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../components/features/auth/LoginForm';

const LoginPage = () => {
  return (
    <div className="flex h-screen">
      {/* Left Side - Form */}
      <div className="w-full lg:w-[45%] xl:w-[40%] bg-white flex flex-col justify-between p-8 lg:p-16">
        <div>
          {/* Logo */}
          <div className="flex items-center mb-16">
            <div className="h-10 w-10 rounded-lg bg-emerald-600 flex items-center justify-center">
              <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <span className="ml-3 text-xl font-bold text-gray-900">Portal Médico</span>
          </div>

          {/* Welcome Text */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">Bienvenido de nuevo</h1>
            <p className="text-lg text-gray-600">Nos alegra verte otra vez. Accede a tu cuenta para continuar.</p>
          </div>

          {/* Login Form */}
          <LoginForm />

          {/* Register Link */}
          <div className="mt-8">
            <p className="text-gray-600">
              ¿No tienes una cuenta?{' '}
              <Link to="/register" className="font-semibold text-emerald-600 hover:text-emerald-500 transition-colors">
                Regístrate ahora
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-8 mt-auto">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <a href="#" className="hover:text-emerald-600 transition-colors">Términos y condiciones</a>
            <a href="#" className="hover:text-emerald-600 transition-colors">Política de privacidad</a>
            <a href="#" className="hover:text-emerald-600 transition-colors">Soporte</a>
          </div>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:block lg:w-[55%] xl:w-[60%] relative">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/95 to-emerald-800/95"></div>
        <img 
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay" 
          src="https://images.unsplash.com/photo-1666214280391-8ff5bd3c0bf0?q=80&w=2070&auto=format&fit=crop" 
          alt="Healthcare background" 
        />
        <div className="relative h-full flex flex-col items-start justify-end p-16 text-white">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-bold mb-6">Cuidando tu salud en cada momento</h2>
            <p className="text-xl text-white/90 mb-8">
              Accede a todos tus servicios médicos desde un solo lugar, de manera fácil y segura.
            </p>
            <div className="flex items-center space-x-4">
              <div className="flex -space-x-2">
                <img className="w-10 h-10 rounded-full border-2 border-white" src="https://randomuser.me/api/portraits/women/1.jpg" alt="User" />
                <img className="w-10 h-10 rounded-full border-2 border-white" src="https://randomuser.me/api/portraits/men/1.jpg" alt="User" />
                <img className="w-10 h-10 rounded-full border-2 border-white" src="https://randomuser.me/api/portraits/women/2.jpg" alt="User" />
              </div>
              <p className="text-sm text-white/80">Más de 1,000 pacientes confían en nosotros</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 