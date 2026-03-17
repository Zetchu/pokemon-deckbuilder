import { describe, it, expect } from 'vitest';
import { checkDeckLimits, validateDeck } from './rules';
import type { DeckItem } from './types';

// Mock Card Factory
const createCard = (
  id: string,
  name: string,
  category: 'Pokemon' | 'Energy' | 'Trainer',
  count = 1,
  stage?: string
): DeckItem => ({
  id,
  localId: id,
  name,
  category,
  count,
  stage,
  rarity: 'Common',
  set: { id: 'base1', name: 'Base Set' },
  image: `img_${id}`,
});

describe('Pokemon TCG Rules', () => {
  describe('checkDeckLimits', () => {
    it('allows adding a card when under limits', () => {
      const deck: DeckItem[] = [createCard('1', 'Pika', 'Pokemon', 1)];
      const newCard = createCard('2', 'Charizard', 'Pokemon', 1);

      const result = checkDeckLimits(deck, newCard);
      expect(result.allowed).toBe(true);
    });

    it('blocks adding card when deck is full (60 cards)', () => {
      const deck: DeckItem[] = [createCard('1', 'Filler', 'Pokemon', 60)];
      const newCard = createCard('2', 'New', 'Pokemon', 1);

      const result = checkDeckLimits(deck, newCard);
      expect(result.allowed).toBe(false);
      expect(result.reason).toContain('deck is full');
    });

    it('enforces 4-copy rule for normal cards', () => {
      const deck: DeckItem[] = [createCard('1', 'Pika', 'Pokemon', 4)];
      const newCard = createCard('1', 'Pika', 'Pokemon', 1);

      const result = checkDeckLimits(deck, newCard);
      expect(result.allowed).toBe(false);
      expect(result.reason).toContain('more than 4');
    });

    it('allows more than 4 copies of Basic Energy', () => {
      const deck: DeckItem[] = [
        createCard('e1', 'Basic Fire Energy', 'Energy', 4),
      ];
      // Note: The logic checks for "Basic" in name and category "Energy"
      const newCard = createCard('e1', 'Basic Fire Energy', 'Energy', 1);

      const result = checkDeckLimits(deck, newCard);
      expect(result.allowed).toBe(true);
    });

    it('enforces 4-copy rule for Special Energy (non-Basic)', () => {
      const deck: DeckItem[] = [
        createCard('e2', 'Double Colorless Energy', 'Energy', 4),
      ];
      const newCard = createCard('e2', 'Double Colorless Energy', 'Energy', 1);

      const result = checkDeckLimits(deck, newCard);
      expect(result.allowed).toBe(false);
    });
  });

  describe('validateDeck', () => {
    it('Passes for a valid deck', () => {
      const deck: DeckItem[] = [
        createCard('1', 'Pika', 'Pokemon', 1, 'Basic'),
        createCard('2', 'Filler', 'Pokemon', 59),
      ];
      const errors = validateDeck(deck);
      expect(errors).toHaveLength(0);
    });

    it('Fails if deck size is not 60', () => {
      const deck: DeckItem[] = [
        createCard('1', 'Pika', 'Pokemon', 59, 'Basic'),
      ];
      const errors = validateDeck(deck);
      expect(errors).toContain(
        'Deck must have exactly 60 cards (currently 59).'
      );
    });

    it('Fails if no Basic Pokemon are present', () => {
      const deck: DeckItem[] = [createCard('1', 'Potion', 'Trainer', 60)];
      const errors = validateDeck(deck);
      expect(errors).toContain('Deck must contain at least one Basic Pokémon.');
    });
  });
});
