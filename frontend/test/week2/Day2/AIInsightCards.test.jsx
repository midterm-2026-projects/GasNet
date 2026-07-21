import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import AIInsightCards from '../../../src/components/week2/Day2/AiInsightCard'

// Mock the aiService module
vi.mock('../../../src/services/aiService', () => ({
  getAIInsights: vi.fn()
}))

import { getAIInsights } from '../../../src/services/aiService'

describe('AIInsightCards', () => {
  it('should show loading state initially', () => {
    // Keep promise pending so loading stays true
    getAIInsights.mockReturnValue(new Promise(() => {}))

    render(<AIInsightCards />)
    expect(screen.getByRole('status')).toHaveTextContent('Loading AI insights...')
  })

  it('should be displaying insight cards properly after loading', async () => {
    const mockInsights = [
      {
        id: 'insight-1',
        insight: 'Test insight one',
        recommendation: 'Test recommendation one',
        trend: 'Up 12% vs last week'
      },
      {
        id: 'insight-2',
        insight: 'Test insight two',
        recommendation: 'Test recommendation two',
        trend: 'Down 5% vs last month'
      }
    ]

    getAIInsights.mockResolvedValue(mockInsights)

    render(<AIInsightCards />)

    // Wait for loading to finish
    await waitFor(() => {
      expect(screen.getByText('AI Insight Cards')).toBeInTheDocument()
    })

    // Verify insight cards are displayed using testid to get unique elements
    expect(screen.getByTestId('insight-text-insight-1')).toHaveTextContent('Test insight one')
    expect(screen.getByTestId('recommendation-insight-1')).toHaveTextContent('Test recommendation one')
    expect(screen.getByTestId('trend-insight-1')).toHaveTextContent('Up 12% vs last week')

    expect(screen.getByTestId('insight-text-insight-2')).toHaveTextContent('Test insight two')
    expect(screen.getByTestId('recommendation-insight-2')).toHaveTextContent('Test recommendation two')
    expect(screen.getByTestId('trend-insight-2')).toHaveTextContent('Down 5% vs last month')
  })

  it('should be generating recommendations correctly and displaying them', async () => {
    const mockInsights = [
      {
        id: 'insight-1',
        insight: 'Sales peak in the evening',
        recommendation: 'Increase evening stock',
        trend: 'Up 8% vs last week'
      }
    ]

    getAIInsights.mockResolvedValue(mockInsights)

    render(<AIInsightCards />)

    // Wait for recommendations section to appear
    await waitFor(() => {
      expect(screen.getByLabelText('recommendations-summary')).toBeInTheDocument()
    })

    // Recommendation appears in both the card and the aside - use getAllByText
    const recElements = screen.getAllByText('Increase evening stock')
    expect(recElements.length).toBe(2)

    const listItems = screen.getByLabelText('recommendations-summary').querySelectorAll('li')
    expect(listItems.length).toBe(1)
    expect(listItems[0]).toHaveTextContent('Increase evening stock')
  })

  it('should display correct data-testid attributes for each insight', async () => {
    const mockInsights = [
      {
        id: 'insight-abc',
        insight: 'Branch A is performing well',
        recommendation: 'Replicate best practices',
        trend: 'Up 15% vs last week'
      }
    ]

    getAIInsights.mockResolvedValue(mockInsights)

    render(<AIInsightCards />)

    await waitFor(() => {
      expect(screen.getByTestId('insight-text-insight-abc')).toBeInTheDocument()
    })

    expect(screen.getByTestId('insight-text-insight-abc')).toHaveTextContent('Branch A is performing well')
    expect(screen.getByTestId('recommendation-insight-abc')).toHaveTextContent('Replicate best practices')
    expect(screen.getByTestId('trend-insight-abc')).toHaveTextContent('Up 15% vs last week')
  })

  it('should render insight cards in a list with role="list"', async () => {
    const mockInsights = [
      {
        id: 'insight-1',
        insight: 'Test insight',
        recommendation: 'Test recommendation',
        trend: 'Up 10%'
      }
    ]

    getAIInsights.mockResolvedValue(mockInsights)

    render(<AIInsightCards />)

    await waitFor(() => {
      expect(screen.getByLabelText('insight-cards')).toBeInTheDocument()
    })

    const list = screen.getByLabelText('insight-cards')
    const items = list.querySelectorAll('[role="listitem"]')
    expect(items.length).toBe(1)
  })
})

