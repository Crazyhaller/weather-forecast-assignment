import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Cities from './pages/Cities'
import Weather from './pages/Weather'

const App = () => {
  return (
    <div className="bg-black min-h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Cities />} />
          <Route path="/weather" element={<Weather />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
