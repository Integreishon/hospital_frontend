Estructura de Carpetas y Componentes
hospital-frontend/
├── public/
│   ├── favicon.ico
│   ├── logo-hospital.svg
│   └── medical-icons/
│
├── src/
│   ├── 📁 components/
│   │   ├── 📁 ui/                           # Componentes UI reutilizables
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Select.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Badge.jsx
│   │   │   ├── Alert.jsx
│   │   │   ├── Spinner.jsx
│   │   │   ├── Table.jsx
│   │   │   ├── Pagination.jsx
│   │   │   └── DatePicker.jsx
│   │   │
│   │   ├── 📁 layout/                       # Componentes de estructura
│   │   │   ├── Header.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── MainLayout.jsx
│   │   │   └── PublicLayout.jsx
│   │   │
│   │   └── 📁 features/                     # Componentes específicos por funcionalidad
│   │       ├── 📁 auth/
│   │       │   ├── LoginForm.jsx
│   │       │   ├── RegisterForm.jsx
│   │       │   └── ProtectedRoute.jsx
│   │       │
│   │       ├── 📁 dashboard/
│   │       │   ├── WelcomeCard.jsx
│   │       │   ├── QuickActions.jsx
│   │       │   ├── UpcomingAppointments.jsx
│   │       │   └── PatientStats.jsx
│   │       │
│   │       ├── 📁 appointments/
│   │       │   ├── AppointmentCard.jsx
│   │       │   ├── AppointmentList.jsx
│   │       │   ├── CreateAppointmentForm.jsx
│   │       │   ├── SpecialtySelector.jsx
│   │       │   ├── DoctorSelector.jsx
│   │       │   ├── TimeBlockSelector.jsx
│   │       │   ├── AppointmentCalendar.jsx
│   │       │   └── AppointmentStatus.jsx
│   │       │
│   │       ├── 📁 profile/
│   │       │   ├── ProfileForm.jsx
│   │       │   ├── PersonalInfo.jsx
│   │       │   ├── MedicalInfo.jsx
│   │       │   ├── EmergencyContacts.jsx
│   │       │   └── PasswordChange.jsx
│   │       │
│   │       ├── 📁 medical/
│   │       │   ├── MedicalRecordCard.jsx
│   │       │   ├── MedicalRecordList.jsx
│   │       │   ├── PrescriptionCard.jsx
│   │       │   ├── PrescriptionList.jsx
│   │       │   ├── MedicalDocuments.jsx
│   │       │   └── VitalSigns.jsx
│   │       │
│   │       ├── 📁 payments/
│   │       │   ├── PaymentCard.jsx
│   │       │   ├── PaymentHistory.jsx
│   │       │   ├── PaymentMethods.jsx
│   │       │   └── PaymentReceipt.jsx
│   │       │
│   │       └── 📁 notifications/
│   │           ├── NotificationBell.jsx
│   │           ├── NotificationList.jsx
│   │           ├── NotificationCard.jsx
│   │           └── NotificationSettings.jsx
│   │
│   ├── 📁 pages/                           # Componentes de nivel de página (una por ruta)
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── DashboardPage.jsx
│   │   ├── AppointmentsPage.jsx
│   │   ├── CreateAppointmentPage.jsx
│   │   ├── ProfilePage.jsx
│   │   ├── MedicalRecordsPage.jsx
│   │   ├── PaymentHistoryPage.jsx
│   │   ├── NotificationsPage.jsx
│   │   └── NotFoundPage.jsx
│   │
│   ├── 📁 services/                        # Capa de servicios API (derivada del backend)
│   │   ├── api.js
│   │   ├── authService.js
│   │   ├── patientService.js
│   │   ├── appointmentService.js
│   │   ├── medicalRecordService.js
│   │   ├── specialtyService.js
│   │   ├── doctorService.js
│   │   ├── paymentService.js
│   │   └── notificationService.js
│   │
│   ├── 📁 hooks/                           # Custom hooks
│   │   ├── useAuth.js
│   │   ├── useApi.js
│   │   ├── useLocalStorage.js
│   │   ├── useAppointments.js
│   │   ├── useMedicalRecords.js
│   │   └── useNotifications.js
│   │
│   ├── 📁 context/                         # Context providers
│   │   ├── AuthContext.jsx
│   │   ├── NotificationContext.jsx
│   │   └── ThemeContext.jsx
│   │
│   ├── 📁 utils/                           # Utilidades
│   │   ├── constants.js
│   │   ├── dateUtils.js
│   │   ├── formatters.js
│   │   ├── validators.js
│   │   └── storage.js
│   │
│   ├── 📁 assets/                          # Recursos estáticos
│   │   ├── 📁 images/
│   │   ├── 📁 icons/
│   │   └── 📁 styles/
│   │       └── globals.css
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── router.jsx
│
├── tailwind.config.js
├── package.json
├── vite.config.js
└── README.md
Definición de Responsabilidades:

components/ui: Componentes base reutilizables sin lógica de negocio
components/layout: Estructura y navegación de la aplicación
components/features: Componentes específicos con lógica de cada módulo médico
pages: Componentes de nivel de página, uno por cada ruta de la aplicación
services: Funciones para comunicación con API backend (mapeo directo de endpoints analizados)
hooks: Lógica reutilizable para estado y efectos
context: Estado global de autenticación y notificaciones
utils: Funciones de formateo, validación y utilidades médicas