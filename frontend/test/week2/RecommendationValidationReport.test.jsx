import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import RecommendationValidationReport from '../../src/components/week2/RecommendationValidationReport'

// Mock the aiService module
vi.mock('../../src/services/aiService', () => ({
  getAIInsights: vi.fn()
}))

import { getAIInsights } from '../../src/services/aiService'

describe('RecommendationValidationReport', () => {
  it('should show loading state initially', () => {
    getAIInsights.mockReturnValue(new Promise(() => {}))

    render(<RecommendationValidationReport />)
    expect(screen.getByRole('status')).toHaveTextContent('Loading recommendation validation...')
  })

  it('should pass validation when all insights have recommendations', async () => {
    const mockInsights = [
      {
        id: 'insight-1',
        insight: 'Test insight 1',
        recommendation: 'Actionable recommendation 1',
        trend: 'Up 10%'
      },
      {
        id: 'insight-2',
        insight: 'Test insight 2',
        recommendation: 'Actionable recommendation 2',
        trend: 'Down 5%'
      }
    ]

    getAIInsights.mockResolvedValue(mockInsights)

    render(<RecommendationValidationReport />)

    await waitFor(() => {
      expect(screen.getByTestId('recommendation-summary')).toHaveTextContent('PASS')
    })

    expect(screen.getByTestId('recommendation-count')).toHaveTextContent('2')
  })

  it('should fail validation when an insight is missing a recommendation', async () => {
    const mockInsights = [
      {
        id: 'insight-1',
        insight: 'Test insight 1',
        recommendation: 'Valid recommendation',
        trend: 'Up 10%'
      },
      {
        id: 'insight-2',
        insight: 'Test insight 2',
        recommendation: '',
        trend: 'Down 5%'
      }
    ]

    getAIInsights.mockResolvedValue(mockInsights)

    render(<RecommendationValidationReport />)

    await waitFor(() => {
      expect(screen.getByTestId('recommendation-summary')).toHaveTextContent('FAIL')
    })

    expect(screen.getByTestId('recommendation-count')).toHaveTextContent('1')
  })

  it('should validate that recommendations are non-empty strings', async () => {
    const mockInsights = [
      {
        id: 'insight-1',
        insight: 'Sales are increasing',
        recommendation: 'Stock up on popular items',
        trend: 'Up 12% vs last week'
      }
    ]

    getAIInsights.mockResolvedValue(mockInsights)

    render(<RecommendationValidationReport />)

    await waitFor(() => {
      expect(screen.getByTestId('rec-check-insight-1')).toHaveTextContent(/Has recommendation/)
    })

    expect(screen.getByTestId('rec-check-insight-1')).toHaveTextContent('insight-1: Has recommendation')
  })

  it('should display individual check results for each insight', async () => {
    const mockInsights = [
      {
        id: 'insight-a',
        insight: 'Trend insight A',
        recommendation: 'Do action A',
        trend: 'Up 10%'
      },
      {
        id: 'insight-b',
        insight: 'Trend insight B',
        recommendation: 'Do action B',
        trend: 'Up 15%'
      }
    ]

    getAIInsights.mockResolvedValue(mockInsights)

    render(<RecommendationValidationReport />)

    await waitFor(() => {
      expect(screen.getByTestId('rec-check-insight-a')).toBeInTheDocument()
    })

    expect(screen.getByTestId('rec-check-insight-a')).toHaveTextContent('Has recommendation')
    expect(screen.getByTestId('rec-check-insight-b')).toHaveTextContent('Has recommendation')
  })
})

