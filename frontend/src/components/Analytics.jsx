import MetricCard from './MetricCard'
import Alerts from './Alerts'
import '../styles/analytics.css'

export default function Analytics() {
  return (
    <main className="analytics">
      <header className="analytics-header">
        <h1>Overview</h1>
        <p className="subtitle">Latest metrics and alerts</p>
      </header>

      <section className="metrics-grid">
        <MetricCard title="Daily Sales" value="₱12,430" delta="+4.2%" />
        <MetricCard title="Active Branches" value="6" delta="" />
        <MetricCard title="Open Deliveries" value="3" delta="-1" />
        <MetricCard title="Stock Alerts" value="2" delta="" />
      </section>

      <section className="analytics-body">
        <div className="left">
          <div className="card">
            <h3>Recent Activity</h3>
            <ul>
              <li>Sale recorded at Bayan — ₱2,500</li>
              <li>Delivery marked delivered — Caloocan</li>
              <li>Price updated — Sta. Teresita</li>
            </ul>
          </div>
        </div>
        <div className="right">
          <Alerts />
        </div>
      </section>
    </main>
  )
}
