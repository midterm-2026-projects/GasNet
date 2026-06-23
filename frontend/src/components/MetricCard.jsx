import React from 'react'
import './metricCard.css'

export default function MetricCard({ title, value, delta }) {
  return (
    <div className="metric-card">
      <div className="metric-title">{title}</div>
      <div className="metric-value">{value}</div>
      {delta && <div className="metric-delta">{delta}</div>}
    </div>
  )
}
