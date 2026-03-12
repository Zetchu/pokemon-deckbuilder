import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import DeckBuilderPage from './DeckBuilderPage';
import userEvent from '@testing-library/user-event';
import { RIFTBOUND_CARDS } from '../data/mockCards';

vi.mock('../api/cards', () => ({
  useCards: () => [RIFTBOUND_CARDS, { refresh: vi.fn() }],
}));

describe('DeckBuilderPage', () => {
  it('renders correctly and allows user to add and remove cards', async () => {
    const user = userEvent.setup();
    render(<DeckBuilderPage />);

    // Check initial state
    expect(screen.getByText('Deck Status')).toBeInTheDocument();
    expect(screen.getByText('0 / 40')).toBeInTheDocument();

    // Find a card in the list
    const addButton = screen.getAllByText('Add')[0];

    // Add card
    await user.click(addButton);

    // Verify deck update
    expect(screen.getByText('1 / 40')).toBeInTheDocument();
    expect(screen.getByText(/\(x1\)/)).toBeInTheDocument();

    // Add same card again
    await user.click(addButton);
    expect(screen.getByText('2 / 40')).toBeInTheDocument();
    expect(screen.getByText(/\(x2\)/)).toBeInTheDocument();

    // Remove card
    const removeButton = screen.getByLabelText('remove');
    await user.click(removeButton);

    expect(screen.getByText('1 / 40')).toBeInTheDocument();
    expect(screen.getByText(/\(x1\)/)).toBeInTheDocument();
  });

  it('shows error message when adding more than 3 copies', async () => {
    const user = userEvent.setup();
    render(<DeckBuilderPage />);

    const addButtons = screen.getAllByText('Add');
    const firstAddButton = addButtons[0];

    // Add 3 copies
    await user.click(firstAddButton);
    await user.click(firstAddButton);
    await user.click(firstAddButton);

    // Try adding 4th copy
    await user.click(firstAddButton);

    // Expect alert
    expect(await screen.findByRole('alert')).toHaveTextContent('3 copies');
  });
});
