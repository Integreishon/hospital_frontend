import Card from '../../ui/Card';

export default function WelcomeCard({ userName = 'Patient' }) {
  const currentHour = new Date().getHours();
  let greeting = 'Good evening';
  
  if (currentHour < 12) {
    greeting = 'Good morning';
  } else if (currentHour < 18) {
    greeting = 'Good afternoon';
  }

  return (
    <Card className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">{greeting}, {userName}!</h2>
          <p className="mt-1 text-blue-100">Welcome to your health dashboard</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-blue-100">{new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </Card>
  );
} 