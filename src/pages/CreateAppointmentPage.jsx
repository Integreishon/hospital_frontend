import React from 'react';
import CreateAppointmentForm from '../components/features/appointments/CreateAppointmentForm';
import PageHeader from '../components/layout/PageHeader';

const CreateAppointmentPage = () => {
  return (
    <div className="p-6 md:p-8">
      <PageHeader 
        title="Agendar Cita" 
        description="Complete el formulario para agendar una nueva cita médica"
        backLink="/appointments"
        backText="Volver a mis citas"
      />
      
      <div className="mt-6">
        <CreateAppointmentForm />
      </div>
    </div>
  );
};

export default CreateAppointmentPage; 