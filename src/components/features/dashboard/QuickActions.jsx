import React from 'react';
import { Link } from 'react-router-dom';

const Action = ({ to, icon, text, color }) => (
  <Link to={to} className={`flex flex-col items-center justify-center p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${color}`}>
    <div className="mb-3">{icon}</div>
    <span className="font-semibold text-gray-700 text-center">{text}</span>
  </Link>
);

const QuickActions = () => {
  const actions = [
    { to: "/appointments/new", icon: <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>, text: "Agendar Cita", color: "bg-emerald-50 hover:bg-emerald-100" },
    { to: "/appointments", icon: <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>, text: "Mis Citas", color: "bg-blue-50 hover:bg-blue-100" },
    { to: "/results", icon: <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>, text: "Mis Exámenes", color: "bg-purple-50 hover:bg-purple-100" },
    { to: "/doctor-online", icon: <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728m-9.9-1.414a5 5 0 010-7.072m7.072 0a5 5 0 010 7.072M12 18v-3a3 3 0 00-3-3H9m6 0h-3a3 3 0 00-3 3v3"></path></svg>, text: "Dr. Online", color: "bg-orange-50 hover:bg-orange-100" },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">¿En qué podemos ayudarte?</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {actions.map(action => <Action key={action.to} {...action} />)}
      </div>
    </div>
  );
};

export default QuickActions; 