import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AiInsightCard from '../../../components/week2/Day2/AiInsightCard';
import * as aiService from '../../../services/aiService';
import { vi, describe, beforeEach, afterEach, test, expect } from 'vitest';


describe('Ob3W2D2 - AI Insight Cards Interface', () => {
  const mockData = [
    {
      id: 'insight-1',
      insight: 'Sales peak at 17:00 in Branch A; weekday evening demand is increasing.',
      recommendation: 'Increase evening stock and schedule an extra delivery on weekdays.',
      trend: 'Up 12% vs last week'
    }
  ];

  beforeEach(() => {
    vi.spyOn(aiService, 'getAIInsights').mockResolvedValue(mockData);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('displays AI insight cards correctly', async () => {
    render(<AiInsightCard />);
    expect(screen.getByRole('status')).toHaveTextContent('Loading AI insights...');
    // wait for loading to finish
    await waitFor(() => expect(screen.queryByRole('status')).toBeNull());

    // insight text
    expect(screen.getByTestId('insight-text-insight-1')).toHaveTextContent(mockData[0].insight);
    // recommendation
    expect(screen.getByTestId('recommendation-insight-1')).toHaveTextContent(mockData[0].recommendation);
    // trend
    expect(screen.getByTestId('trend-insight-1')).toHaveTextContent(mockData[0].trend);
  });

  test('displays recommendations section', async () => {
    render(<AiInsightCard />);
    await waitFor(() => expect(screen.queryByRole('status')).toBeNull());
    const recSummary = screen.getByLabelText('recommendations-summary');
    expect(recSummary).toBeInTheDocument();
    expect(recSummary).toHaveTextContent(mockData[0].recommendation);
  });
});
