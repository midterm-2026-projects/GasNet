import { describe, it, expect } from 'vitest'

import request from 'supertest'
import app from "../src/app.js";

describe('GET /api/analytics-dashboard', () => {
  it('should be generating analytics reports successfully', async () => {
    const res = await request(app).get('/api/analytics-dashboard').expect(200)

    expect(res.body.success).toBe(true)
    expect(res.body.data).toHaveProperty('salesAnalytics')
    expect(res.body.data.salesAnalytics).toHaveProperty('weekly')
    expect(res.body.data.salesAnalytics).toHaveProperty('monthly')
    expect(res.body.data.salesAnalytics).toHaveProperty('annual')

    expect(res.body.data.salesAnalytics.weekly.scope).toBe('weekly')
    expect(res.body.data.salesAnalytics.monthly.scope).toBe('monthly')
    expect(res.body.data.salesAnalytics.annual.scope).toBe('annual')
  })

  it('should be analyzing branch performance correctly', async () => {
    const res = await request(app).get('/api/analytics-dashboard').expect(200)

    expect(res.body.data).toHaveProperty('branchPerformanceAnalysis')
    const bpa = res.body.data.branchPerformanceAnalysis

    expect(bpa).toHaveProperty('branchSalesAnalysis')
    expect(bpa).toHaveProperty('branchComparisonReport')
    expect(bpa).toHaveProperty('targetProgressAnalysisReport')

    expect(Array.isArray(bpa.branchSalesAnalysis)).toBe(true)
    expect(Array.isArray(bpa.branchComparisonReport)).toBe(true)
    expect(Array.isArray(bpa.targetProgressAnalysisReport)).toBe(true)

    // Verify branch comparison is sorted by sales descending
    const comparison = bpa.branchComparisonReport
    for (let i = 0; i < comparison.length - 1; i += 1) {
      expect(comparison[i].monthlySales).toBeGreaterThanOrEqual(comparison[i + 1].monthlySales)
    }

    // Verify valid statuses
    const allowed = new Set(['achieved', 'on-track', 'needs-attention'])
    bpa.targetProgressAnalysisReport.forEach((row) => {
      expect(allowed.has(row.status)).toBe(true)
    })
  })

  it('should be displaying analytics results accurately', async () => {
    const res = await request(app).get('/api/analytics-dashboard').expect(200)

    // Verify overview metrics
    expect(res.body.data).toHaveProperty('overviewMetrics')
    const metrics = res.body.data.overviewMetrics
    expect(metrics).toHaveProperty('totalBranches')
    expect(metrics).toHaveProperty('totalSales')
    expect(metrics).toHaveProperty('totalTarget')
    expect(metrics).toHaveProperty('averageTargetProgress')
    expect(metrics).toHaveProperty('totalTransactions')
    expect(metrics).toHaveProperty('branchesOnTrack')
    expect(metrics).toHaveProperty('totalSalesFormatted')

    expect(metrics.totalBranches).toBeGreaterThan(0)
    expect(metrics.totalSales).toBeGreaterThan(0)
    expect(metrics.totalTarget).toBeGreaterThan(0)
  })

  it('should return 400 if no data is available', async () => {
    const res = await request(app).get('/api/analytics-dashboard?noData=true').expect(400)

    expect(res.body.success).toBe(false)
    expect(res.body.error).toBe('No data found')
  })

  it('should be producing expected report outputs with AI insights', async () => {
    const res = await request(app).get('/api/analytics-dashboard').expect(200)

    // Verify AI insights
    expect(res.body.data).toHaveProperty('aiInsights')
    expect(Array.isArray(res.body.data.aiInsights)).toBe(true)
    expect(res.body.data.aiInsights.length).toBeGreaterThan(0)

    const insight = res.body.data.aiInsights[0]
    expect(insight).toHaveProperty('id')
    expect(insight).toHaveProperty('type')
    expect(insight).toHaveProperty('insight')
    expect(insight).toHaveProperty('recommendation')
    expect(insight).toHaveProperty('trend')
    expect(insight).toHaveProperty('severity')
  })
})

