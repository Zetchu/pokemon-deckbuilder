import type { Card, DeckItem } from '../types';

export type State = {
  availableCards: Card[];
  deck: DeckItem[];
};

export function createInitialState(
  cards: Card[],
  initialDeck: DeckItem[] = []
): State {
  return {
    availableCards: cards,
    deck: initialDeck,
  };
}
