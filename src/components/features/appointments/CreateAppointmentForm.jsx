import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../ui/Button';
import Spinner from '../../ui/Spinner';
import Alert from '../../ui/Alert';
import SpecialtySelector from './SpecialtySelector';
import DoctorSelector from './DoctorSelector';
import TimeBlockSelector from './TimeBlockSelector';
import useAuth from '../../../hooks/useAuth';
import appointmentService from '../../../services/appointmentService';

export default function CreateAppointmentForm() {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    specialtyId: null,
    doctorId: null,
    appointmentDate: '',
    timeBlock: '',
    reason: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Validar si el usuario está autenticado y es un paciente
  useEffect(() => {
    if (!user) {
      navigate('/login', { state: { from: '/appointments/new' } });
    }
  }, [user, navigate]);

  const handleSpecialtySelect = (specialtyId) => {
    setFormData(prev => ({ 
      ...prev, 
      specialtyId,
      doctorId: null, // Resetear doctor al cambiar especialidad
      timeBlock: '' // Resetear bloque de tiempo
    }));
  };

  const handleDoctorSelect = (doctorId) => {
    setFormData(prev => ({ 
      ...prev, 
      doctorId,
      timeBlock: '' // Resetear bloque de tiempo al cambiar doctor
    }));
  };

  const handleDateChange = (e) => {
    setFormData(prev => ({ 
      ...prev, 
      appointmentDate: e.target.value,
      timeBlock: '' // Resetear bloque de tiempo al cambiar fecha
    }));
  };

  const handleTimeBlockSelect = (timeBlock) => {
    setFormData(prev => ({ ...prev, timeBlock }));
  };

  const handleReasonChange = (e) => {
    setFormData(prev => ({ ...prev, reason: e.target.value }));
  };

  const handleNextStep = () => {
    // Validaciones según el paso actual
    if (step === 1 && !formData.specialtyId) {
      setError('Por favor, seleccione una especialidad');
      return;
    }
    
    if (step === 2 && !formData.doctorId) {
      setError('Por favor, seleccione un médico');
      return;
    }
    
    if (step === 3 && (!formData.appointmentDate || !formData.timeBlock)) {
      setError('Por favor, seleccione una fecha y un horario');
      return;
    }
    
    // Avanzar al siguiente paso
    setError(null);
    setStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setStep(prev => prev - 1);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validación final
    if (!formData.reason.trim()) {
      setError('Por favor, ingrese el motivo de la consulta');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      // Preparar datos para enviar al backend
      const appointmentData = {
        patientId: user.id, // ID del paciente autenticado
        specialtyId: formData.specialtyId,
        doctorId: formData.doctorId,
        appointmentDate: formData.appointmentDate,
        timeBlock: formData.timeBlock,
        reason: formData.reason
      };
      
      // Llamar al servicio para crear la cita
      const response = await appointmentService.createAppointment(appointmentData);
      
      // Mostrar mensaje de éxito
      setSuccess(true);
      
      // Redireccionar después de un tiempo
      setTimeout(() => {
        navigate('/appointments');
      }, 2000);
      
    } catch (err) {
      console.error('Error al crear la cita:', err);
      setError(err.message || 'Ocurrió un error al agendar la cita. Por favor, intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  // Si la cita se creó exitosamente
  if (success) {
    return (
      <div className="bg-white rounded-xl p-8 shadow-sm text-center">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">¡Cita agendada exitosamente!</h2>
        <p className="text-gray-600 mb-6">
          Su cita ha sido programada correctamente. En breve será redirigido a la página de citas.
        </p>
        <Button onClick={() => navigate('/appointments')}>
          Ver mis citas
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      {/* Encabezado */}
      <div className="bg-emerald-500 p-6">
        <h2 className="text-xl font-bold text-white">Agendar Nueva Cita</h2>
        <p className="text-emerald-100 mt-1">Complete los siguientes pasos para agendar su cita médica</p>
        
        {/* Indicador de pasos */}
        <div className="flex items-center mt-6">
          {[1, 2, 3, 4].map((stepNumber) => (
            <div key={stepNumber} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-medium ${
                step === stepNumber 
                  ? 'bg-white text-emerald-500' 
                  : step > stepNumber
                    ? 'bg-emerald-300 text-white'
                    : 'bg-emerald-600/50 text-emerald-100'
              }`}>
                {stepNumber}
              </div>
              {stepNumber < 4 && (
                <div className={`w-12 h-1 ${
                  step > stepNumber ? 'bg-emerald-300' : 'bg-emerald-600/50'
                }`}></div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Contenido */}
      <div className="p-6">
        {error && (
          <Alert type="error" className="mb-4">
            {error}
          </Alert>
        )}
        
        <form onSubmit={handleSubmit}>
          {/* Paso 1: Selección de especialidad */}
          {step === 1 && (
            <SpecialtySelector 
              onSelect={handleSpecialtySelect} 
              selectedSpecialty={formData.specialtyId} 
            />
          )}
          
          {/* Paso 2: Selección de médico */}
          {step === 2 && (
            <DoctorSelector 
              specialtyId={formData.specialtyId} 
              onSelect={handleDoctorSelect} 
              selectedDoctor={formData.doctorId} 
            />
          )}
          
          {/* Paso 3: Selección de fecha y horario */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Seleccione una fecha</h3>
                <input
                  type="date"
                  value={formData.appointmentDate}
                  onChange={handleDateChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
              
              {formData.appointmentDate && formData.doctorId && (
                <TimeBlockSelector 
                  doctorId={formData.doctorId} 
                  date={formData.appointmentDate} 
                  onSelect={handleTimeBlockSelect} 
                  selectedTime={formData.timeBlock} 
                />
              )}
            </div>
          )}
          
          {/* Paso 4: Motivo de la consulta */}
          {step === 4 && (
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Motivo de la consulta</h3>
              <p className="text-gray-500 mb-4">Por favor, describa brevemente el motivo de su consulta para que el médico pueda prepararse adecuadamente.</p>
              
              <textarea
                value={formData.reason}
                onChange={handleReasonChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                rows="5"
                placeholder="Describa sus síntomas o el motivo de su consulta..."
                required
              ></textarea>
            </div>
          )}
          
          {/* Botones de navegación */}
          <div className="flex justify-between mt-8">
            {step > 1 && (
              <Button 
                type="button" 
                onClick={handlePrevStep} 
                variant="secondary"
                disabled={loading}
              >
                Anterior
              </Button>
            )}
            
            <div className="ml-auto">
              {step < 4 ? (
                <Button 
                  type="button" 
                  onClick={handleNextStep}
                  disabled={loading}
                >
                  Siguiente
                </Button>
              ) : (
                <Button 
                  type="submit"
                  disabled={loading}
                >
                  {loading ? <><Spinner size="sm" className="mr-2" /> Agendando...</> : 'Agendar Cita'}
                </Button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
} 