import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { Card, DeckItem } from '../types';
import { createInitialState } from '../logic';
import type { State } from '../logic';
import { checkDeckLimits } from '../utils/deckRules';

type DeckContextType = {
  state: State;
  error: string;
  actions: {
    addCardToDeck: (card: Card) => void;
    removeCardFromDeck: (cardId: string) => void;
  };
};

const DeckContext = createContext<DeckContextType | undefined>(undefined);

export function DeckProvider({
  children,
  initialCards,
  initialDeck = [],
}: {
  children: ReactNode;
  initialCards: Card[];
  initialDeck?: DeckItem[];
}) {
  const [state, setState] = useState<State>(
    createInitialState(initialCards, initialDeck)
  );
  const [error, setError] = useState('');

  const addCardToDeck = (card: Card) => {
    // Check limits
    const validation = checkDeckLimits(state.deck, card);
    if (!validation.allowed) {
      setError(validation.reason || 'Cannot add this card.');
      setTimeout(() => setError(''), 3000);
      return;
    }

    setError('');
    setState((prevState) => {
      const existingItem = prevState.deck.find((item) => item.id === card.id);
      let newDeck;
      if (existingItem) {
        newDeck = prevState.deck.map((item) =>
          item.id === card.id ? { ...item, count: item.count + 1 } : item
        );
      } else {
        newDeck = [...prevState.deck, { ...card, count: 1 }];
      }
      return { ...prevState, deck: newDeck };
    });
  };

  const removeCardFromDeck = (cardId: string) => {
    setError('');
    setState((prevState) => {
      const existingItem = prevState.deck.find((item) => item.id === cardId);
      let newDeck;
      if (existingItem && existingItem.count > 1) {
        newDeck = prevState.deck.map((item) =>
          item.id === cardId ? { ...item, count: item.count - 1 } : item
        );
      } else {
        newDeck = prevState.deck.filter((item) => item.id !== cardId);
      }
      return { ...prevState, deck: newDeck };
    });
  };

  return (
    <DeckContext.Provider
      value={{
        state,
        error,
        actions: { addCardToDeck, removeCardFromDeck },
      }}
    >
      {children}
    </DeckContext.Provider>
  );
}

export function useDeck() {
  const context = useContext(DeckContext);
  if (!context) {
    throw new Error('useDeck must be used within a DeckProvider');
  }
  return { ...context.state, error: context.error };
}

export function useDeckActions() {
  const context = useContext(DeckContext);
  if (!context) {
    throw new Error('useDeckActions must be used within a DeckProvider');
  }
  return context.actions;
}
