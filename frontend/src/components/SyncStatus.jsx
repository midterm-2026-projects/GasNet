import React, { useEffect, useState } from 'react'
import { fetchSyncStatus } from '../services/api'

export default function SyncStatus() {
  const [status, setStatus] = useState({ syncStatus: 'unknown', lastSync: null, connectionStatus: 'offline' })

  useEffect(() => {
    let mounted = true
    fetchSyncStatus()
      .then((data) => {
        if (mounted) setStatus(data)
      })
      .catch(() => {})
    return () => {
      mounted = false
    }
  }, [])

  return (
    <div data-testid="sync-status">
      <div>Sync: <span data-testid="sync-indicator">{status.syncStatus}</span></div>
      <div>Last: <span data-testid="last-sync">{status.lastSync || 'N/A'}</span></div>
      <div>Connection: <span data-testid="connection-status">{status.connectionStatus}</span></div>
    </div>
  )
}
