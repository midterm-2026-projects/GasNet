import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import SyncStatus from './SyncStatus'
import { vi, describe, it, beforeEach, expect } from 'vitest'

describe('SyncStatus component', () => {
  const mockResponse = {
    syncStatus: 'synchronized',
    lastSync: '2026-06-23T12:00:00Z',
    connectionStatus: 'online'
  }

  beforeEach(() => {
    global.fetch = vi.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve(mockResponse) }))
  })

  it('displays sync info from API', async () => {
    render(<SyncStatus />)
    await waitFor(() => expect(screen.getByTestId('sync-indicator').textContent).toBe('synchronized'))
    expect(screen.getByTestId('last-sync').textContent).toBe(new Date(mockResponse.lastSync).toLocaleString())
    expect(screen.getByTestId('connection-status').textContent).toBe('online')
  })
})
