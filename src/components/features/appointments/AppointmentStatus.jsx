import Badge from '../../ui/Badge';

export default function AppointmentStatus({ status, showLabel = true }) {
  const getStatusInfo = (status) => {
    const statusMap = {
      confirmed: {
        label: 'Confirmed',
        variant: 'success',
        description: 'Your appointment has been confirmed',
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        ),
      },
      pending: {
        label: 'Pending',
        variant: 'warning',
        description: 'Your appointment is pending confirmation',
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ),
      },
      cancelled: {
        label: 'Cancelled',
        variant: 'danger',
        description: 'Your appointment has been cancelled',
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ),
      },
      completed: {
        label: 'Completed',
        variant: 'primary',
        description: 'Your appointment has been completed',
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ),
      },
      rescheduled: {
        label: 'Rescheduled',
        variant: 'warning',
        description: 'Your appointment has been rescheduled',
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        ),
      },
    };

    return statusMap[status] || {
      label: status,
      variant: 'primary',
      description: 'Appointment status',
      icon: null,
    };
  };

  const statusInfo = getStatusInfo(status);

  if (!showLabel) {
    return <Badge text={statusInfo.label} variant={statusInfo.variant} />;
  }

  return (
    <div className="flex items-center">
      <div className={`p-2 rounded-full mr-3 ${
        statusInfo.variant === 'success' ? 'bg-green-100 text-green-600' :
        statusInfo.variant === 'warning' ? 'bg-yellow-100 text-yellow-600' :
        statusInfo.variant === 'danger' ? 'bg-red-100 text-red-600' :
        'bg-blue-100 text-blue-600'
      }`}>
        {statusInfo.icon}
      </div>
      <div>
        <Badge text={statusInfo.label} variant={statusInfo.variant} />
        <p className="text-sm text-gray-600 mt-1">{statusInfo.description}</p>
      </div>
    </div>
  );
} 