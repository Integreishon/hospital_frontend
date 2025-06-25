import Card from '../../ui/Card';
import Button from '../../ui/Button';

export default function QuickActions() {
  const actions = [
    { title: 'Book Appointment', icon: 'calendar', link: '/appointments/new' },
    { title: 'View Medical Records', icon: 'file-medical', link: '/medical-records' },
    { title: 'Make a Payment', icon: 'credit-card', link: '/payments' },
    { title: 'Contact Support', icon: 'headset', link: '/support' },
  ];

  return (
    <Card title="Quick Actions">
      <div className="grid grid-cols-2 gap-4">
        {actions.map((action, index) => (
          <a 
            key={index} 
            href={action.link}
            className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="mr-3 bg-blue-100 rounded-full p-2 text-blue-600">
              {/* Placeholder for icon */}
              <div className="w-5 h-5"></div>
            </div>
            <span className="font-medium text-gray-700">{action.title}</span>
          </a>
        ))}
      </div>
    </Card>
  );
} 