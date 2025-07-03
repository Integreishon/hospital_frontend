import React, { useEffect } from 'react';

const Modal = ({ isOpen, onClose, children }) => {
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 transition-opacity duration-300"
      onClick={onClose} // Cierra al hacer clic en el overlay
    >
      <div
        className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl transform transition-transform duration-300 scale-95"
        onClick={(e) => e.stopPropagation()} // Evita que el clic en el contenido cierre el modal
      >
        {children}
      </div>
    </div>
  );
};

export default Modal; 