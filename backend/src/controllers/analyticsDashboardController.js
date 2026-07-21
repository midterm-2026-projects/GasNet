import mockSalesRecords from '../data/mockSalesRecords.js'
import mockBranchSalesData from '../data/mockBranchSalesData.js'
import mockSalesTransactions from '../data/mockSalesTransactions.js'
import {
  generateAnnualSalesAnalytics,
  generateMonthlySalesAnalytics,
  generateWeeklySalesAnalytics
} from '../services/salesAnalyticsService.js'
import {
  analyzeBranchSalesData,
  calculateTargetProgressResults,
  generateBranchComparisonResults
} from '../services/branchPerformanceAnalysisService.js'

function generateAIAnalyticsInsights() {
  // Mock AI-generated insights shaped like a real AI service would return
  return [
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
      insight: 'Smaller cylinder SKUs are selling faster in Caloocan and Cuenca branches.',
      recommendation: 'Promote 3kg bundles in urban outlets to capture demand.',
      trend: 'Up 8% vs last month',
      severity: 'positive'
    },
    {
      id: 'insight-3',
      type: 'performance',
      insight: 'Sta. Teresita Branch is exceeding target by 4%, while Antipolo Branch is at 70% of target.',
      recommendation: 'Analyze Sta. Teresita best practices and consider replicating in Antipolo.',
      trend: 'Mixed performance across branches',
      severity: 'info'
    },
    {
      id: 'insight-4',
      type: 'alert',
      insight: 'Gulod Branch delivery delays may impact customer satisfaction if not addressed.',
      recommendation: 'Review logistics schedule and consider additional delivery staff for Gulod route.',
      trend: 'Delays increased 15% this week',
      severity: 'warning'
    }
  ]
}

function calculateOverviewMetrics(branchData, salesRecords) {
  const totalSales = branchData.reduce((sum, b) => sum + b.monthlySales, 0)
  const totalTarget = branchData.reduce((sum, b) => sum + b.target, 0)
  const totalTransactions = salesRecords.length

  return {
    totalBranches: branchData.length,
    totalSales,
    totalTarget,
    averageTargetProgress: branchData.length ? Number(((totalSales / totalTarget) * 100).toFixed(1)) : 0,
    totalTransactions,
    branchesOnTrack: branchData.filter(b => b.monthlySales >= b.target).length,
    totalSalesFormatted: `₱${totalSales.toLocaleString()}`
  }
}

export function getAnalyticsDashboard(req, res) {
  // Return 400 if noData query param is passed (e.g. for testing no-data scenario)
  if (req.query.noData === 'true') {
    return res.status(400).json({ success: false, error: 'No data found' })
  }

  // Sales analytics
  const weeklyAnalytics = generateWeeklySalesAnalytics(mockSalesRecords)
  const monthlyAnalytics = generateMonthlySalesAnalytics(mockSalesRecords)
  const annualAnalytics = generateAnnualSalesAnalytics(mockSalesRecords)

  // Branch performance analysis
  const branchSalesAnalysis = analyzeBranchSalesData(mockBranchSalesData)
  const branchComparisonReport = generateBranchComparisonResults(mockBranchSalesData)
  const targetProgressAnalysisReport = calculateTargetProgressResults(mockBranchSalesData)

  // AI insights
  const aiInsights = generateAIAnalyticsInsights()

  // Overview metrics
  const overviewMetrics = calculateOverviewMetrics(mockBranchSalesData, mockSalesRecords)

  res.json({
    success: true,
    data: {
      overviewMetrics,
      salesAnalytics: {
        weekly: weeklyAnalytics,
        monthly: monthlyAnalytics,
        annual: annualAnalytics
      },
      branchPerformanceAnalysis: {
        branchSalesAnalysis,
        branchComparisonReport,
        targetProgressAnalysisReport
      },
      aiInsights
    }
  })
}

