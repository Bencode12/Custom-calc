import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Hub from './components/Hub'
import Calculator from './components/Calculator'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Hub />} />
            <Route path="/calculator" element={<Calculator />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
