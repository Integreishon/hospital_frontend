import Badge from '../../ui/Badge';
import Card from '../../ui/Card';

export default function AppointmentCard({ appointment }) {
  const { doctorName, specialty, date, time, status } = appointment;

  const getStatusBadge = (status) => {
    const statusMap = {
      confirmed: { text: 'Confirmed', variant: 'success' },
      pending: { text: 'Pending', variant: 'warning' },
      cancelled: { text: 'Cancelled', variant: 'danger' },
      completed: { text: 'Completed', variant: 'primary' },
    };
    
    return <Badge text={statusMap[status]?.text || status} variant={statusMap[status]?.variant || 'primary'} />;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  };

  return (
    <Card className="mb-4 hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        <div>
          <div className="flex items-center mb-2">
            <h3 className="font-medium text-lg">{doctorName}</h3>
            <div className="ml-3">{getStatusBadge(status)}</div>
          </div>
          <p className="text-gray-600 mb-1">{specialty}</p>
          <div className="text-sm text-gray-500">
            <p>{formatDate(date)}</p>
            <p>{time}</p>
          </div>
        </div>
        <div className="mt-4 md:mt-0 flex flex-col md:items-end">
          <div className="flex space-x-2 mt-2">
            <button className="px-4 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200">
              Reschedule
            </button>
            <button className="px-4 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
} 