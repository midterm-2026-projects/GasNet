import '../styles/metricCard.css'

export default function MetricCard({ title = 'No Data', value = '0', delta = null }) {
  return (
    <div className="metric-card">
      <div className="metric-title">{title}</div>
      <div className="metric-value">{value}</div>
      {delta != null && delta !== '' && <div className="metric-delta">{delta}</div>}
    </div>
  )
}
