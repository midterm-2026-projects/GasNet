import '@testing-library/jest-dom'
import { render, screen, waitFor, within } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import AnalyticsDashboard from '../../../components/week3/Day1/AnalyticsDashboard'
import * as api from '../../../services/api'
import * as aiService from '../../../services/aiService'

const mockSalesAnalytics = {
  weekly: {
    scope: 'weekly',
    label: '2026-06-30 to 2026-07-06',
    totalSales: 17600,
    transactionCount: 1,
    averageSale: 17600
  },
  monthly: {
    scope: 'monthly',
    label: 'July 2026',
    totalSales: 50700,
    transactionCount: 4,
    averageSale: 12675
  },
  annual: {
    scope: 'annual',
    label: '2026',
    totalSales: 87200,
    transactionCount: 7,
    averageSale: 12457.14
  }
}

const mockBranchPerformance = {
  branchSalesAnalysis: [
    { id: 'branch-001', name: 'Bayan Branch', monthlySales: 180000, target: 200000, targetProgress: 90 },
    { id: 'branch-002', name: 'Caloocan Branch', monthlySales: 152000, target: 200000, targetProgress: 76 },
    { id: 'branch-003', name: 'Sta. Teresita Branch', monthlySales: 208000, target: 200000, targetProgress: 104 },
    { id: 'branch-004', name: 'Antipolo Branch', monthlySales: 140000, target: 200000, targetProgress: 70 },
    { id: 'branch-005', name: 'Marikina Branch', monthlySales: 192000, target: 200000, targetProgress: 96 },
    { id: 'branch-006', name: 'Pasig Branch', monthlySales: 164000, target: 200000, targetProgress: 82 }
  ],
  branchComparisonReport: [
    { rank: 1, name: 'Sta. Teresita Branch', monthlySales: 208000, target: 200000, achievement: 104 },
    { rank: 2, name: 'Marikina Branch', monthlySales: 192000, target: 200000, achievement: 96 },
    { rank: 3, name: 'Bayan Branch', monthlySales: 180000, target: 200000, achievement: 90 },
    { rank: 4, name: 'Pasig Branch', monthlySales: 164000, target: 200000, achievement: 82 },
    { rank: 5, name: 'Caloocan Branch', monthlySales: 152000, target: 200000, achievement: 76 },
    { rank: 6, name: 'Antipolo Branch', monthlySales: 140000, target: 200000, achievement: 70 }
  ],
  targetProgressAnalysisReport: [
    { name: 'Bayan Branch', monthlySales: 180000, target: 200000, progress: 90, gap: 20000, status: 'on-track' },
    { name: 'Caloocan Branch', monthlySales: 152000, target: 200000, progress: 76, gap: 48000, status: 'needs-attention' },
    { name: 'Sta. Teresita Branch', monthlySales: 208000, target: 200000, progress: 104, gap: -8000, status: 'achieved' },
    { name: 'Antipolo Branch', monthlySales: 140000, target: 200000, progress: 70, gap: 60000, status: 'needs-attention' },
    { name: 'Marikina Branch', monthlySales: 192000, target: 200000, progress: 96, gap: 8000, status: 'on-track' },
    { name: 'Pasig Branch', monthlySales: 164000, target: 200000, progress: 82, gap: 36000, status: 'on-track' }
  ]
}

const mockAIInsights = [
  {
    id: 'insight-1',
    type: 'sales',
    insight: 'Sales peak at 17:00 in Bayan Branch; weekday evening demand is increasing.',
    recommendation: 'Increase evening stock and schedule an extra delivery on weekdays.',
    trend: 'Up 12% vs last week',
    severity: 'positive'
  },
  {
    id: 'insight-2',
    type: 'inventory',
    insight: 'Smaller cylinder SKUs are selling faster in urban branches.',
    recommendation: 'Promote 3kg bundles in urban outlets to capture demand.',
    trend: 'Up 8% vs last month',
    severity: 'positive'
  },
  {
    id: 'insight-3',
    type: 'performance',
    insight: 'Sta. Teresita Branch is exceeding target by 4%.',
    recommendation: 'Analyze best practices and replicate to other branches.',
    trend: 'Mixed performance across branches',
    severity: 'info'
  }
]

describe('Ob3W5D1 - AnalyticsDashboard (Integrated)', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should be generating analytics reports successfully', async () => {
    vi.spyOn(api, 'fetchSalesAnalyticsReports').mockResolvedValue(mockSalesAnalytics)
    vi.spyOn(api, 'fetchBranchPerformanceAnalysis').mockResolvedValue(mockBranchPerformance)
    vi.spyOn(aiService, 'getAIInsights').mockResolvedValue(mockAIInsights)

    render(<AnalyticsDashboard />)

    // Wait for loading to finish
    await waitFor(() => {
      expect(screen.queryByText(/Loading/)).toBeNull()
    })

    // Verify sales analytics reports are displayed
    expect(screen.getByText('Weekly Analytics Report')).toBeInTheDocument()
    expect(screen.getByText('Monthly Analytics Report')).toBeInTheDocument()
    expect(screen.getByText('Annual Analytics Report')).toBeInTheDocument()

    // Verify report data
    expect(screen.getByTestId('weekly-label')).toHaveTextContent('2026-06-30 to 2026-07-06')
    expect(screen.getByTestId('weekly-sales')).toHaveTextContent('₱17,600')
    expect(screen.getByTestId('weekly-transactions')).toHaveTextContent('1')

    expect(screen.getByTestId('monthly-label')).toHaveTextContent('July 2026')
    expect(screen.getByTestId('monthly-sales')).toHaveTextContent('₱50,700')
    expect(screen.getByTestId('monthly-transactions')).toHaveTextContent('4')

    expect(screen.getByTestId('annual-label')).toHaveTextContent('2026')
    expect(screen.getByTestId('annual-sales')).toHaveTextContent('₱87,200')
    expect(screen.getByTestId('annual-transactions')).toHaveTextContent('7')
  })

  it('should be analyzing branch performance correctly', async () => {
    vi.spyOn(api, 'fetchSalesAnalyticsReports').mockResolvedValue(mockSalesAnalytics)
    vi.spyOn(api, 'fetchBranchPerformanceAnalysis').mockResolvedValue(mockBranchPerformance)
    vi.spyOn(aiService, 'getAIInsights').mockResolvedValue(mockAIInsights)

    render(<AnalyticsDashboard />)

    await waitFor(() => {
      expect(screen.queryByText(/Loading/)).toBeNull()
    })

    // Verify branch performance section exists
    expect(screen.getByLabelText('branch-performance')).toBeInTheDocument()
    expect(screen.getByText('Branch Performance Analysis')).toBeInTheDocument()

    // Verify branch sales analysis table
    expect(screen.getByLabelText('branch-sales-analysis')).toBeInTheDocument()
    expect(screen.getByText('Bayan Branch')).toBeInTheDocument()
    expect(screen.getByText('Sta. Teresita Branch')).toBeInTheDocument()
    expect(screen.getByText('Antipolo Branch')).toBeInTheDocument()

    // Verify branch comparison
    expect(screen.getByText('#1 Sta. Teresita Branch - Sales: ₱208,000 | Achievement: 104%')).toBeInTheDocument()
    expect(screen.getByText('#6 Antipolo Branch - Sales: ₱140,000 | Achievement: 70%')).toBeInTheDocument()

    // Verify target progress
    expect(screen.getByText(/Progress: 90%/)).toBeInTheDocument()
    expect(screen.getByText(/Progress: 104%/)).toBeInTheDocument()
  })

  it('should be displaying analytics results accurately', async () => {
    vi.spyOn(api, 'fetchSalesAnalyticsReports').mockResolvedValue(mockSalesAnalytics)
    vi.spyOn(api, 'fetchBranchPerformanceAnalysis').mockResolvedValue(mockBranchPerformance)
    vi.spyOn(aiService, 'getAIInsights').mockResolvedValue(mockAIInsights)

    render(<AnalyticsDashboard />)

    await waitFor(() => {
      expect(screen.queryByText(/Loading/)).toBeNull()
    })

    // Verify overview metrics
    const metricsSection = screen.getByLabelText('overview-metrics')
    expect(within(metricsSection).getByText('Total Sales')).toBeInTheDocument()
    expect(within(metricsSection).getByText('Active Branches')).toBeInTheDocument()
    expect(within(metricsSection).getByText('Avg Target Progress')).toBeInTheDocument()
    expect(within(metricsSection).getByText('Total Target')).toBeInTheDocument()

    // Verify AI insights
    const insightsSection = screen.getByLabelText('ai-insights')
    expect(within(insightsSection).getByText('AI Insight Cards')).toBeInTheDocument()
    expect(within(insightsSection).getByText('Quick Recommendations')).toBeInTheDocument()

    // Verify AI insight content
    expect(screen.getByTestId('insight-text-insight-1')).toHaveTextContent(mockAIInsights[0].insight)
    expect(screen.getByTestId('recommendation-insight-1')).toHaveTextContent(mockAIInsights[0].recommendation)
    expect(screen.getByTestId('trend-insight-1')).toHaveTextContent(mockAIInsights[0].trend)
  })

  it('should be producing expected report outputs', async () => {
    vi.spyOn(api, 'fetchSalesAnalyticsReports').mockResolvedValue(mockSalesAnalytics)
    vi.spyOn(api, 'fetchBranchPerformanceAnalysis').mockResolvedValue(mockBranchPerformance)
    vi.spyOn(aiService, 'getAIInsights').mockResolvedValue(mockAIInsights)

    render(<AnalyticsDashboard />)

    await waitFor(() => {
      expect(screen.queryByText(/Loading/)).toBeNull()
    })

    // Verify complete dashboard structure
    expect(screen.getByText('Analytics Dashboard')).toBeInTheDocument()
    expect(screen.getByText('AI-driven insights and business analytics')).toBeInTheDocument()

    // All sections present
    expect(screen.getByLabelText('overview-metrics')).toBeInTheDocument()
    expect(screen.getByLabelText('ai-insights')).toBeInTheDocument()
    expect(screen.getByLabelText('sales-analytics')).toBeInTheDocument()
    expect(screen.getByLabelText('branch-performance')).toBeInTheDocument()

    // Recommendations summary
    const recSummary = screen.getByLabelText('recommendations-summary')
    expect(recSummary).toBeInTheDocument()
    expect(recSummary).toHaveTextContent(mockAIInsights[0].recommendation)
    expect(recSummary).toHaveTextContent(mockAIInsights[1].recommendation)
  })

  it('shows error state when sales analytics request fails', async () => {
    vi.spyOn(api, 'fetchSalesAnalyticsReports').mockRejectedValue(new Error('request failed'))
    vi.spyOn(api, 'fetchBranchPerformanceAnalysis').mockResolvedValue(mockBranchPerformance)
    vi.spyOn(aiService, 'getAIInsights').mockResolvedValue(mockAIInsights)

    render(<AnalyticsDashboard />)

    await waitFor(() => {
      expect(screen.queryByText(/Loading/)).toBeNull()
    })

    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  it('shows error state when branch performance request fails', async () => {
    vi.spyOn(api, 'fetchSalesAnalyticsReports').mockResolvedValue(mockSalesAnalytics)
    vi.spyOn(api, 'fetchBranchPerformanceAnalysis').mockRejectedValue(new Error('request failed'))
    vi.spyOn(aiService, 'getAIInsights').mockResolvedValue(mockAIInsights)

    render(<AnalyticsDashboard />)

    await waitFor(() => {
      expect(screen.queryByText(/Loading/)).toBeNull()
    })

    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  it('displays recommendations from AI insights', async () => {
    vi.spyOn(api, 'fetchSalesAnalyticsReports').mockResolvedValue(mockSalesAnalytics)
    vi.spyOn(api, 'fetchBranchPerformanceAnalysis').mockResolvedValue(mockBranchPerformance)
    vi.spyOn(aiService, 'getAIInsights').mockResolvedValue(mockAIInsights)

    render(<AnalyticsDashboard />)

    await waitFor(() => {
      expect(screen.queryByText(/Loading/)).toBeNull()
    })

    const recSummary = screen.getByLabelText('recommendations-summary')
    expect(recSummary).toBeInTheDocument()

    // Check all recommendations appear
    mockAIInsights.forEach((insight) => {
      expect(recSummary).toHaveTextContent(insight.recommendation)
    })
  })

  it('displays loading state initially', () => {
    vi.spyOn(api, 'fetchSalesAnalyticsReports').mockReturnValue(new Promise(() => {}))
    vi.spyOn(api, 'fetchBranchPerformanceAnalysis').mockReturnValue(new Promise(() => {}))
    vi.spyOn(aiService, 'getAIInsights').mockReturnValue(new Promise(() => {}))

    render(<AnalyticsDashboard />)

    expect(screen.getByLabelText('loading-metrics')).toBeInTheDocument()
  })
})

