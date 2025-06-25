import './App.css'
import TailwindTestPage from './pages/TailwindTestPage'
import TailwindTest from './components/ui/TailwindTest'

function App() {
  return (
    <div className="min-h-screen w-full bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">Hospital Management System</h1>
        <TailwindTest />
        <TailwindTestPage />
      </div>
    </div>
  )
}

export default App
