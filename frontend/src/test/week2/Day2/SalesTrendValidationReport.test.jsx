import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import SalesTrendValidationReport from '../../../components/week2/SalesTrendValidationReport';
import * as aiService from '../../../services/aiService';
import { vi, describe, afterEach, test, expect } from 'vitest';

describe('Sales Trend Insight Validation Report', () => {
  afterEach(() => vi.restoreAllMocks());

  test('PASS when all trends are plausible', async () => {
    const mock = [
      { id: 't1', trend: 'Up 12% vs last week' },
      { id: 't2', trend: 'Down 5% vs last month' }
    ];
    vi.spyOn(aiService, 'getAIInsights').mockResolvedValue(mock);

    render(<SalesTrendValidationReport />);
    expect(screen.getByRole('status')).toHaveTextContent('Loading sales trend validation...');
    await waitFor(() => expect(screen.queryByRole('status')).toBeNull());

    expect(screen.getByTestId('trend-summary')).toHaveTextContent('PASS');
    expect(screen.getByTestId('trend-check-t1')).toHaveTextContent('Plausible');
    expect(screen.getByTestId('trend-count')).toHaveTextContent('2');
  });

  test('FAIL when any trend is missing or implausible', async () => {
    const mock = [
      { id: 't1', trend: 'Up 12% vs last week' },
      { id: 't2', trend: '' }
    ];
    vi.spyOn(aiService, 'getAIInsights').mockResolvedValue(mock);

    render(<SalesTrendValidationReport />);
    await waitFor(() => expect(screen.queryByRole('status')).toBeNull());

    expect(screen.getByTestId('trend-summary')).toHaveTextContent('FAIL');
    expect(screen.getByTestId('trend-check-t2')).toHaveTextContent('Implausible');
    expect(screen.getByTestId('trend-count')).toHaveTextContent('1');
  });
});
