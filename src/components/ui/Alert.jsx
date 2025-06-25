export default function Alert({ type = "info", message, onClose }) {
  const alertStyles = {
    info: "bg-blue-50 text-blue-800 border-blue-200",
    success: "bg-green-50 text-green-800 border-green-200",
    warning: "bg-yellow-50 text-yellow-800 border-yellow-200",
    error: "bg-red-50 text-red-800 border-red-200",
  };

  return (
    <div className={`p-4 mb-4 border rounded-lg flex justify-between items-center ${alertStyles[type]}`}>
      <div>{message}</div>
      {onClose && (
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <span className="text-xl">&times;</span>
        </button>
      )}
    </div>
  );
} 