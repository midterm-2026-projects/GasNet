import './alerts.css'

export default function Alerts() {
  return (
    <div className="alerts-card card">
      <h3>Alerts</h3>
      <ul>
        <li className="critical">Delivery delayed — Gulod</li>
        <li className="warning">Low stock — Cuenca</li>
        <li className="info">New price published — Bayan</li>
      </ul>
    </div>
  )
}
