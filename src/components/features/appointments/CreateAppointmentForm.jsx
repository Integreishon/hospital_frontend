import { useState } from 'react';
import Button from '../../ui/Button';
import Input from '../../ui/Input';
import Select from '../../ui/Select';
import DatePicker from '../../ui/DatePicker';

export default function CreateAppointmentForm() {
  const [formData, setFormData] = useState({
    specialty: '',
    doctor: '',
    date: '',
    time: '',
    reason: '',
  });

  const [loading, setLoading] = useState(false);

  const specialties = [
    { value: 'cardiology', label: 'Cardiology' },
    { value: 'dermatology', label: 'Dermatology' },
    { value: 'neurology', label: 'Neurology' },
    { value: 'orthopedics', label: 'Orthopedics' },
    { value: 'pediatrics', label: 'Pediatrics' },
  ];

  const doctors = {
    cardiology: [
      { value: 'dr-johnson', label: 'Dr. Sarah Johnson' },
      { value: 'dr-patel', label: 'Dr. Raj Patel' },
    ],
    dermatology: [
      { value: 'dr-chen', label: 'Dr. Michael Chen' },
      { value: 'dr-garcia', label: 'Dr. Ana Garcia' },
    ],
    neurology: [
      { value: 'dr-rodriguez', label: 'Dr. Emily Rodriguez' },
      { value: 'dr-smith', label: 'Dr. James Smith' },
    ],
    orthopedics: [
      { value: 'dr-wilson', label: 'Dr. James Wilson' },
      { value: 'dr-brown', label: 'Dr. Lisa Brown' },
    ],
    pediatrics: [
      { value: 'dr-miller', label: 'Dr. Robert Miller' },
      { value: 'dr-davis', label: 'Dr. Patricia Davis' },
    ],
  };

  const timeSlots = [
    { value: '09:00', label: '9:00 AM' },
    { value: '09:30', label: '9:30 AM' },
    { value: '10:00', label: '10:00 AM' },
    { value: '10:30', label: '10:30 AM' },
    { value: '11:00', label: '11:00 AM' },
    { value: '11:30', label: '11:30 AM' },
    { value: '14:00', label: '2:00 PM' },
    { value: '14:30', label: '2:30 PM' },
    { value: '15:00', label: '3:00 PM' },
    { value: '15:30', label: '3:30 PM' },
    { value: '16:00', label: '4:00 PM' },
    { value: '16:30', label: '4:30 PM' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Reset doctor selection if specialty changes
    if (name === 'specialty') {
      setFormData((prev) => ({ ...prev, doctor: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Appointment data:', formData);
      setLoading(false);
      // TODO: Handle success/error
    }, 1000);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-6">Schedule New Appointment</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Specialty
          </label>
          <select
            name="specialty"
            value={formData.specialty}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Specialty</option>
            {specialties.map((specialty) => (
              <option key={specialty.value} value={specialty.value}>
                {specialty.label}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Doctor
          </label>
          <select
            name="doctor"
            value={formData.doctor}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            disabled={!formData.specialty}
          >
            <option value="">Select Doctor</option>
            {formData.specialty &&
              doctors[formData.specialty].map((doctor) => (
                <option key={doctor.value} value={doctor.value}>
                  {doctor.label}
                </option>
              ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Date
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            min={new Date().toISOString().split('T')[0]}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Time
          </label>
          <select
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            disabled={!formData.date}
          >
            <option value="">Select Time</option>
            {timeSlots.map((slot) => (
              <option key={slot.value} value={slot.value}>
                {slot.label}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Reason for Visit
          </label>
          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
            placeholder="Briefly describe your symptoms or reason for visit"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading}
        >
          {loading ? 'Scheduling...' : 'Schedule Appointment'}
        </button>
      </form>
    </div>
  );
} 