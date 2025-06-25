export default function TailwindTestPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-12">
          Tailwind CSS Test Page
        </h1>
        
        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-lg leading-6 font-medium text-gray-900">
              Color Palette
            </h2>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Testing Tailwind's color system
            </p>
          </div>
          
          <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="h-24 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold">
              Blue 500
            </div>
            <div className="h-24 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold">
              Green 500
            </div>
            <div className="h-24 bg-red-500 rounded-lg flex items-center justify-center text-white font-bold">
              Red 500
            </div>
            <div className="h-24 bg-yellow-500 rounded-lg flex items-center justify-center text-white font-bold">
              Yellow 500
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-lg leading-6 font-medium text-gray-900">
              Typography
            </h2>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Testing Tailwind's typography classes
            </p>
          </div>
          
          <div className="p-6 space-y-4">
            <h1 className="text-4xl font-bold">Heading 1</h1>
            <h2 className="text-3xl font-semibold">Heading 2</h2>
            <h3 className="text-2xl font-medium">Heading 3</h3>
            <p className="text-base">Regular paragraph text</p>
            <p className="text-sm text-gray-600">Small text in gray</p>
            <p className="italic">Italic text</p>
            <p className="font-mono">Monospaced font</p>
          </div>
        </div>
        
        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-lg leading-6 font-medium text-gray-900">
              Spacing & Layout
            </h2>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Testing Tailwind's spacing and layout utilities
            </p>
          </div>
          
          <div className="p-6">
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="w-16 h-16 bg-purple-200 flex items-center justify-center">w-16</div>
              <div className="w-24 h-16 bg-purple-300 flex items-center justify-center">w-24</div>
              <div className="w-32 h-16 bg-purple-400 flex items-center justify-center">w-32</div>
              <div className="w-48 h-16 bg-purple-500 flex items-center justify-center text-white">w-48</div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-indigo-100 p-4 rounded">Column 1</div>
              <div className="bg-indigo-200 p-4 rounded">Column 2</div>
              <div className="bg-indigo-300 p-4 rounded">Column 3</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-lg leading-6 font-medium text-gray-900">
              Components
            </h2>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Testing Tailwind component styling
            </p>
          </div>
          
          <div className="p-6 space-y-6">
            <div className="flex flex-wrap gap-4">
              <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors">
                Button
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors">
                Secondary
              </button>
              <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors">
                Danger
              </button>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 p-4 border rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-medium mb-2">Card Title</h3>
                <p className="text-gray-600 text-sm">This is a card component built with Tailwind CSS.</p>
              </div>
              <div className="flex-1 p-4 border rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-medium mb-2">Another Card</h3>
                <p className="text-gray-600 text-sm">Cards can be used for various UI elements.</p>
              </div>
            </div>
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-blue-700">
                    This is an info alert component built with Tailwind CSS.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 