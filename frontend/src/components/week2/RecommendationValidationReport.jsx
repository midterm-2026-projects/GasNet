import { useEffect, useState } from 'react';
import { getAIInsights } from '../../services/aiService';

export default function RecommendationValidationReport() {
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

  if (loading) return <div role="status">Loading recommendation validation...</div>;

  const checks = insights.map((it) => ({
    id: it.id,
    hasRecommendation: typeof it.recommendation === 'string' && it.recommendation.trim().length > 0
  }));

  const allPass = checks.every((c) => c.hasRecommendation);

  return (
    <section aria-label="recommendation-validation-report">
      <h2>Recommendation Display Validation Report</h2>
      <div data-testid="recommendation-summary">{allPass ? 'PASS' : 'FAIL'}</div>
      <ul>
        {checks.map((c) => (
          <li key={c.id} data-testid={`rec-check-${c.id}`}>
            {c.id}: {c.hasRecommendation ? 'Has recommendation' : 'Missing recommendation'}
          </li>
        ))}
      </ul>
      <div aria-label="recommendation-count" data-testid="recommendation-count">{checks.filter(c => c.hasRecommendation).length}</div>
    </section>
  );
}
