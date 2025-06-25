import { useState } from 'react';
import MedicalRecordCard from './MedicalRecordCard';
import Select from '../../ui/Select';

export default function MedicalRecordList() {
  // This would come from an API in a real application
  const [records, setRecords] = useState([
    {
      id: 1,
      date: '2023-05-15',
      doctorName: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      diagnosis: 'Hypertension',
      notes: 'Patient presented with elevated blood pressure. Recommended lifestyle changes and prescribed medication.',
      prescriptions: ['Lisinopril 10mg, once daily'],
      type: 'consultation',
    },
    {
      id: 2,
      date: '2023-04-20',
      doctorName: 'Dr. Michael Chen',
      specialty: 'Dermatology',
      diagnosis: 'Eczema',
      notes: 'Patient has patches of dry, itchy skin on arms. Prescribed topical corticosteroid.',
      prescriptions: ['Hydrocortisone 1% cream, apply twice daily to affected areas'],
      type: 'consultation',
    },
    {
      id: 3,
      date: '2023-03-10',
      doctorName: 'Lab Services',
      specialty: 'Laboratory',
      notes: 'Complete blood count and lipid panel.',
      attachments: [
        { name: 'CBC Results.pdf', url: '#' },
        { name: 'Lipid Panel.pdf', url: '#' },
      ],
      type: 'lab',
    },
    {
      id: 4,
      date: '2023-02-05',
      doctorName: 'Dr. Emily Rodriguez',
      specialty: 'Neurology',
      diagnosis: 'Tension headaches',
      notes: 'Patient reports frequent headaches, particularly during stressful periods at work. Recommended stress management techniques and OTC pain relievers as needed.',
      type: 'consultation',
    },
  ]);

  const [filter, setFilter] = useState('all');

  const filteredRecords = records.filter(record => {
    if (filter === 'all') return true;
    return record.type === filter;
  });

  const recordTypes = [
    { value: 'all', label: 'All Records' },
    { value: 'consultation', label: 'Consultations' },
    { value: 'lab', label: 'Lab Results' },
    { value: 'imaging', label: 'Imaging' },
    { value: 'surgery', label: 'Surgeries' },
    { value: 'followup', label: 'Follow-ups' },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Medical Records</h2>
        <div className="w-48">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {recordTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filteredRecords.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <svg className="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="mt-2 text-gray-500">No medical records found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredRecords.map((record) => (
            <MedicalRecordCard key={record.id} record={record} />
          ))}
        </div>
      )}
    </div>
  );
} 