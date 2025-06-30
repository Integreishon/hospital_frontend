import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../ui/Button';
import { authService } from '../../../services/authService';
import toast from 'react-hot-toast';

const RegisterForm = () => {
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
  const navigate = useNavigate();

  const validateField = (name, value) => {
    switch (name) {
      case 'firstName':
      case 'lastName':
        return value.trim() ? '' : 'Este campo es obligatorio.';
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields on submit
    const newErrors = Object.keys(formData).reduce((acc, key) => {
      const error = validateField(key, formData[key]);
      if (error) acc[key] = error;
      return acc;
    }, {});

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      toast.error('Por favor, corrige los errores en el formulario.');
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

  const renderInput = (name, label, type = 'text', placeholder) => (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={formData[name]}
        onChange={handleChange}
        onBlur={handleBlur}
        className={`mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 text-gray-900 py-2 ${errors[name] ? 'border-red-500' : ''}`}
        placeholder={placeholder}
      />
      {errors[name] && <p className="mt-1 text-xs text-red-600">{errors[name]}</p>}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {renderInput('firstName', 'Nombre(s)', 'text', 'Ingresa tu nombre')}
      {renderInput('lastName', 'Apellido Paterno', 'text', 'Ingresa tu apellido paterno')}
      {renderInput('secondLastName', 'Apellido Materno', 'text', 'Ingresa tu apellido materno (opcional)')}
      {renderInput('dni', 'DNI', 'text', 'Tu DNI de 8 dígitos')}
      {renderInput('phone', 'Teléfono / Celular', 'tel', 'Tu número de teléfono')}
      {renderInput('email', 'Correo Electrónico', 'email', 'ejemplo@correo.com')}
      {renderInput('password', 'Contraseña', 'password', 'Mínimo 6 caracteres')}
      {renderInput('confirmPassword', 'Confirmar Contraseña', 'password', 'Vuelve a escribir tu contraseña')}
      {renderInput('birthDate', 'Fecha de Nacimiento', 'date', '')}
      
      <div>
        <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Género</label>
        <select
          id="gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 text-gray-900 py-2 ${errors.gender ? 'border-red-500' : ''}`}
        >
          <option value="">Selecciona tu género</option>
          <option value="MALE">Masculino</option>
          <option value="FEMALE">Femenino</option>
          <option value="OTHER">Otro</option>
        </select>
        {errors.gender && <p className="mt-1 text-xs text-red-600">{errors.gender}</p>}
      </div>

      <div className="md:col-span-2">
        <Button
          type="submit"
          className="w-full flex justify-center py-2 px-4"
          disabled={isLoading}
        >
          {isLoading ? 'Registrando...' : 'Crear Cuenta'}
        </Button>
      </div>
    </form>
  );
};

export default RegisterForm; 