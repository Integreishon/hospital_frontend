import React from 'react';
import { X, Calendar, User, Stethoscope, HeartPulse, Thermometer, Wind, Droplets, AlertTriangle, ClipboardList, Pill, Beaker, FileText } from 'lucide-react';
import Modal from '../ui/Modal'; 

const MedicalRecordDetailModal = ({ record, onClose }) => {
  if (!record) return null;

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString('es-ES', {
      year: 'numeric', month: 'long', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };

  const InfoField = ({ icon: Icon, label, value, fullWidth = false }) => (
    <div className={fullWidth ? 'md:col-span-2' : ''}>
      <dt className="flex items-center text-sm font-medium text-gray-500 mb-1">
        <Icon className="w-4 h-4 mr-2 flex-shrink-0" />
        <span>{label}</span>
      </dt>
      <dd className="pl-6 text-sm text-gray-800">{value || 'No especificado'}</dd>
    </div>
  );

  const Section = ({ title, children, icon: Icon }) => (
    <div className="border-t border-gray-200 py-5">
       <h3 className="flex items-center text-lg font-semibold text-gray-900 mb-4">
        <Icon className="w-6 h-6 mr-3 text-blue-600"/>
        {title}
      </h3>
      <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
        {children}
      </dl>
    </div>
  );

  return (
    <Modal isOpen={!!record} onClose={onClose}>
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">{record.chiefComplaint}</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <X className="w-5 h-5 text-gray-500" />
          </button>
      </div>
      
      {/* Body */}
      <div className="p-6 overflow-y-auto max-h-[75vh]">
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg mb-6">
            <InfoField icon={User} label="Paciente" value={`${record.patientName} (DNI: ${record.patientDocument})`} />
            <div className="mt-3"><InfoField icon={Stethoscope} label="Atendido por" value={`${record.doctorName} (${record.doctorSpecialty})`} /></div>
            <div className="mt-3"><InfoField icon={Calendar} label="Fecha de la consulta" value={formatDate(record.recordDate)} /></div>
        </div>

        <Section title="Evaluación Clínica" icon={ClipboardList}>
            <InfoField icon={FileText} label="Síntomas Reportados" value={record.symptoms} fullWidth />
            <InfoField icon={Beaker} label="Diagnóstico" value={record.diagnosis} fullWidth />
            <InfoField icon={Pill} label="Plan de Tratamiento" value={record.treatmentPlan} fullWidth />
            <InfoField icon={FileText} label="Notas Adicionales" value={record.notes} fullWidth />
        </Section>
        
        <Section title="Signos Vitales y Mediciones" icon={HeartPulse}>
            <InfoField icon={HeartPulse} label="Presión Arterial" value={record.bloodPressure} />
            <InfoField icon={Thermometer} label="Temperatura" value={record.temperature ? `${record.temperature}°C` : 'N/A'} />
            <InfoField icon={HeartPulse} label="Ritmo Cardíaco" value={record.heartRate ? `${record.heartRate} bpm` : 'N/A'} />
            <InfoField icon={Wind} label="Ritmo Respiratorio" value={record.respiratoryRate ? `${record.respiratoryRate} rpm` : 'N/A'}/>
            <InfoField icon={Droplets} label="Saturación O₂" value={record.oxygenSaturation ? `${record.oxygenSaturation}%` : 'N/A'} />
            <InfoField icon={User} label="Peso y Altura" value={`${record.weightKg || 'N/A'} kg / ${record.heightCm || 'N/A'} cm (BMI: ${record.bmi ? record.bmi.toFixed(2) : 'N/A'})`} />
        </Section>

         <Section title="Información Adicional" icon={AlertTriangle}>
            <InfoField icon={AlertTriangle} label="Alergias" value={record.allergies} />
            <InfoField icon={Calendar} label="Requiere Seguimiento" value={record.followupRequired ? `Sí, para el ${formatDate(record.followupDate)}` : 'No'} />
        </Section>
      </div>

       {/* Footer */}
       <div className="flex justify-end p-4 bg-gray-50 border-t border-gray-200 rounded-b-xl">
        <button 
            onClick={onClose}
            className="px-6 py-2 bg-gray-600 text-white rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
        >
            Cerrar
        </button>
      </div>
    </Modal>
  );
};

export default MedicalRecordDetailModal; 