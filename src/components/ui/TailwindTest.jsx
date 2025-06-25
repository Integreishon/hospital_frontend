export default function TailwindTest() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">
        Prueba de Tailwind CSS
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-red-500 text-white p-4 rounded-lg shadow-lg">
          Elemento 1
        </div>
        <div className="bg-green-500 text-white p-4 rounded-lg shadow-lg">
          Elemento 2
        </div>
        <div className="bg-blue-500 text-white p-4 rounded-lg shadow-lg">
          Elemento 3
        </div>
      </div>
    </div>
  );
} 