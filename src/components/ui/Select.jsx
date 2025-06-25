export default function Select({ options = [], placeholder = "Select an option", className = "" }) {
  return (
    <select className={`border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}>
      <option value="" disabled selected>{placeholder}</option>
      {options.map((option, index) => (
        <option key={index} value={option.value}>{option.label}</option>
      ))}
    </select>
  );
} 