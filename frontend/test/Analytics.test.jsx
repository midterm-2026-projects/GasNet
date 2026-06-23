import { render, screen } from '@testing-library/react'
import Analytics from '../src/components/Analytics'
import { describe, expect, it } from 'vitest'

describe('Analytics', () => {
  it('renders overview header and metric cards', () => {
    render(<Analytics />)
    expect(screen.getByText('Overview')).toBeInTheDocument()
    expect(screen.getByText('Daily Sales')).toBeInTheDocument()
    expect(screen.getByText('Active Branches')).toBeInTheDocument()
    expect(screen.getByText('Open Deliveries')).toBeInTheDocument()
  })
})
