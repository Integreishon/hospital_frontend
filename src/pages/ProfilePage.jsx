import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import api from '../services/api';
import { toast } from 'react-hot-toast';
import { UserIcon } from '@heroicons/react/24/outline';
import { Tab } from '@headlessui/react';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('personal');
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(null);
  
  // Estados para los campos del formulario
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    secondLastName: '',
    dni: '',
    email: '',
    phone: '',
    address: '',
    birthDate: '',
    gender: '',
    bloodType: '',
    allergies: '',
    medicalHistory: '',
    emergencyContactName: '',
    emergencyContactPhone: ''
  });

  // Función para cambiar de tab
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Enviar formulario
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    
    setLoading(true);
    try {
      // Preparar datos para enviar
      let genderToSend = formData.gender;
      
      // Convertir el género si viene como texto a formato ENUM
      if (genderToSend === 'Masculino') {
        genderToSend = 'MALE';
      } else if (genderToSend === 'Femenino') {
        genderToSend = 'FEMALE';
      } else if (genderToSend === 'Otro') {
        genderToSend = 'OTHER';
      }
      
      // Normalizar bloodType
      let bloodTypeToSend = null;
      if (formData.bloodType) {
        if (formData.bloodType === 'A+' || formData.bloodType === 'A_POSITIVE') {
          bloodTypeToSend = 'A_POSITIVE';
        } else if (formData.bloodType === 'A-' || formData.bloodType === 'A_NEGATIVE') {
          bloodTypeToSend = 'A_NEGATIVE';
        } else if (formData.bloodType === 'B+' || formData.bloodType === 'B_POSITIVE') {
          bloodTypeToSend = 'B_POSITIVE';
        } else if (formData.bloodType === 'B-' || formData.bloodType === 'B_NEGATIVE') {
          bloodTypeToSend = 'B_NEGATIVE';
        } else if (formData.bloodType === 'AB+' || formData.bloodType === 'AB_POSITIVE') {
          bloodTypeToSend = 'AB_POSITIVE';
        } else if (formData.bloodType === 'AB-' || formData.bloodType === 'AB_NEGATIVE') {
          bloodTypeToSend = 'AB_NEGATIVE';
        } else if (formData.bloodType === 'O+' || formData.bloodType === 'O_POSITIVE') {
          bloodTypeToSend = 'O_POSITIVE';
        } else if (formData.bloodType === 'O-' || formData.bloodType === 'O_NEGATIVE') {
          bloodTypeToSend = 'O_NEGATIVE';
        } else {
          bloodTypeToSend = formData.bloodType;
        }
      }
      
      // Formatear fecha correctamente
      let formattedBirthDate = null;
      if (formData.birthDate) {
        formattedBirthDate = formatDateForBackend(formData.birthDate);
        // Verificar si la fecha es válida
        if (!isValidDate(formattedBirthDate)) {
          toast.error("La fecha de nacimiento no tiene un formato válido. Use DD/MM/YYYY.");
          setLoading(false);
          return;
        }
      }
      
      // Validar teléfono
      if (formData.phone && !isValidPhone(formData.phone)) {
        toast.error("El número de teléfono debe tener entre 7 y 15 dígitos.");
        setLoading(false);
        return;
      }
      
      // Validar teléfono de emergencia si existe
      if (formData.emergencyContactPhone && !isValidPhone(formData.emergencyContactPhone)) {
        toast.error("El número de teléfono de emergencia debe tener entre 7 y 15 dígitos.");
        setLoading(false);
        return;
      }
      
      // Preparar datos para enviar
      const dataToSend = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        secondLastName: formData.secondLastName || null, // Enviar null si está vacío
        email: formData.email,
        phone: formData.phone,
        address: formData.address || null, // Enviar null si está vacío
        birthDate: formattedBirthDate,
        gender: genderToSend,
        bloodType: bloodTypeToSend,
        allergies: formData.allergies || null, // Enviar null si está vacío
        medicalHistory: formData.medicalHistory || null, // Enviar null si está vacío
        emergencyContactName: formData.emergencyContactName || null, // Enviar null si está vacío
        emergencyContactPhone: formData.emergencyContactPhone || null // Enviar null si está vacío
      };
      
      console.log("Datos a enviar:", dataToSend);
      
      const response = await api.put('/patients/profile', dataToSend);
      
      if (response.success) {
        toast.success("Perfil actualizado correctamente");
        setProfile(response.data);
    setIsEditing(false);
        
        // Recargar los datos del perfil después de actualizar
        window.location.reload();
      } else {
        toast.error("No se pudo actualizar el perfil");
      }
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
      
      // Mostrar mensaje de error más específico
      if (error.message && error.message.includes("Errores de validación")) {
        toast.error("Error: Hay campos inválidos. Verifica los datos ingresados.");
      } else if (error.message && error.message.includes("fecha de nacimiento")) {
        toast.error("Error: El formato de fecha de nacimiento es inválido.");
      } else if (error.message && error.message.includes("teléfono")) {
        toast.error("Error: El formato de teléfono es inválido.");
      } else {
        toast.error(error.message || "Error al actualizar el perfil");
      }
    } finally {
      setLoading(false);
    }
  };

  // Función para validar el formato de teléfono
  const isValidPhone = (phone) => {
    return /^[+]?[0-9]{7,15}$/.test(phone);
  };
  
  // Función para validar si una fecha es válida
  const isValidDate = (dateString) => {
    if (!dateString) return false;
    
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateString)) return false;
    
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date) && date < new Date();
  };

  // Formatear fecha de DD/MM/YYYY a YYYY-MM-DD para el backend
  const formatDateForBackend = (dateString) => {
    if (!dateString) return null;
    
    // Si ya está en formato YYYY-MM-DD, devolverlo tal cual
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
      return dateString;
    }
    
    // Detectar si el formato es DD/MM/YYYY
    if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString)) {
      const parts = dateString.split('/');
      if (parts.length === 3) {
        const [day, month, year] = parts;
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
      }
    }
    
    // Si no se puede convertir, devolver null
    return null;
  };

  // Redirigir si el usuario no está autenticado
  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Debes iniciar sesión para acceder a tu perfil");
      navigate('/login');
      return; // Evita que se ejecute el resto del código si no hay autenticación
    }
  }, [isAuthenticated, navigate]);

  // Cargar los datos del perfil
  useEffect(() => {
    // No cargar el perfil si no hay autenticación
    if (!isAuthenticated) return;
    
    const fetchProfile = async () => {
      setLoading(true);
      try {
        // Intentar 3 veces con un pequeño retraso entre intentos
        let response;
        let attempts = 0;
        const maxAttempts = 3;
        
        while (attempts < maxAttempts) {
          try {
            response = await api.get('/patients/profile');
            if (response && response.success) {
              break; // Si tiene éxito, salir del bucle
            }
            throw new Error("Respuesta inválida del servidor");
          } catch (error) {
            attempts++;
            console.log(`Intento ${attempts} fallido: ${error.message}`);
            if (attempts >= maxAttempts) throw error;
            // Esperar un poco antes de reintentar (incrementar tiempo entre intentos)
            await new Promise(resolve => setTimeout(resolve, 1000 * attempts));
          }
        }
        
        console.log("Respuesta completa de la API:", response);
        
        // Examinar la estructura de la respuesta para determinar dónde están los datos del paciente
        let patientData = null;
        
        if (response && response.success) {
          // Verificar si los datos están en response.data directamente o anidados
          if (response.data && typeof response.data === 'object') {
            if (response.data.data) {
              // Los datos pueden estar anidados en response.data.data
              console.log("Datos anidados encontrados en response.data.data");
              patientData = response.data.data;
            } else {
              // Los datos pueden estar directamente en response.data
              console.log("Datos encontrados directamente en response.data");
              patientData = response.data;
            }
          }
        }
        
        console.log("Datos del paciente extraídos:", patientData);
        
        if (patientData) {
          setProfile(patientData);
          
          // Mostrar todos los campos recibidos
          console.log("Campos disponibles:", Object.keys(patientData));
          
          // Formatear fecha de YYYY-MM-DD a DD/MM/YYYY para la visualización
          let formattedBirthDate = patientData.birthDate;
          if (formattedBirthDate && formattedBirthDate.includes('-')) {
            const [year, month, day] = formattedBirthDate.split('-');
            formattedBirthDate = `${day}/${month}/${year}`;
          }
          
          // Normalizar el género para el formulario (convertir de texto a enum)
          let genderValue = patientData.gender;
          
          // Si el género viene como texto, convertirlo al enum correspondiente
          if (typeof genderValue === 'string') {
            if (genderValue === 'Masculino') {
              genderValue = 'MALE';
            } else if (genderValue === 'Femenino') {
              genderValue = 'FEMALE';
            } else if (genderValue === 'Otro') {
              genderValue = 'OTHER';
            }
          }
          
          // Normalizar el tipo de sangre para el formulario
          let bloodTypeValue = patientData.bloodType;
          
          // Convertir de display name a valor ENUM si es necesario
          if (bloodTypeValue === 'A+') {
            bloodTypeValue = 'A_POSITIVE';
          } else if (bloodTypeValue === 'A-') {
            bloodTypeValue = 'A_NEGATIVE';
          } else if (bloodTypeValue === 'B+') {
            bloodTypeValue = 'B_POSITIVE';
          } else if (bloodTypeValue === 'B-') {
            bloodTypeValue = 'B_NEGATIVE';
          } else if (bloodTypeValue === 'AB+') {
            bloodTypeValue = 'AB_POSITIVE';
          } else if (bloodTypeValue === 'AB-') {
            bloodTypeValue = 'AB_NEGATIVE';
          } else if (bloodTypeValue === 'O+') {
            bloodTypeValue = 'O_POSITIVE';
          } else if (bloodTypeValue === 'O-') {
            bloodTypeValue = 'O_NEGATIVE';
          }
          
          setFormData({
            firstName: patientData.firstName || '',
            lastName: patientData.lastName || '',
            secondLastName: patientData.secondLastName || '',
            dni: patientData.dni || '',
            email: patientData.email || '',
            phone: patientData.phone || '',
            address: patientData.address || '',
            birthDate: formattedBirthDate || '',
            gender: genderValue,
            bloodType: bloodTypeValue || '',
            allergies: patientData.allergies || '',
            medicalHistory: patientData.medicalHistory || '',
            emergencyContactName: patientData.emergencyContactName || '',
            emergencyContactPhone: patientData.emergencyContactPhone || ''
          });
        } else {
          console.error("No se encontraron datos de paciente válidos en la respuesta");
          toast.error("No se pudo cargar la información del perfil");
          
          // Si hay datos del usuario en el contexto, usar esos como respaldo
          if (user) {
            setFormData(prevState => ({
              ...prevState,
              firstName: user.firstName || user.nombre || '',
              lastName: user.lastName || user.apellidoPaterno || '',
              email: user.email || ''
            }));
          }
        }
      } catch (error) {
        console.error("Error al cargar el perfil:", error);
        
        if (error.message && error.message.includes("Token no válido")) {
          toast.error("Tu sesión ha expirado. Por favor, vuelve a iniciar sesión.");
          setTimeout(() => {
            navigate('/login');
          }, 2000);
        } else {
          toast.error("No se pudo cargar tu información de perfil");
          
          // Si hay datos del usuario en el contexto, usar esos como respaldo
          if (user) {
            setFormData(prevState => ({
              ...prevState,
              firstName: user.firstName || user.nombre || '',
              lastName: user.lastName || user.apellidoPaterno || '',
              email: user.email || ''
            }));
          }
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfile();
  }, [isAuthenticated, navigate, user]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="border-b border-gray-200">
              <Tab.Group>
                <Tab.List className="flex p-1 space-x-1 bg-blue-50">
                  <Tab
                    className={({ selected }) =>
                      `w-full py-2.5 text-sm font-medium text-blue-700 rounded-lg ${
                        selected
                          ? 'bg-white shadow'
                          : 'text-blue-500 hover:bg-white/[0.12]'
                      }`
                    }
                    onClick={() => handleTabChange('personal')}
          >
            Información Personal
                  </Tab>
                  <Tab
                    className={({ selected }) =>
                      `w-full py-2.5 text-sm font-medium text-blue-700 rounded-lg ${
                        selected
                          ? 'bg-white shadow'
                          : 'text-blue-500 hover:bg-white/[0.12]'
                      }`
                    }
                    onClick={() => handleTabChange('medical')}
                  >
                    Información Médica
                  </Tab>
                  <Tab
                    className={({ selected }) =>
                      `w-full py-2.5 text-sm font-medium text-blue-700 rounded-lg ${
                        selected
                          ? 'bg-white shadow'
                          : 'text-blue-500 hover:bg-white/[0.12]'
                      }`
                    }
                    onClick={() => handleTabChange('emergency')}
                  >
                    Contacto de Emergencia
                  </Tab>
                </Tab.List>
              </Tab.Group>
      </div>

            {/* Tab Información Personal */}
        {activeTab === 'personal' && (
          <div className="p-6">
            <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                        <UserIcon className="w-12 h-12 text-gray-500" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold">
                          {`${formData.firstName} ${formData.lastName} ${formData.secondLastName || ''}`}
                        </h2>
                        <p className="text-gray-600">{formData.email}</p>
                        <p className="text-gray-600">DNI: {formData.dni}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                          Nombres
                  </label>
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                      disabled={!isEditing}
                          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${!isEditing && 'bg-gray-50'}`}
                    />
                </div>

                      <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                          Apellido Paterno
                  </label>
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          disabled={!isEditing}
                          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${!isEditing && 'bg-gray-50'}`}
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="secondLastName" className="block text-sm font-medium text-gray-700">
                          Apellido Materno
                        </label>
                        <input
                          type="text"
                          name="secondLastName"
                          id="secondLastName"
                          value={formData.secondLastName}
                          onChange={handleChange}
                      disabled={!isEditing}
                          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${!isEditing && 'bg-gray-50'}`}
                    />
                  </div>
                      
                      <div>
                        <label htmlFor="dni" className="block text-sm font-medium text-gray-700">
                          DNI
                        </label>
                        <input
                          type="text"
                          name="dni"
                          id="dni"
                          value={formData.dni}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-gray-50"
                          disabled={true}
                          readOnly
                        />
                </div>

                      <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                          Correo Electrónico
                  </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                          value={formData.email}
                          onChange={handleChange}
                          disabled={!isEditing}
                          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${!isEditing && 'bg-gray-50'}`}
                        />
                </div>

                      <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Teléfono
                  </label>
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                          value={formData.phone}
                          onChange={handleChange}
                      disabled={!isEditing}
                          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${!isEditing && 'bg-gray-50'}`}
                    />
                </div>

                      <div>
                        <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700">
                          Fecha de Nacimiento
                  </label>
                    <input
                      type="text"
                          name="birthDate"
                          id="birthDate"
                          value={formData.birthDate}
                          onChange={handleChange}
                      disabled={!isEditing}
                          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${!isEditing && 'bg-gray-50'}`}
                    />
                </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Género</label>
                        <div className="mt-2 space-y-2">
                          <div className="flex items-center">
                            <input
                              id="gender-male"
                              name="gender"
                              type="radio"
                              value="MALE"
                              checked={formData.gender === 'MALE'}
                              onChange={handleChange}
                              disabled={!isEditing}
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label htmlFor="gender-male" className="ml-3 block text-sm font-medium text-gray-700">
                              Masculino
                  </label>
                          </div>
                          <div className="flex items-center">
                    <input
                              id="gender-female"
                              name="gender"
                              type="radio"
                              value="FEMALE"
                              checked={formData.gender === 'FEMALE'}
                              onChange={handleChange}
                      disabled={!isEditing}
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                            <label htmlFor="gender-female" className="ml-3 block text-sm font-medium text-gray-700">
                              Femenino
                            </label>
                  </div>
                          <div className="flex items-center">
                    <input
                              id="gender-other"
                              name="gender"
                              type="radio"
                              value="OTHER"
                              checked={formData.gender === 'OTHER'}
                              onChange={handleChange}
                      disabled={!isEditing}
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                            <label htmlFor="gender-other" className="ml-3 block text-sm font-medium text-gray-700">
                              Otro
                            </label>
                          </div>
                  </div>
                </div>

                      <div className="md:col-span-2">
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                          Dirección
                  </label>
                    <input
                      type="text"
                          name="address"
                          id="address"
                          value={formData.address}
                          onChange={handleChange}
                      disabled={!isEditing}
                          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${!isEditing && 'bg-gray-50'}`}
                    />
                </div>
              </div>

                    <div className="flex justify-end space-x-3">
                      {!isEditing ? (
                        <button
                          type="button"
                          onClick={() => setIsEditing(true)}
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Editar Información
                        </button>
                      ) : (
                        <>
                          <button
                            type="button"
                            onClick={() => setIsEditing(false)}
                            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            Cancelar
                          </button>
                  <button
                    type="submit"
                            disabled={loading}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                            {loading ? 'Guardando...' : 'Guardar Cambios'}
                  </button>
                        </>
                      )}
                    </div>
                </div>
            </form>
          </div>
        )}

            {/* Tab Información Médica */}
        {activeTab === 'medical' && (
          <div className="p-6">
                <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="bloodType" className="block text-sm font-medium text-gray-700">
                        Grupo Sanguíneo
                      </label>
                      <select
                        id="bloodType"
                        name="bloodType"
                        value={formData.bloodType}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${!isEditing && 'bg-gray-50'}`}
                      >
                        <option value="">Seleccionar...</option>
                        <option value="A_POSITIVE">A+</option>
                        <option value="A_NEGATIVE">A-</option>
                        <option value="B_POSITIVE">B+</option>
                        <option value="B_NEGATIVE">B-</option>
                        <option value="AB_POSITIVE">AB+</option>
                        <option value="AB_NEGATIVE">AB-</option>
                        <option value="O_POSITIVE">O+</option>
                        <option value="O_NEGATIVE">O-</option>
                      </select>
            </div>

                    <div>
                      <label htmlFor="allergies" className="block text-sm font-medium text-gray-700">
                        Alergias
                      </label>
                      <textarea
                        id="allergies"
                        name="allergies"
                        rows="3"
                        value={formData.allergies}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${!isEditing && 'bg-gray-50'}`}
                        placeholder="Indique sus alergias conocidas"
                      ></textarea>
                </div>
                    
                    <div>
                      <label htmlFor="medicalHistory" className="block text-sm font-medium text-gray-700">
                        Historial Médico
                      </label>
                      <textarea
                        id="medicalHistory"
                        name="medicalHistory"
                        rows="5"
                        value={formData.medicalHistory}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${!isEditing && 'bg-gray-50'}`}
                        placeholder="Incluya información relevante sobre su historial médico"
                      ></textarea>
                </div>
                    
                    <div className="flex justify-end space-x-3">
                      {!isEditing ? (
                        <button
                          type="button"
                          onClick={() => setIsEditing(true)}
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Editar Información
                        </button>
                      ) : (
                        <>
                          <button
                            type="button"
                            onClick={() => setIsEditing(false)}
                            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            Cancelar
                          </button>
                          <button
                            type="submit"
                            disabled={loading}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            {loading ? 'Guardando...' : 'Guardar Cambios'}
                          </button>
                        </>
                      )}
            </div>
                  </div>
                </form>
          </div>
        )}

            {/* Tab Contacto de Emergencia */}
            {activeTab === 'emergency' && (
          <div className="p-6">
                <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                      <label htmlFor="emergencyContactName" className="block text-sm font-medium text-gray-700">
                        Nombre del Contacto de Emergencia
                      </label>
                        <input
                        type="text"
                        name="emergencyContactName"
                        id="emergencyContactName"
                        value={formData.emergencyContactName}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${!isEditing && 'bg-gray-50'}`}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="emergencyContactPhone" className="block text-sm font-medium text-gray-700">
                        Teléfono del Contacto de Emergencia
                      </label>
                        <input
                        type="tel"
                        name="emergencyContactPhone"
                        id="emergencyContactPhone"
                        value={formData.emergencyContactPhone}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${!isEditing && 'bg-gray-50'}`}
                      />
                </div>

                    <div className="flex justify-end space-x-3">
                      {!isEditing ? (
                        <button
                          type="button"
                          onClick={() => setIsEditing(true)}
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Editar Información
                        </button>
                      ) : (
                        <>
                    <button
                      type="button"
                            onClick={() => setIsEditing(false)}
                            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            Cancelar
                          </button>
                          <button
                            type="submit"
                            disabled={loading}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            {loading ? 'Guardando...' : 'Guardar Cambios'}
                    </button>
                        </>
                      )}
                    </div>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 