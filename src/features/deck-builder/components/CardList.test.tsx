import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { DeckProvider } from '../../../shared/contexts/DeckContext';
import { RIFTBOUND_CARDS } from '../../../shared/data/mockCards';
import CardList from './CardList';

describe('CardList', () => {
  it('renders correctly', () => {
    // Mock the context provider
    render(
      <DeckProvider initialCards={RIFTBOUND_CARDS}>
        <CardList />
      </DeckProvider>
    );

    expect(screen.getByText('📚 Card Database')).toBeInTheDocument();
  });
});
