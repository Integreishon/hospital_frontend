import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  // This is a simple placeholder. In a real app, you would use a context or hook to check auth status
  const isAuthenticated = localStorage.getItem('token') !== null;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
} 