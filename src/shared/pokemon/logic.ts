import type { PokemonCard, DeckItem } from '../pokemon/types';

export type State = {
  availableCards: PokemonCard[];
  deck: DeckItem[];
};

export function createInitialState(
  cards: PokemonCard[],
  initialDeck: DeckItem[] = []
): State {
  return {
    availableCards: cards,
    deck: initialDeck,
  };
}
