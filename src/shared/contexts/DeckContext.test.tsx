import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { DeckProvider, useDeck } from './DeckContext';
import type { PokemonCard } from '../pokemon/types';

const mockCard: PokemonCard = {
  id: '1',
  localId: '1',
  name: 'Test Card',
  category: 'Pokemon',
  rarity: 'Common',
  set: { id: 'base1', name: 'Base Set' },
  image: 'img_1',
  stage: 'Basic',
};

const mockEnergy: PokemonCard = {
  id: 'e1',
  localId: 'e1',
  name: 'Basic Fire Energy',
  category: 'Energy',
  rarity: 'Common',
  set: { id: 'base1', name: 'Base Set' },
  image: 'img_e1',
};

describe('DeckContext', () => {
  it('initializes with empty deck', () => {
    const { result } = renderHook(() => useDeck(), {
      wrapper: ({ children }) => (
        <DeckProvider initialCards={[mockCard]}>{children}</DeckProvider>
      ),
    });
    expect(result.current.deck).toEqual([]);
    expect(result.current.availableCards).toHaveLength(1);
  });

  it('adds card to deck', () => {
    const { result } = renderHook(() => useDeck(), {
      wrapper: ({ children }) => (
        <DeckProvider initialCards={[mockCard]}>{children}</DeckProvider>
      ),
    });

    act(() => {
      result.current.actions.addCardToDeck(mockCard);
    });

    expect(result.current.deck).toHaveLength(1);
    expect(result.current.deck[0].count).toBe(1);
  });

  it('increments count when adding same card', () => {
    const { result } = renderHook(() => useDeck(), {
      wrapper: ({ children }) => (
        <DeckProvider initialCards={[mockCard]}>{children}</DeckProvider>
      ),
    });

    act(() => {
      result.current.actions.addCardToDeck(mockCard);
      result.current.actions.addCardToDeck(mockCard);
    });

    expect(result.current.deck).toHaveLength(1);
    expect(result.current.deck[0].count).toBe(2);
  });

  it('removes card from deck', () => {
    const { result } = renderHook(() => useDeck(), {
      wrapper: ({ children }) => (
        <DeckProvider initialCards={[mockCard]}>{children}</DeckProvider>
      ),
    });

    act(() => {
      result.current.actions.addCardToDeck(mockCard);
      result.current.actions.removeCardFromDeck(mockCard.id);
    });

    expect(result.current.deck).toHaveLength(0);
  });

  it('clears deck', () => {
    const { result } = renderHook(() => useDeck(), {
      wrapper: ({ children }) => (
        <DeckProvider initialCards={[mockCard]}>{children}</DeckProvider>
      ),
    });

    act(() => {
      result.current.actions.addCardToDeck(mockCard);
      result.current.actions.clearDeck();
    });

    expect(result.current.deck).toHaveLength(0);
  });

  it('sets error when adding beyond limit (4 copies)', () => {
    const { result } = renderHook(() => useDeck(), {
      wrapper: ({ children }) => (
        <DeckProvider initialCards={[mockCard]}>{children}</DeckProvider>
      ),
    });

    for (let i = 0; i < 4; i++) {
      act(() => {
        result.current.actions.addCardToDeck(mockCard);
      });
    }

    act(() => {
      result.current.actions.addCardToDeck(mockCard);
    });

    expect(result.current.deck[0].count).toBe(4);
    expect(result.current.error).toContain('You cannot have more than 4');
  });

  it('allows more than 4 Basic Energy', () => {
    const { result } = renderHook(() => useDeck(), {
      wrapper: ({ children }) => (
        <DeckProvider initialCards={[mockEnergy]}>{children}</DeckProvider>
      ),
    });

    act(() => {
      for (let i = 0; i < 5; i++) {
        result.current.actions.addCardToDeck(mockEnergy);
      }
    });

    expect(result.current.deck[0].count).toBe(5);
    expect(result.current.error).toBe('');
  });
});
