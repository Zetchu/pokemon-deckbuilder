import { describe, it, expect } from 'vitest';
import { checkDeckLimits } from './deckRules';
import type { DeckItem, Card } from '../types';

describe('deckRules', () => {
  const mockCard: Card = {
    id: 'c1',
    name: 'Test Card',
    cost: 1,
    type: 'Spell',
  };

  describe('checkDeckLimits', () => {
    it('allows adding a card to an empty deck', () => {
      const deck: DeckItem[] = [];
      const result = checkDeckLimits(deck, mockCard);
      expect(result.allowed).toBe(true);
    });

    it('prevents adding more than 40 cards', () => {
      // Create a deck with 40 cards (using a single item with count 40 for simplicity,
      // relying on the reduce logic in the function)
      const fullDeck: DeckItem[] = [{ ...mockCard, count: 40 }];

      const result = checkDeckLimits(fullDeck, mockCard);
      expect(result.allowed).toBe(false);
      expect(result.reason).toContain('40 cards max');
    });

    it('allows adding the 40th card', () => {
      const almostFullDeck: DeckItem[] = [{ ...mockCard, count: 39 }];
      const result = checkDeckLimits(almostFullDeck, { ...mockCard, id: 'c2' });
      expect(result.allowed).toBe(true);
    });

    it('prevents adding more than 3 copies of the same card', () => {
      const deckWithThreeCopies: DeckItem[] = [{ ...mockCard, count: 3 }];

      const result = checkDeckLimits(deckWithThreeCopies, mockCard);
      expect(result.allowed).toBe(false);
      expect(result.reason).toContain('3 copies');
    });

    it('allows adding a 3rd copy', () => {
      const deckWithTwoCopies: DeckItem[] = [{ ...mockCard, count: 2 }];
      const result = checkDeckLimits(deckWithTwoCopies, mockCard);
      expect(result.allowed).toBe(true);
    });
  });
});
