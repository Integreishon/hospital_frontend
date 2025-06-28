import React from 'react';

/**
 * Componente Spinner para indicar carga
 * @param {Object} props - Propiedades del componente
 * @param {string} [props.size='md'] - Tamaño del spinner: 'sm', 'md', 'lg', 'xl'
 * @param {string} [props.color='emerald'] - Color del spinner: 'emerald', 'blue', 'gray', 'red', etc.
 * @param {string} [props.className] - Clases adicionales
 */
const Spinner = ({ size = 'md', color = 'emerald', className = '' }) => {
  // Configuración de tamaños
  const sizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-2',
    lg: 'w-12 h-12 border-3',
    xl: 'w-16 h-16 border-4'
  };

  // Configuración de colores
  const colors = {
    emerald: 'border-emerald-500',
    blue: 'border-blue-500',
    gray: 'border-gray-500',
    red: 'border-red-500',
    yellow: 'border-yellow-500',
    purple: 'border-purple-500'
  };

  const sizeClass = sizes[size] || sizes.md;
  const colorClass = colors[color] || colors.emerald;

  return (
    <div className={`${sizeClass} ${className} rounded-full border-t-transparent animate-spin ${colorClass}`}></div>
  );
};

export default Spinner; 