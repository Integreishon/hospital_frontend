import { useState } from 'react';
import MainLayout from '../components/layout/MainLayout';
import AppointmentList from '../components/features/appointments/AppointmentList';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

export default function AppointmentsPage() {
  const [activeTab, setActiveTab] = useState('upcoming');

  const tabs = [
    { id: 'upcoming', label: 'Upcoming' },
    { id: 'past', label: 'Past' },
    { id: 'cancelled', label: 'Cancelled' },
  ];

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">My Appointments</h1>
        <p className="text-gray-600">Manage your upcoming and past appointments</p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  py-4 px-1 border-b-2 font-medium text-sm
                  ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <a
          href="/appointments/new"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Appointment
        </a>
      </div>

      {activeTab === 'upcoming' && (
        <div className="space-y-6">
          <Card>
            <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-blue-700">
                    Your next appointment is with <span className="font-medium">Dr. Sarah Johnson</span> on{' '}
                    <span className="font-medium">June 15, 2023 at 10:00 AM</span>.
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <AppointmentList />
        </div>
      )}

      {activeTab === 'past' && (
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-500 text-center py-8">You have no past appointments</p>
        </div>
      )}

      {activeTab === 'cancelled' && (
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-500 text-center py-8">You have no cancelled appointments</p>
        </div>
      )}
    </MainLayout>
  );
} 