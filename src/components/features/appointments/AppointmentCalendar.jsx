import { useState, useEffect } from 'react';

export default function AppointmentCalendar({ onSelectDate, selectedDate }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState([]);
  
  // Generate calendar days for the current month
  useEffect(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    // First day of the month
    const firstDayOfMonth = new Date(year, month, 1);
    // Last day of the month
    const lastDayOfMonth = new Date(year, month + 1, 0);
    
    // Day of week for the first day (0 = Sunday, 6 = Saturday)
    const firstDayOfWeek = firstDayOfMonth.getDay();
    
    // Total days in the month
    const daysInMonth = lastDayOfMonth.getDate();
    
    // Calculate days from previous month to show
    const daysFromPrevMonth = firstDayOfWeek;
    
    // Calculate days from next month to show
    const totalCells = Math.ceil((daysFromPrevMonth + daysInMonth) / 7) * 7;
    const daysFromNextMonth = totalCells - daysFromPrevMonth - daysInMonth;
    
    // Generate calendar days array
    const days = [];
    
    // Add days from previous month
    const prevMonth = new Date(year, month - 1, 0);
    const prevMonthLastDay = prevMonth.getDate();
    
    for (let i = daysFromPrevMonth - 1; i >= 0; i--) {
      const day = prevMonthLastDay - i;
      days.push({
        date: new Date(year, month - 1, day),
        isCurrentMonth: false,
        isToday: false,
        isSelectable: false,
      });
    }
    
    // Add days from current month
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isToday = date.getTime() === today.getTime();
      const isSelectable = date >= today; // Only future dates are selectable
      
      days.push({
        date,
        isCurrentMonth: true,
        isToday,
        isSelectable,
      });
    }
    
    // Add days from next month
    for (let day = 1; day <= daysFromNextMonth; day++) {
      days.push({
        date: new Date(year, month + 1, day),
        isCurrentMonth: false,
        isToday: false,
        isSelectable: false,
      });
    }
    
    setCalendarDays(days);
  }, [currentMonth]);
  
  // Go to previous month
  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };
  
  // Go to next month
  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };
  
  // Go to today
  const goToToday = () => {
    setCurrentMonth(new Date());
  };
  
  // Format date as YYYY-MM-DD
  const formatDateValue = (date) => {
    return date.toISOString().split('T')[0];
  };
  
  // Check if a date is selected
  const isDateSelected = (date) => {
    if (!selectedDate) return false;
    return formatDateValue(date) === selectedDate;
  };
  
  // Format month and year for display
  const formatMonthYear = (date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };
  
  // Day name headers
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 flex items-center justify-between">
        <button
          onClick={goToPreviousMonth}
          className="p-2 rounded-full hover:bg-gray-100"
          aria-label="Previous month"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <div className="flex-1 text-center">
          <h2 className="text-lg font-semibold text-gray-900">{formatMonthYear(currentMonth)}</h2>
          <button
            onClick={goToToday}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Today
          </button>
        </div>
        
        <button
          onClick={goToNextMonth}
          className="p-2 rounded-full hover:bg-gray-100"
          aria-label="Next month"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      
      <div className="border-t border-gray-200">
        <div className="grid grid-cols-7 gap-px">
          {dayNames.map((day) => (
            <div key={day} className="py-2 text-center text-xs font-medium text-gray-500">
              {day}
            </div>
          ))}
          
          {calendarDays.map((day, index) => (
            <div
              key={index}
              onClick={() => day.isSelectable && onSelectDate(formatDateValue(day.date))}
              className={`
                h-12 px-2 py-2 hover:bg-gray-50 flex items-center justify-center relative
                ${!day.isCurrentMonth ? 'bg-gray-50 text-gray-400' : ''}
                ${day.isToday ? 'font-bold' : ''}
                ${isDateSelected(day.date) ? 'bg-blue-50' : ''}
                ${day.isSelectable ? 'cursor-pointer' : 'cursor-not-allowed'}
              `}
            >
              <span
                className={`
                  flex items-center justify-center w-8 h-8 rounded-full
                  ${isDateSelected(day.date) ? 'bg-blue-500 text-white' : ''}
                  ${day.isToday && !isDateSelected(day.date) ? 'border border-blue-500' : ''}
                `}
              >
                {day.date.getDate()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 