import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import DeckDisplay from './DeckDisplay';

describe('DeckDisplay', () => {
  it('renders with placeholder text when deck is empty', () => {
    const deck: any[] = [];
    render(<DeckDisplay deck={deck} onRemoveCard={() => {}} />);
    expect(
      screen.getByText(/Your deck is looking a little empty/)
    ).toBeInTheDocument();
  });

  it('renders with cards when present', () => {
    const deck = [
      { id: 'c1', name: "Teemo's Mushroom", type: 'Trap', cost: 1, count: 2 },
    ];
    render(<DeckDisplay deck={deck} onRemoveCard={() => {}} />);
    expect(screen.getByText("Teemo's Mushroom")).toBeInTheDocument();
    expect(screen.getByText('2x')).toBeInTheDocument();
  });
});
