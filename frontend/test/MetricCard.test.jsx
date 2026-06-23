import { render, screen } from '@testing-library/react'
import MetricCard from './MetricCard'
import { describe, expect, it } from 'vitest'

describe('MetricCard', () => {
  it('shows title, value and delta', () => {
    render(<MetricCard title="Test" value="42" delta="+1" />)
    expect(screen.getByText('Test')).toBeInTheDocument()
    expect(screen.getByText('42')).toBeInTheDocument()
    expect(screen.getByText('+1')).toBeInTheDocument()
  })
})
