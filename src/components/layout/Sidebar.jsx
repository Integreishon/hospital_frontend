export default function Sidebar() {
  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: 'home' },
    { name: 'Appointments', href: '/appointments', icon: 'calendar' },
    { name: 'Medical Records', href: '/medical-records', icon: 'document' },
    { name: 'Profile', href: '/profile', icon: 'user' },
    { name: 'Payments', href: '/payments', icon: 'credit-card' },
    { name: 'Notifications', href: '/notifications', icon: 'bell' },
  ];

  return (
    <div className="h-screen w-64 bg-white border-r border-gray-200">
      <div className="h-16 flex items-center px-6">
        <span className="text-xl font-bold text-blue-600">HMS</span>
      </div>
      <nav className="mt-5 px-3">
        <div className="space-y-1">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            >
              <span>{item.name}</span>
            </a>
          ))}
        </div>
      </nav>
    </div>
  );
} 