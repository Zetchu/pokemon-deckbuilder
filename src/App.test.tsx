import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from './App';
import { RIFTBOUND_CARDS } from './shared/data/mockCards';

// Mock the API hook
vi.mock('./shared/api/cards', () => ({
  useCards: () => [RIFTBOUND_CARDS, { refresh: vi.fn() }],
}));

describe('App', () => {
  it('renders correctly', async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Home')).toBeInTheDocument();
    });
  });
});
