import React, { useEffect } from 'react';

const Modal = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  // Efecto para cerrar el modal con la tecla Escape
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);
  
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 transition-opacity duration-300 p-4"
      onClick={onClose} // Cierra al hacer clic en el overlay
    >
      <div
        className="relative bg-white rounded-xl shadow-2xl w-full max-w-md transform transition-transform duration-300 scale-95"
        onClick={(e) => e.stopPropagation()} // Evita que el clic en el contenido cierre el modal
      >
        {/* Botón de cierre */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Cerrar"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        
        {/* Título del modal si existe */}
        {title && (
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          </div>
        )}
        
        {/* Contenido del modal */}
        <div className="px-4 py-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal; 