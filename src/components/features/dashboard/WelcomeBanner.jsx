import React from 'react';
import { Link } from 'react-router-dom';

const WelcomeBanner = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Card 1 */}
      <div className="relative bg-blue-500 text-white rounded-2xl p-8 overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-2">Conoce nuestros servicios</h2>
          <p className="mb-4 max-w-sm">Explora la gama completa de especialidades y tratamientos que tenemos para ti y tu familia.</p>
          <Link to="/services" className="bg-white text-blue-500 font-semibold px-5 py-2 rounded-lg hover:bg-blue-100 transition-colors">
            Ver servicios
          </Link>
        </div>
        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/20 rounded-full"></div>
        <div className="absolute right-10 top-10 w-20 h-20 bg-white/20 rounded-full"></div>
      </div>
      {/* Card 2 */}
      <div className="relative bg-emerald-500 text-white rounded-2xl p-8 overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-2">Planes de Salud</h2>
          <p className="mb-4 max-w-sm">Asegura tu bienestar y el de tu familia con nuestros planes de salud personalizados.</p>
          <Link to="/health-plans" className="bg-white text-emerald-500 font-semibold px-5 py-2 rounded-lg hover:bg-emerald-100 transition-colors">
            Descubrir planes
          </Link>
        </div>
        <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-white/20 rounded-full"></div>
        <div className="absolute left-20 top-10 w-10 h-10 bg-white/20 rounded-full"></div>
      </div>
    </div>
  );
};

export default WelcomeBanner; 