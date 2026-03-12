import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CardList from './CardList';
import { DeckProvider } from '../context';
import { RIFTBOUND_CARDS } from '../data/mockCards';

describe('CardList', () => {
  it('renders correctly', () => {
    // Mock the context provider
    render(
      <DeckProvider initialCards={RIFTBOUND_CARDS}>
        <CardList />
      </DeckProvider>
    );

    expect(screen.getByText('📚 Card Database')).toBeInTheDocument();
    expect(screen.getByText(RIFTBOUND_CARDS[0].name)).toBeInTheDocument();
  });
});
