import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/features/auth/ProtectedRoute';
import sessionPersistence from './services/sessionPersistence';

// Layouts
import MainLayout from './components/layout/MainLayout';
import PublicLayout from './components/layout/PublicLayout';
import LandingLayout from './components/landing/LandingLayout';

// Public Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// Protected Pages
import DashboardPage from './pages/DashboardPage';
import AppointmentsPage from './pages/AppointmentsPage';
import CreateAppointmentPage from './pages/CreateAppointmentPage';
import MedicalRecordsPage from './pages/MedicalRecordsPage';
import ProfilePage from './pages/ProfilePage';
import PaymentStatusPage from './pages/PaymentStatusPage';
import AppointmentDetailPage from './pages/AppointmentDetailPage';

// Payment Pages
import PaymentSuccess from './pages/payment/PaymentSuccess';
import PaymentFailure from './pages/payment/PaymentFailure';
import PaymentPending from './pages/payment/PaymentPending';

function App() {
  // Inicializar el servicio de persistencia de sesión
  useEffect(() => {
    sessionPersistence.initSessionPersistence();
  }, []);

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Landing Route */}
          <Route element={<LandingLayout />}>
            <Route path="/" element={<LandingPage />} />
          </Route>

          {/* Auth Routes - No Layout */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/appointments" element={<AppointmentsPage />} />
              <Route path="/appointments/new" element={<CreateAppointmentPage />} />
              <Route path="/appointments/:id" element={<AppointmentDetailPage />} />
              <Route path="/medical-records" element={<MedicalRecordsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
          </Route>

          {/* Payment Status Route */}
          <Route path="/payment/:status" element={<PaymentStatusPage />} />
          
          {/* Mercado Pago Return Routes */}
          <Route path="/payment/success" element={<PaymentSuccess />} />
          <Route path="/payment/failure" element={<PaymentFailure />} />
          <Route path="/payment/pending" element={<PaymentPending />} />

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
