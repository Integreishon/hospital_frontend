import { useState, useEffect } from 'react';
import Card from '../../ui/Card';

export default function DoctorSelector({ specialtyId, onSelect, selectedDoctor }) {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Mock data for different specialties
  const mockDoctorsBySpecialty = {
    cardiology: [
      { id: 'dr-johnson', name: 'Dr. Sarah Johnson', rating: 4.8, experience: '15 years', education: 'Harvard Medical School', image: null },
      { id: 'dr-patel', name: 'Dr. Raj Patel', rating: 4.9, experience: '20 years', education: 'Johns Hopkins University', image: null },
      { id: 'dr-rodriguez', name: 'Dr. Carlos Rodriguez', rating: 4.7, experience: '12 years', education: 'Stanford University', image: null },
    ],
    dermatology: [
      { id: 'dr-chen', name: 'Dr. Michael Chen', rating: 4.9, experience: '18 years', education: 'Yale University', image: null },
      { id: 'dr-garcia', name: 'Dr. Ana Garcia', rating: 4.8, experience: '14 years', education: 'UCLA Medical School', image: null },
    ],
    neurology: [
      { id: 'dr-smith', name: 'Dr. James Smith', rating: 4.7, experience: '22 years', education: 'Mayo Medical School', image: null },
      { id: 'dr-williams', name: 'Dr. Emily Williams', rating: 4.9, experience: '16 years', education: 'Columbia University', image: null },
    ],
    orthopedics: [
      { id: 'dr-wilson', name: 'Dr. Robert Wilson', rating: 4.8, experience: '25 years', education: 'University of Pennsylvania', image: null },
      { id: 'dr-brown', name: 'Dr. Lisa Brown', rating: 4.7, experience: '19 years', education: 'Duke University', image: null },
    ],
    pediatrics: [
      { id: 'dr-miller', name: 'Dr. David Miller', rating: 4.9, experience: '17 years', education: 'University of Michigan', image: null },
      { id: 'dr-davis', name: 'Dr. Patricia Davis', rating: 4.8, experience: '21 years', education: 'Baylor College of Medicine', image: null },
    ],
  };

  useEffect(() => {
    if (!specialtyId) {
      setDoctors([]);
      return;
    }

    // In a real app, this would fetch from an API
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (mockDoctorsBySpecialty[specialtyId]) {
        setDoctors(mockDoctorsBySpecialty[specialtyId]);
        setError(null);
      } else {
        setDoctors([]);
        setError('No doctors found for this specialty');
      }
      setLoading(false);
    }, 700);
  }, [specialtyId]);

  if (!specialtyId) {
    return (
      <div className="text-center text-gray-500 py-8">
        Please select a specialty first
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  if (doctors.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        No doctors available for this specialty
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Select Doctor</h3>
      <div className="space-y-4">
        {doctors.map((doctor) => (
          <div
            key={doctor.id}
            onClick={() => onSelect(doctor.id)}
            className={`cursor-pointer transition-all ${
              selectedDoctor === doctor.id
                ? 'bg-blue-50 border-blue-500 border-2'
                : 'bg-white border border-gray-200 hover:border-blue-300'
            } rounded-lg p-4`}
          >
            <div className="flex items-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full mr-4 flex items-center justify-center text-gray-500">
                {/* Placeholder for doctor image */}
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium">{doctor.name}</h4>
                <div className="flex items-center mt-1">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className={`w-4 h-4 ${i < Math.floor(doctor.rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-1 text-sm text-gray-600">{doctor.rating}</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">{doctor.experience} • {doctor.education}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 