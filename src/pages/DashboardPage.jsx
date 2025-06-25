import MainLayout from '../components/layout/MainLayout';
import WelcomeCard from '../components/features/dashboard/WelcomeCard';
import QuickActions from '../components/features/dashboard/QuickActions';
import UpcomingAppointments from '../components/features/dashboard/UpcomingAppointments';
import PatientStats from '../components/features/dashboard/PatientStats';

export default function DashboardPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <WelcomeCard userName="John Doe" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <QuickActions />
          </div>
          <div>
            <UpcomingAppointments />
          </div>
        </div>
        
        <PatientStats />
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-start pb-4 border-b">
              <div className="bg-blue-100 rounded-full p-2 mr-4">
                <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
              </div>
              <div>
                <h4 className="font-medium">Lab Results Available</h4>
                <p className="text-sm text-gray-600">Your recent blood work results are now available.</p>
                <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start pb-4 border-b">
              <div className="bg-green-100 rounded-full p-2 mr-4">
                <div className="w-6 h-6 bg-green-500 rounded-full"></div>
              </div>
              <div>
                <h4 className="font-medium">Prescription Renewed</h4>
                <p className="text-sm text-gray-600">Dr. Johnson renewed your prescription for Lisinopril.</p>
                <p className="text-xs text-gray-500 mt-1">Yesterday</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-yellow-100 rounded-full p-2 mr-4">
                <div className="w-6 h-6 bg-yellow-500 rounded-full"></div>
              </div>
              <div>
                <h4 className="font-medium">Appointment Reminder</h4>
                <p className="text-sm text-gray-600">You have an appointment with Dr. Chen next week.</p>
                <p className="text-xs text-gray-500 mt-1">2 days ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 