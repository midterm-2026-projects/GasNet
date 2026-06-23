import React from 'react'
import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'

// Mock SyncStatus inside Sidebar to avoid network calls
vi.mock('./SyncStatus', () => ({
  default: () => <div data-testid="mock-sync">Mock Sync</div>
}))

import Sidebar from './Sidebar'

describe('Sidebar', () => {
  it('renders brand, nav and alerts', () => {
    render(<Sidebar />)
    expect(screen.getByText('GasNet')).toBeInTheDocument()
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Analytics')).toBeInTheDocument()
    expect(screen.getByText('Settings')).toBeInTheDocument()
    expect(screen.getByText(/Delivery delayed/)).toBeInTheDocument()
    expect(screen.getByTestId('mock-sync')).toBeInTheDocument()
  })
})
