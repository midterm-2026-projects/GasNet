import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import RecommendationValidationReport from '../../../components/week2/RecommendationValidationReport';
import * as aiService from '../../../services/aiService';
import { vi, describe, afterEach, test, expect } from 'vitest';

describe('Recommendation Display Validation Report', () => {
  afterEach(() => vi.restoreAllMocks());

  test('PASS when all insights have recommendations', async () => {
    const mock = [
      { id: 'i1', recommendation: 'Do X' },
      { id: 'i2', recommendation: 'Do Y' }
    ];
    vi.spyOn(aiService, 'getAIInsights').mockResolvedValue(mock);

    render(<RecommendationValidationReport />);
    expect(screen.getByRole('status')).toHaveTextContent('Loading recommendation validation...');
    await waitFor(() => expect(screen.queryByRole('status')).toBeNull());

    expect(screen.getByTestId('recommendation-summary')).toHaveTextContent('PASS');
    expect(screen.getByTestId('rec-check-i1')).toHaveTextContent('Has recommendation');
    expect(screen.getByTestId('recommendation-count')).toHaveTextContent('2');
  });

  test('FAIL when any insight missing recommendation', async () => {
    const mock = [
      { id: 'i1', recommendation: 'Do X' },
      { id: 'i2', recommendation: '' }
    ];
    vi.spyOn(aiService, 'getAIInsights').mockResolvedValue(mock);

    render(<RecommendationValidationReport />);
    await waitFor(() => expect(screen.queryByRole('status')).toBeNull());

    expect(screen.getByTestId('recommendation-summary')).toHaveTextContent('FAIL');
    expect(screen.getByTestId('rec-check-i2')).toHaveTextContent('Missing recommendation');
    expect(screen.getByTestId('recommendation-count')).toHaveTextContent('1');
  });
});
