import { useEffect, useState } from 'react';
import { getAIInsights } from '../../../services/aiService';

export default function AIInsightCards() {
  const [insights, setInsights] = useState([]);
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

  if (loading) return <div role="status">Loading AI insights...</div>;

  return (
    <section aria-label="AI Insights Interface">
      <h2>AI Insight Cards</h2>

      <div role="list" aria-label="insight-cards">
        {insights.map((it) => (
          <article key={it.id} role="listitem" style={{border:'1px solid #ddd', padding:12, marginBottom:8}}>
            <h3>Insight</h3>
            <p data-testid={`insight-text-${it.id}`}>{it.insight}</p>
            <h4>Recommendation</h4>
            <p data-testid={`recommendation-${it.id}`}>{it.recommendation}</p>
            <div aria-label={`trend-${it.id}`}>
              <strong>Sales Trend:</strong> <span data-testid={`trend-${it.id}`}>{it.trend}</span>
            </div>
          </article>
        ))}
      </div>

      <aside aria-label="recommendations-summary" style={{marginTop:16}}>
        <h3>Recommendations</h3>
        <ul>
          {insights.map((it) => (
            <li key={`rec-${it.id}`}>{it.recommendation}</li>
          ))}
        </ul>
      </aside>

    </section>
  );
}
