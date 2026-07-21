import { describe, it, expect } from 'vitest'
import { getAIInsights } from '../../../src/services/aiService'

describe('getAIInsights', () => {
  it('should be generating AI insights successfully', async () => {
    const insights = await getAIInsights()

    expect(Array.isArray(insights)).toBe(true)
    expect(insights.length).toBeGreaterThan(0)
  })

  it('should be producing expected insight structure with required fields', async () => {
    const insights = await getAIInsights()

    insights.forEach((insight) => {
      expect(insight).toHaveProperty('id')
      expect(typeof insight.id).toBe('string')

      expect(insight).toHaveProperty('insight')
      expect(typeof insight.insight).toBe('string')
      expect(insight.insight.trim().length).toBeGreaterThan(0)

      expect(insight).toHaveProperty('recommendation')
      expect(typeof insight.recommendation).toBe('string')
      expect(insight.recommendation.trim().length).toBeGreaterThan(0)

      expect(insight).toHaveProperty('trend')
      expect(typeof insight.trend).toBe('string')
      expect(insight.trend.trim().length).toBeGreaterThan(0)
    })
  })

  it('should be generating recommendations correctly with actionable text', async () => {
    const insights = await getAIInsights()

    insights.forEach((insight) => {
      expect(insight.recommendation).toBeTruthy()
      // Recommendation should be actionable (not empty, not just whitespace)
      expect(insight.recommendation.trim().length).toBeGreaterThan(5)
    })
  })

  it('should return trend strings that reference direction or percentage', async () => {
    const insights = await getAIInsights()

    insights.forEach((insight) => {
      const trend = insight.trend
      const hasPercent = trend.includes('%')
      const hasDirection = /\b(Up|Down|Mixed|Increasing|Decreasing)\b/i.test(trend)
      expect(hasPercent || hasDirection).toBe(true)
    })
  })

  it('should return all insights with unique ids', async () => {
    const insights = await getAIInsights()
    const ids = insights.map((i) => i.id)
    const uniqueIds = new Set(ids)

    expect(uniqueIds.size).toBe(ids.length)
  })
})

