import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import SalesTrendValidationReport from '../../src/components/week2/SalesTrendValidationReport'

// Mock the aiService module
vi.mock('../../src/services/aiService', () => ({
  getAIInsights: vi.fn()
}))

import { getAIInsights } from '../../src/services/aiService'

describe('SalesTrendValidationReport', () => {
  it('should show loading state initially', () => {
    getAIInsights.mockReturnValue(new Promise(() => {}))

    render(<SalesTrendValidationReport />)
    expect(screen.getByRole('status')).toHaveTextContent('Loading sales trend validation...')
  })

  it('should pass validation when all trends are plausible', async () => {
    const mockInsights = [
      {
        id: 'insight-1',
        insight: 'Test insight 1',
        recommendation: 'Recommendation 1',
        trend: 'Up 12% vs last week'
      },
      {
        id: 'insight-2',
        insight: 'Test insight 2',
        recommendation: 'Recommendation 2',
        trend: 'Down 5% vs last month'
      }
    ]

    getAIInsights.mockResolvedValue(mockInsights)

    render(<SalesTrendValidationReport />)

    await waitFor(() => {
      expect(screen.getByTestId('trend-summary')).toHaveTextContent('PASS')
    })

    expect(screen.getByTestId('trend-count')).toHaveTextContent('2')
  })

  it('should fail validation when a trend is missing or implausible', async () => {
    const mockInsights = [
      {
        id: 'insight-1',
        insight: 'Test insight 1',
        recommendation: 'Recommendation 1',
        trend: 'Up 10%'
      },
      {
        id: 'insight-2',
        insight: 'Test insight 2',
        recommendation: 'Recommendation 2',
        trend: ''  // Empty trend - implausible
      }
    ]

    getAIInsights.mockResolvedValue(mockInsights)

    render(<SalesTrendValidationReport />)

    await waitFor(() => {
      expect(screen.getByTestId('trend-summary')).toHaveTextContent('FAIL')
    })

    expect(screen.getByTestId('trend-count')).toHaveTextContent('1')
  })

  it('should return PASS when insight trend has Up/Down direction without percentage', async () => {
    const mockInsights = [
      {
        id: 'insight-1',
        insight: 'Trend moving upward',
        recommendation: 'Act on trend',
        trend: 'Up from previous period'
      }
    ]

    getAIInsights.mockResolvedValue(mockInsights)

    render(<SalesTrendValidationReport />)

    await waitFor(() => {
      expect(screen.getByTestId('trend-summary')).toHaveTextContent('PASS')
    })
  })

  it('should display individual trend check results', async () => {
    const mockInsights = [
      {
        id: 'insight-a',
        insight: 'Sales are rising',
        recommendation: 'Increase stock',
        trend: 'Up 15%'
      }
    ]

    getAIInsights.mockResolvedValue(mockInsights)

    render(<SalesTrendValidationReport />)

    await waitFor(() => {
      expect(screen.getByTestId('trend-check-insight-a')).toBeInTheDocument()
    })

    expect(screen.getByTestId('trend-check-insight-a')).toHaveTextContent(/Plausible/)
  })

  it('should mark trends without direction or percentage as implausible', async () => {
    const mockInsights = [
      {
        id: 'insight-1',
        insight: 'Some observation',
        recommendation: 'Do something',
        trend: 'No clear direction'  // No %, no Up/Down
      }
    ]

    getAIInsights.mockResolvedValue(mockInsights)

    render(<SalesTrendValidationReport />)

    await waitFor(() => {
      expect(screen.getByTestId('trend-check-insight-1')).toBeInTheDocument()
    })

    expect(screen.getByTestId('trend-check-insight-1')).toHaveTextContent(/Implausible/)
    expect(screen.getByTestId('trend-summary')).toHaveTextContent('FAIL')
  })
})

