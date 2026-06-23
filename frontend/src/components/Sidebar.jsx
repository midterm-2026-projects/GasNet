import React from 'react'
import SyncStatus from './SyncStatus'
import '../styles/sidebar.css'

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">GasNet</div>
      <nav className="nav">
        <a className="nav-item active">Home</a>
        <a className="nav-item">Analytics</a>
        <a className="nav-item">Settings</a>
      </nav>

      <div className="sidebar-section">
        <h4>Alerts</h4>
        <div className="alert-list">
          <div className="alert critical">Delivery delayed — Gulod</div>
          <div className="alert warning">Low stock — Cuenca</div>
        </div>
      </div>

      <div className="sidebar-section">
        <h4>Status</h4>
        <SyncStatus />
      </div>
    </aside>
  )
}
