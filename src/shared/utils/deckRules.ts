import type { DeckItem, Card } from '../types';

export const checkDeckLimits = (
  deck: DeckItem[],
  newCard: Card
): { allowed: boolean; reason?: string } => {
  const MAX_DECK_SIZE = 40;
  const MAX_COPIES = 3;

  const totalCards = deck.reduce((sum, item) => sum + item.count, 0);

  if (totalCards >= MAX_DECK_SIZE) {
    return {
      allowed: false,
      reason: 'Whoa there! Your deck is full (40 cards max).',
    };
  }

  const existingItem = deck.find((item) => item.id === newCard.id);
  if (existingItem && existingItem.count >= MAX_COPIES) {
    return {
      allowed: false,
      reason: `Greedy! You can only have ${MAX_COPIES} copies of ${newCard.name}.`,
    };
  }

  return { allowed: true };
};
