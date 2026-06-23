import Sidebar from './components/Sidebar'
import Analytics from './components/Analytics'
import './styles/dashboard.css'

export default function App() {
  return (
    <div className="app-root">
      <Sidebar />
      <Analytics />
    </div>
  )
}
