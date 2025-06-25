import Card from '../../ui/Card';
import Badge from '../../ui/Badge';

export default function UpcomingAppointments() {
  // This would come from an API in a real application
  const appointments = [
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
  ];

  const getStatusBadge = (status) => {
    const statusMap = {
      confirmed: { text: 'Confirmed', variant: 'success' },
      pending: { text: 'Pending', variant: 'warning' },
      cancelled: { text: 'Cancelled', variant: 'danger' },
    };
    
    return <Badge text={statusMap[status].text} variant={statusMap[status].variant} />;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  return (
    <Card title="Upcoming Appointments">
      {appointments.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No upcoming appointments</p>
      ) : (
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div key={appointment.id} className="border-b pb-3 last:border-b-0">
              <div className="flex justify-between items-start mb-1">
                <h4 className="font-medium">{appointment.doctorName}</h4>
                {getStatusBadge(appointment.status)}
              </div>
              <p className="text-sm text-gray-600">{appointment.specialty}</p>
              <div className="flex items-center mt-2 text-sm text-gray-500">
                <span className="mr-4">{formatDate(appointment.date)}</span>
                <span>{appointment.time}</span>
              </div>
            </div>
          ))}
          <div className="text-center pt-2">
            <a href="/appointments" className="text-blue-600 hover:underline text-sm">
              View all appointments
            </a>
          </div>
        </div>
      )}
    </Card>
  );
} 