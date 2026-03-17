import { createContext, useContext, useState, type ReactNode } from 'react';
import type { PokemonCard, DeckItem } from '../pokemon/types';
import { createInitialState, type State } from '../logic';
import { checkDeckLimits } from '../pokemon/rules';

type DeckContextType = {
  state: State;
  deck: DeckItem[];
  availableCards: PokemonCard[];
  error: string;
  activeDeckId: string | null;
  activeDeckName: string;
  actions: {
    addCardToDeck: (card: PokemonCard) => void;
    removeCardFromDeck: (cardId: string) => void;
    loadDeck: (deck: DeckItem[], id?: string, name?: string) => void;
    clearDeck: () => void;
  };
};

const DeckContext = createContext<DeckContextType | undefined>(undefined);

export function DeckProvider({
  children,
  initialCards,
  initialDeck = [],
}: {
  children: ReactNode;
  initialCards: PokemonCard[];
  initialDeck?: DeckItem[];
}) {
  const [state, setState] = useState<State>(
    createInitialState(initialCards, initialDeck)
  );
  const [error, setError] = useState('');
  const [activeDeckId, setActiveDeckId] = useState<string | null>(null);
  const [activeDeckName, setActiveDeckName] = useState('');

  const addCardToDeck = (card: PokemonCard) => {
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
    setState((prevState) => {
      const existingItem = prevState.deck.find((item) => item.id === cardId);
      if (!existingItem) return prevState;

      let newDeck;
      if (existingItem.count > 1) {
        newDeck = prevState.deck.map((item) =>
          item.id === cardId ? { ...item, count: item.count - 1 } : item
        );
      } else {
        newDeck = prevState.deck.filter((item) => item.id !== cardId);
      }
      return { ...prevState, deck: newDeck };
    });
  };

  const loadDeck = (deck: DeckItem[], id?: string, name?: string) => {
    setState((prev) => ({ ...prev, deck }));
    setActiveDeckId(id || null);
    setActiveDeckName(name || '');
  };

  const clearDeck = () => {
    setState((prev) => ({ ...prev, deck: [] }));
    setActiveDeckId(null);
    setActiveDeckName('');
  };

  return (
    <DeckContext.Provider
      value={{
        state,
        deck: state.deck,
        availableCards: state.availableCards,
        error,
        activeDeckId,
        activeDeckName,
        actions: {
          addCardToDeck,
          removeCardFromDeck,
          loadDeck,
          clearDeck,
        },
      }}
    >
      {children}
    </DeckContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useDeck() {
  const context = useContext(DeckContext);
  if (context === undefined) {
    throw new Error('useDeck must be used within a DeckProvider');
  }
  return {
    ...context, // Expose everything
    ...context.state, // Flatten state for convenience
    ...context.actions, // Flatten actions
  };
}

// Keep backward compatibility if used elsewhere, or just rely on useDeck
// eslint-disable-next-line react-refresh/only-export-components
export function useDeckActions() {
  const context = useContext(DeckContext);
  if (context === undefined) {
    throw new Error('useDeckActions must be used within a DeckProvider');
  }
  return context.actions;
}
