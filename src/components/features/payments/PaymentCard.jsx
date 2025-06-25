import Badge from '../../ui/Badge';
import Card from '../../ui/Card';

export default function PaymentCard({ payment }) {
  const { 
    id, 
    date, 
    amount, 
    description, 
    status, 
    paymentMethod,
    invoiceNumber,
    service,
  } = payment;

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      paid: { text: 'Paid', variant: 'success' },
      pending: { text: 'Pending', variant: 'warning' },
      failed: { text: 'Failed', variant: 'danger' },
      refunded: { text: 'Refunded', variant: 'primary' },
    };
    
    return <Badge text={statusMap[status]?.text || status} variant={statusMap[status]?.variant || 'primary'} />;
  };

  const getPaymentMethodIcon = (method) => {
    switch (method) {
      case 'credit_card':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
        );
      case 'bank_transfer':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
          </svg>
        );
      case 'insurance':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        );
      default:
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
          </svg>
        );
    }
  };

  return (
    <Card className="mb-4 hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        <div className="mb-4 md:mb-0">
          <div className="flex items-center mb-2">
            <h3 className="font-medium text-lg">{description}</h3>
            <div className="ml-3">{getStatusBadge(status)}</div>
          </div>
          <p className="text-gray-600 mb-1">
            {service} - Invoice #{invoiceNumber}
          </p>
          <p className="text-sm text-gray-500">{formatDate(date)}</p>
        </div>
        
        <div className="flex flex-col md:items-end">
          <div className="flex items-center mb-2">
            <div className="text-gray-600 mr-2">{getPaymentMethodIcon(paymentMethod)}</div>
            <span className="text-sm text-gray-600">
              {paymentMethod === 'credit_card' ? 'Credit Card' : 
               paymentMethod === 'bank_transfer' ? 'Bank Transfer' : 
               paymentMethod === 'insurance' ? 'Insurance' : paymentMethod}
            </span>
          </div>
          <p className="text-xl font-bold">{formatCurrency(amount)}</p>
          
          <div className="mt-3">
            <button className="text-sm text-blue-600 hover:text-blue-800">
              View Receipt
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
} 