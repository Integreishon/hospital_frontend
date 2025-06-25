export default function Spinner({ size = "md" }) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div className="flex justify-center items-center">
      <div className={`animate-spin rounded-full border-t-4 border-blue-500 border-opacity-50 ${sizeClasses[size]}`}></div>
    </div>
  );
} 