import { render, screen } from '@testing-library/react'
import Alerts from '../src/components/Alerts'
import { describe, expect, it } from 'vitest'


describe('Alerts', () => {
  it('shows the list of alerts', () => {
    render(<Alerts />)
    expect(screen.getByText(/Delivery delayed/)).toBeInTheDocument()
    expect(screen.getByText(/Low stock/)).toBeInTheDocument()
    expect(screen.getByText(/New price published/)).toBeInTheDocument()
  })
})
