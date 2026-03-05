import Sidebar from './components/Sidebar'
import Calculator from './components/Calculator'
import './App.css'

function App() {
  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        <Calculator />
      </main>
    </div>
  )
}

export default App
