import { useEffect, useState } from 'react';
import { getAIInsights } from '../../services/aiService';

function isPlausibleTrend(trend) {
  if (!trend || typeof trend !== 'string') return false;
  const hasPercent = trend.includes('%');
  const hasDirection = /\b(Up|Down)\b/i.test(trend);
  return hasPercent || hasDirection;
}

export default function SalesTrendValidationReport() {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    getAIInsights().then((data) => {
      if (mounted) {
        setInsights(data);
        setLoading(false);
      }
    });
    return () => (mounted = false);
  }, []);

  if (loading) return <div role="status">Loading sales trend validation...</div>;

  const checks = insights.map((it) => ({
    id: it.id,
    trend: it.trend,
    plausible: isPlausibleTrend(it.trend)
  }));

  const allPass = checks.every((c) => c.plausible);

  return (
    <section aria-label="sales-trend-validation-report">
      <h2>Sales Trend Insight Validation Report</h2>
      <div data-testid="trend-summary">{allPass ? 'PASS' : 'FAIL'}</div>
      <ul>
        {checks.map((c) => (
          <li key={c.id} data-testid={`trend-check-${c.id}`}>
            {c.id}: {c.trend || '<missing>'} — {c.plausible ? 'Plausible' : 'Implausible'}
          </li>
        ))}
      </ul>
      <div aria-label="trend-count" data-testid="trend-count">{checks.filter(c => c.plausible).length}</div>
    </section>
  );
}
