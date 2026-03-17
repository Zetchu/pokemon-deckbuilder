import type { DeckItem, PokemonCard } from './types';

export const checkDeckLimits = (
  deck: DeckItem[],
  newCard: PokemonCard
): { allowed: boolean; reason?: string } => {
  const MAX_DECK_SIZE = 60;
  const MAX_COPIES = 4;

  const totalCards = deck.reduce((sum, item) => sum + item.count, 0);

  if (totalCards >= MAX_DECK_SIZE) {
    return {
      allowed: false,
      reason: `Your deck is full (${MAX_DECK_SIZE} cards max).`,
    };
  }

  // Check if card limits are reached
  const existingItem = deck.find((item) => item.id === newCard.id);
  const currentCount = existingItem ? existingItem.count : 0;

  // 4-of Rule Exception: Basic Energy
  // The name often contains "Basic Energy" or we check the category logic.
  // Prompt says: If category === 'Energy' and the name includes "Basic"
  const isBasicEnergy =
    newCard.category === 'Energy' && newCard.name.includes('Basic');

  if (!isBasicEnergy && currentCount >= MAX_COPIES) {
    return {
      allowed: false,
      reason: `You cannot have more than ${MAX_COPIES} of the same card.`,
    };
  }

  return { allowed: true };
};

export const validateDeck = (deck: DeckItem[]): string[] => {
  const errors: string[] = [];
  const totalCards = deck.reduce((sum, item) => sum + item.count, 0);

  // 60-Card Rule
  if (totalCards !== 60) {
    errors.push(`Deck must have exactly 60 cards (currently ${totalCards}).`);
  }

  // Basic Pokemon Requirement
  const hasBasicPokemon = deck.some(
    (card) => card.category === 'Pokemon' && card.stage === 'Basic'
  );
  if (!hasBasicPokemon) {
    errors.push('Deck must contain at least one Basic Pokémon.');
  }

  return errors;
};
