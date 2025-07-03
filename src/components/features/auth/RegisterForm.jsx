import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../../services/authService';
import toast from 'react-hot-toast';

const RegisterForm = ({ onStepChange }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    secondLastName: '',
    dni: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    birthDate: '',
    gender: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  
  // Comunicar el paso actual al componente padre cuando cambie
  useEffect(() => {
    if (onStepChange) {
      onStepChange(step);
    }
  }, [step, onStepChange]);

  const validateField = (name, value) => {
    switch (name) {
      case 'firstName':
      case 'lastName':
        return value.trim() ? '' : 'Este campo es obligatorio.';
      case 'secondLastName':
        return '';
      case 'dni':
        return /^\d{8}$/.test(value) ? '' : 'El DNI debe tener 8 dígitos.';
      case 'phone':
        return /^\d{7,15}$/.test(value) ? '' : 'El teléfono debe tener entre 7 y 15 dígitos.';
      case 'email':
        return /\S+@\S+\.\S+/.test(value) ? '' : 'El formato del email no es válido.';
      case 'password':
        return value.length >= 6 ? '' : 'La contraseña debe tener al menos 6 caracteres.';
      case 'confirmPassword':
        return value === formData.password ? '' : 'Las contraseñas no coinciden.';
      case 'birthDate':
        return value ? '' : 'La fecha de nacimiento es obligatoria.';
      case 'gender':
        return value ? '' : 'Debes seleccionar un género.';
      default:
        return '';
    }
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const validateStep = (stepNumber) => {
    const fieldsToValidate = stepNumber === 1 
      ? ['firstName', 'lastName', 'secondLastName', 'dni', 'phone', 'email'] 
      : ['password', 'confirmPassword', 'birthDate', 'gender'];
    
    const newErrors = {};
    fieldsToValidate.forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(1)) {
      setStep(2);
    } else {
      toast.error('Por favor, completa correctamente todos los campos requeridos.');
    }
  };

  const handlePrevStep = () => {
    setStep(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep(2)) {
      toast.error('Por favor, completa correctamente todos los campos requeridos.');
      return;
    }

    setIsLoading(true);
    try {
      // Exclude confirmPassword from the submitted data
      const { confirmPassword, ...patientData } = formData;
      
      await authService.register(patientData);
      
      toast.success('¡Registro exitoso! Ahora puedes iniciar sesión.');
      navigate('/login');

    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Error al registrar. Por favor, inténtalo de nuevo.';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const renderInput = (name, label, type = 'text', placeholder, required = true, icon = null) => (
    <div>
      <label htmlFor={name} className="block text-xs font-medium text-gray-700 mb-1 font-montserrat">
        {label}{required && '*'}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <input
          id={name}
          name={name}
          type={type}
          value={formData[name]}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-full ${icon ? 'pl-9' : 'pl-3'} pr-3 py-2.5 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#043464] focus:ring-2 focus:ring-[#043464]/20 transition-all duration-200 text-gray-900 placeholder:text-gray-400 font-montserrat text-sm ${errors[name] ? 'border-red-500 focus:border-red-500' : ''}`}
          placeholder={placeholder}
          required={required}
        />
      </div>
      {errors[name] && <p className="mt-1 text-xs text-red-600 font-montserrat">{errors[name]}</p>}
    </div>
  );

  return (
    <form onSubmit={step === 1 ? (e) => { e.preventDefault(); handleNextStep(); } : handleSubmit} className="space-y-4">
      {step === 1 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {renderInput('firstName', 'Nombre(s)', 'text', 'Ingresa tu nombre', true, 
              <svg className="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            )}
            {renderInput('lastName', 'Apellido Paterno', 'text', 'Ingresa tu apellido', true,
              <svg className="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            )}
          </div>
          
          <div>
            {renderInput('secondLastName', 'Apellido Materno', 'text', 'Ingresa tu apellido (opcional)', false,
              <svg className="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            )}
          </div>
          
          <div>
            {renderInput('dni', 'DNI', 'text', 'Tu DNI de 8 dígitos', true,
              <svg className="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            )}
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-xs font-medium text-gray-700 mb-1 font-montserrat">
              Número de teléfono*
            </label>
            <div className="flex">
              <div className="flex items-center px-2 py-2.5 border border-r-0 border-gray-200 bg-gray-50 rounded-l-lg">
                <img src="https://flagcdn.com/w20/pe.png" alt="Peru" className="w-4 h-3 mr-1" />
                <span className="text-xs text-gray-600 font-montserrat">+51</span>
              </div>
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full pl-9 pr-3 py-2.5 rounded-r-lg border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#043464] focus:ring-2 focus:ring-[#043464]/20 transition-all duration-200 text-gray-900 placeholder:text-gray-400 font-montserrat text-sm ${errors.phone ? 'border-red-500 focus:border-red-500' : ''}`}
                  placeholder="Tu número de teléfono"
                  required
                />
              </div>
            </div>
            {errors.phone && <p className="mt-1 text-xs text-red-600 font-montserrat">{errors.phone}</p>}
          </div>
          
          <div>
            {renderInput('email', 'Correo Electrónico', 'email', 'ejemplo@correo.com', true,
              <svg className="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            )}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-[#043464] hover:bg-[#032a52] text-white font-medium py-2.5 px-5 rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl font-montserrat text-sm"
            >
              Siguiente
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-3">
            {renderInput('password', 'Contraseña', 'password', 'Mínimo 6 caracteres', true,
              <svg className="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            )}
            {renderInput('confirmPassword', 'Confirmar Contraseña', 'password', 'Repite tu contraseña', true,
              <svg className="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="birthDate" className="block text-xs font-medium text-gray-700 mb-1 font-montserrat">
                Fecha de Nacimiento*
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  id="birthDate"
                  name="birthDate"
                  type="date"
                  value={formData.birthDate}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full pl-9 pr-3 py-2.5 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#043464] focus:ring-2 focus:ring-[#043464]/20 transition-all duration-200 text-gray-900 font-montserrat text-sm ${errors.birthDate ? 'border-red-500 focus:border-red-500' : ''}`}
                  required
                />
              </div>
              {errors.birthDate && <p className="mt-1 text-xs text-red-600 font-montserrat">{errors.birthDate}</p>}
            </div>
            
            <div>
              <label htmlFor="gender" className="block text-xs font-medium text-gray-700 mb-1 font-montserrat">
                Género*
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full pl-9 pr-3 py-2.5 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#043464] focus:ring-2 focus:ring-[#043464]/20 transition-all duration-200 text-gray-900 font-montserrat text-sm ${errors.gender ? 'border-red-500 focus:border-red-500' : ''}`}
                  required
                >
                  <option value="">Selecciona</option>
                  <option value="MALE">Masculino</option>
                  <option value="FEMALE">Femenino</option>
                  <option value="OTHER">Otro</option>
                </select>
              </div>
              {errors.gender && <p className="mt-1 text-xs text-red-600 font-montserrat">{errors.gender}</p>}
            </div>
          </div>

          <div className="pt-2 flex space-x-3">
            <button
              type="button"
              onClick={handlePrevStep}
              className="w-1/3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2.5 px-4 rounded-lg transition-all duration-300 font-montserrat text-sm"
            >
              Atrás
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="w-2/3 bg-[#043464] hover:bg-[#032a52] text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl disabled:opacity-50 disabled:transform-none font-montserrat text-sm"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span className="font-montserrat">Registrando...</span>
                </div>
              ) : (
                <span className="font-montserrat">Registrarme</span>
              )}
            </button>
          </div>
        </>
      )}
    </form>
  );
};

export default RegisterForm; 