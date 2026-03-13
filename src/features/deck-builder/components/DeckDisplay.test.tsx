import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import DeckDisplay from './DeckDisplay';
import { DeckProvider } from '../contexts/DeckContext';
import { RIFTBOUND_CARDS } from '../data/mockCards';
import type { DeckItem } from '../types';

describe('DeckDisplay', () => {
  const mockDeck: DeckItem[] = [{ ...RIFTBOUND_CARDS[0], count: 2 }];

  it('renders with placeholder text when deck is empty', () => {
    render(
      <DeckProvider initialCards={RIFTBOUND_CARDS} initialDeck={[]}>
        <DeckDisplay />
      </DeckProvider>
    );

    expect(
      screen.getByText(/Your deck is looking a little empty/)
    ).toBeInTheDocument();
  });

  it('renders with cards when present', () => {
    render(
      <DeckProvider initialCards={RIFTBOUND_CARDS} initialDeck={mockDeck}>
        <DeckDisplay />
      </DeckProvider>
    );

    expect(screen.getByText(/Teemo's Mushroom \(x2\)/)).toBeInTheDocument();
  });
});
