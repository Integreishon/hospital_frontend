import Card from '../../ui/Card';
import Badge from '../../ui/Badge';

export default function MedicalRecordCard({ record }) {
  const { 
    id, 
    date, 
    doctorName, 
    specialty, 
    diagnosis, 
    notes, 
    attachments = [],
    prescriptions = [],
    type = 'consultation'
  } = record;

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getTypeColor = (type) => {
    const typeMap = {
      consultation: 'primary',
      lab: 'warning',
      surgery: 'danger',
      followup: 'success',
      imaging: 'primary',
    };
    
    return typeMap[type] || 'primary';
  };

  return (
    <Card className="mb-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div>
          <div className="flex items-center">
            <h3 className="font-medium text-lg">{doctorName}</h3>
            <Badge text={specialty} variant="primary" className="ml-2" />
          </div>
          <p className="text-sm text-gray-500">{formatDate(date)}</p>
        </div>
        <Badge text={type} variant={getTypeColor(type)} />
      </div>
      
      {diagnosis && (
        <div className="mb-3">
          <h4 className="text-sm font-medium text-gray-700 mb-1">Diagnosis</h4>
          <p className="text-gray-800">{diagnosis}</p>
        </div>
      )}
      
      {notes && (
        <div className="mb-3">
          <h4 className="text-sm font-medium text-gray-700 mb-1">Notes</h4>
          <p className="text-gray-600">{notes}</p>
        </div>
      )}
      
      {prescriptions.length > 0 && (
        <div className="mb-3">
          <h4 className="text-sm font-medium text-gray-700 mb-1">Prescriptions</h4>
          <ul className="list-disc list-inside text-sm text-gray-600">
            {prescriptions.map((prescription, index) => (
              <li key={index}>{prescription}</li>
            ))}
          </ul>
        </div>
      )}
      
      {attachments.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-1">Attachments</h4>
          <div className="flex flex-wrap gap-2">
            {attachments.map((attachment, index) => (
              <a
                key={index}
                href={attachment.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-gray-100 text-gray-800 hover:bg-gray-200"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                </svg>
                {attachment.name}
              </a>
            ))}
          </div>
        </div>
      )}
      
      <div className="mt-4 flex justify-end">
        <button className="text-sm text-blue-600 hover:text-blue-800">
          View Details
        </button>
      </div>
    </Card>
  );
} 