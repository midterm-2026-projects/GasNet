// Thin adapter for AI service. Returns mock insight objects for current phase.
export async function getAIInsights() {
  // Mock data shaped like the real AI service would return
  const mock = [
    {
      id: 'insight-1',
      insight: 'Sales peak at 17:00 in Branch A; weekday evening demand is increasing.',
      recommendation: 'Increase evening stock and schedule an extra delivery on weekdays.',
      trend: 'Up 12% vs last week'
    },
    {
      id: 'insight-2',
      insight: 'Smaller cylinder SKUs are selling faster in urban branches.',
      recommendation: 'Promote 3kg bundles in urban outlets to capture demand.',
      trend: 'Up 8% vs last month'
    }
  ];

  // Simulate async call
  return new Promise((resolve) => setTimeout(() => resolve(mock), 50));
}
