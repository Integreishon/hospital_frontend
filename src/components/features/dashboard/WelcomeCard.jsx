import Card from '../../ui/Card';

export default function WelcomeCard({ userName = 'Paciente', nextAppointment }) {
  const currentHour = new Date().getHours();
  let greeting = 'Buenas noches';
  
  if (currentHour < 12) {
    greeting = 'Buenos días';
  } else if (currentHour < 18) {
    greeting = 'Buenas tardes';
  }

  // Asegurarse de que el nombre no esté vacío o sea "undefined"
  const displayName = userName && userName !== 'undefined' ? userName : 'Paciente';

  return (
    <Card className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">{greeting}, {displayName}!</h2>
          <p className="mt-1 text-blue-100">Bienvenido a tu portal de salud</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-blue-100">{new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </Card>
  );
} 