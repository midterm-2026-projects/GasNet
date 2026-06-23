import { useEffect, useState } from 'react'
import { fetchSyncStatus } from '../services/api'
import '../styles/syncStatus.css'

function formatDate(iso) {
  if (!iso) return 'N/A'
  try {
    return new Date(iso).toLocaleString()
  } catch {
    return iso
  }
}

export default function SyncStatus() {
  const [status, setStatus] = useState({ syncStatus: null, lastSync: null, connectionStatus: null })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    fetchSyncStatus()
      .then((data) => {
        if (!mounted) return
        setStatus(data)
        setError(null)
      })
      .catch(() => {
        if (!mounted) return
        setError('Unable to load status')
      })
      .finally(() => {
        if (mounted) setLoading(false)
      })
    return () => {
      mounted = false
    }
  }, [])

  const indicatorClass = () => {
    if (loading) return 'badge loading'
    if (error) return 'badge error'
    if (status.connectionStatus === 'online' && status.syncStatus === 'synchronized') return 'badge success'
    if (status.connectionStatus === 'offline') return 'badge offline'
    return 'badge unknown'
  }

  return (
    <div className="sync-card" data-testid="sync-status">
      <div className="sync-header">
        <h3>Synchronization Status</h3>
        <div className={indicatorClass()} data-testid="sync-indicator">{loading ? 'Loading' : error ? 'Error' : status.syncStatus}</div>
      </div>

      <div className="sync-body">
        <div className="row">
          <div className="label">Last Sync</div>
          <div className="value" data-testid="last-sync">{loading ? '—' : error ? '—' : formatDate(status.lastSync)}</div>
        </div>
        <div className="row">
          <div className="label">Connection</div>
          <div className="value" data-testid="connection-status">{loading ? '—' : error ? 'Offline' : status.connectionStatus}</div>
        </div>
        {error && <div className="error-text">{error}</div>}
      </div>
    </div>
  )
}
