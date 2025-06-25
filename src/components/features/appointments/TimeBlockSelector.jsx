import { useState, useEffect } from 'react';

export default function TimeBlockSelector({ doctorId, date, onSelect, selectedTime }) {
  const [timeBlocks, setTimeBlocks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Mock available time slots for demonstration
  const mockTimeSlots = {
    morning: [
      { time: '09:00', available: true },
      { time: '09:30', available: false },
      { time: '10:00', available: true },
      { time: '10:30', available: true },
      { time: '11:00', available: false },
      { time: '11:30', available: true },
    ],
    afternoon: [
      { time: '14:00', available: true },
      { time: '14:30', available: true },
      { time: '15:00', available: false },
      { time: '15:30', available: true },
      { time: '16:00', available: false },
      { time: '16:30', available: true },
    ],
  };

  useEffect(() => {
    if (!doctorId || !date) {
      setTimeBlocks([]);
      return;
    }

    // In a real app, this would fetch available time slots from an API
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      try {
        // Combine morning and afternoon slots
        const allSlots = [...mockTimeSlots.morning, ...mockTimeSlots.afternoon];
        
        // Randomly make some slots unavailable based on the date
        // (just to simulate different availability on different days)
        const dateObj = new Date(date);
        const dayOfWeek = dateObj.getDay();
        
        const processedSlots = allSlots.map(slot => {
          // Use the day of week and time to deterministically set availability
          const timeValue = parseInt(slot.time.replace(':', ''));
          const isAvailable = (timeValue + dayOfWeek) % 3 !== 0;
          
          return {
            ...slot,
            available: isAvailable,
          };
        });
        
        setTimeBlocks(processedSlots);
        setError(null);
      } catch (err) {
        setError('Error loading available time slots');
        setTimeBlocks([]);
      }
      setLoading(false);
    }, 600);
  }, [doctorId, date]);

  if (!doctorId || !date) {
    return (
      <div className="text-center text-gray-500 py-8">
        Please select a doctor and date first
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  if (timeBlocks.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        No time slots available for the selected date
      </div>
    );
  }

  // Format the date for display
  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Group time blocks by morning/afternoon
  const morningSlots = timeBlocks.filter(slot => {
    const hour = parseInt(slot.time.split(':')[0]);
    return hour < 12;
  });

  const afternoonSlots = timeBlocks.filter(slot => {
    const hour = parseInt(slot.time.split(':')[0]);
    return hour >= 12;
  });

  // Format time for display (e.g., "09:00" to "9:00 AM")
  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  };

  return (
    <div>
      <h3 className="text-lg font-medium mb-2">Select Time</h3>
      <p className="text-gray-500 mb-4">Available times on {formatDate(date)}</p>

      {morningSlots.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-600 mb-2">Morning</h4>
          <div className="grid grid-cols-3 gap-2">
            {morningSlots.map((slot) => (
              <button
                key={slot.time}
                onClick={() => slot.available && onSelect(slot.time)}
                disabled={!slot.available}
                className={`py-2 px-3 rounded text-center text-sm ${
                  selectedTime === slot.time
                    ? 'bg-blue-500 text-white'
                    : slot.available
                    ? 'bg-white border border-gray-300 hover:border-blue-500'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                {formatTime(slot.time)}
              </button>
            ))}
          </div>
        </div>
      )}

      {afternoonSlots.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-600 mb-2">Afternoon</h4>
          <div className="grid grid-cols-3 gap-2">
            {afternoonSlots.map((slot) => (
              <button
                key={slot.time}
                onClick={() => slot.available && onSelect(slot.time)}
                disabled={!slot.available}
                className={`py-2 px-3 rounded text-center text-sm ${
                  selectedTime === slot.time
                    ? 'bg-blue-500 text-white'
                    : slot.available
                    ? 'bg-white border border-gray-300 hover:border-blue-500'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                {formatTime(slot.time)}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 