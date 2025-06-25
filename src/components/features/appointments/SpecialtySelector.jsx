import { useState, useEffect } from 'react';
import Card from '../../ui/Card';

export default function SpecialtySelector({ onSelect, selectedSpecialty }) {
  const [specialties, setSpecialties] = useState([
    { id: 'cardiology', name: 'Cardiology', icon: 'heart', description: 'Heart and cardiovascular system' },
    { id: 'dermatology', name: 'Dermatology', icon: 'skin', description: 'Skin, hair, and nails' },
    { id: 'neurology', name: 'Neurology', icon: 'brain', description: 'Brain, spinal cord, and nerves' },
    { id: 'orthopedics', name: 'Orthopedics', icon: 'bone', description: 'Bones, joints, and muscles' },
    { id: 'pediatrics', name: 'Pediatrics', icon: 'child', description: 'Children's health' },
    { id: 'ophthalmology', name: 'Ophthalmology', icon: 'eye', description: 'Eye and vision care' },
    { id: 'dentistry', name: 'Dentistry', icon: 'tooth', description: 'Teeth and oral health' },
    { id: 'gynecology', name: 'Gynecology', icon: 'female', description: 'Women's reproductive health' },
  ]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // In a real app, this would fetch from an API
  useEffect(() => {
    // Simulating API call
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

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
        Error loading specialties: {error}
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Select Specialty</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {specialties.map((specialty) => (
          <div
            key={specialty.id}
            onClick={() => onSelect(specialty.id)}
            className={`cursor-pointer transition-all ${
              selectedSpecialty === specialty.id
                ? 'bg-blue-50 border-blue-500 border-2'
                : 'bg-white border border-gray-200 hover:border-blue-300'
            } rounded-lg p-4 flex flex-col items-center`}
          >
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2">
              <div className="text-blue-500 text-xl">
                {/* Placeholder for icon */}
                {specialty.icon === 'heart' && '❤️'}
                {specialty.icon === 'skin' && '🧴'}
                {specialty.icon === 'brain' && '🧠'}
                {specialty.icon === 'bone' && '🦴'}
                {specialty.icon === 'child' && '👶'}
                {specialty.icon === 'eye' && '👁️'}
                {specialty.icon === 'tooth' && '🦷'}
                {specialty.icon === 'female' && '♀️'}
              </div>
            </div>
            <h4 className="font-medium text-center">{specialty.name}</h4>
            <p className="text-xs text-gray-500 text-center mt-1">{specialty.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
} 