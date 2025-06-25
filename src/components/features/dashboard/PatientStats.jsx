import Card from '../../ui/Card';

export default function PatientStats() {
  // This would come from an API in a real application
  const stats = [
    { title: 'Appointments', value: 12, change: '+2', changeType: 'positive' },
    { title: 'Prescriptions', value: 5, change: '0', changeType: 'neutral' },
    { title: 'Reports', value: 8, change: '+1', changeType: 'positive' },
    { title: 'Payments', value: 4, change: '-1', changeType: 'negative' },
  ];

  return (
    <Card title="Your Health Stats">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
            <h4 className="text-sm text-gray-500 mb-1">{stat.title}</h4>
            <p className="text-2xl font-bold">{stat.value}</p>
            <span className={`text-xs ${
              stat.changeType === 'positive' ? 'text-green-500' : 
              stat.changeType === 'negative' ? 'text-red-500' : 'text-gray-500'
            }`}>
              {stat.change} this month
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
} 