import { useState } from 'react';
import AppointmentCard from './AppointmentCard';
import Select from '../../ui/Select';

export default function AppointmentList() {
  // This would come from an API in a real application
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      doctorName: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      date: '2023-06-15',
      time: '10:00 AM',
      status: 'confirmed',
    },
    {
      id: 2,
      doctorName: 'Dr. Michael Chen',
      specialty: 'Dermatology',
      date: '2023-06-20',
      time: '2:30 PM',
      status: 'pending',
    },
    {
      id: 3,
      doctorName: 'Dr. Emily Rodriguez',
      specialty: 'Neurology',
      date: '2023-05-10',
      time: '9:15 AM',
      status: 'completed',
    },
    {
      id: 4,
      doctorName: 'Dr. James Wilson',
      specialty: 'Orthopedics',
      date: '2023-05-05',
      time: '11:45 AM',
      status: 'cancelled',
    },
  ]);

  const [filter, setFilter] = useState('all');

  const filteredAppointments = appointments.filter(appointment => {
    if (filter === 'all') return true;
    return appointment.status === filter;
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Your Appointments</h2>
        <div className="w-48">
          <Select 
            options={[
              { value: 'all', label: 'All Appointments' },
              { value: 'confirmed', label: 'Confirmed' },
              { value: 'pending', label: 'Pending' },
              { value: 'completed', label: 'Completed' },
              { value: 'cancelled', label: 'Cancelled' },
            ]}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
      </div>

      {filteredAppointments.length === 0 ? (
        <p className="text-center text-gray-500 py-8">No appointments found</p>
      ) : (
        <div className="space-y-4">
          {filteredAppointments.map(appointment => (
            <AppointmentCard key={appointment.id} appointment={appointment} />
          ))}
        </div>
      )}
    </div>
  );
} 