// src/utils/storage.ts
import type { DeckItem } from '../types';

export interface SavedDeck {
  id: string;
  name: string;
  items: DeckItem[];
  createdAt: number;
}

const STORAGE_KEY = 'riftbound_decks';

export function saveDeck(name: string, deck: DeckItem[]): SavedDeck {
  const newDeck: SavedDeck = {
    id: crypto.randomUUID(),
    name,
    items: deck,
    createdAt: Date.now(),
  };

  const existingDecks = loadDecks();
  const updatedDecks = [...existingDecks, newDeck];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedDecks));

  return newDeck;
}

export function loadDecks(): SavedDeck[] {
  const json = localStorage.getItem(STORAGE_KEY);
  if (!json) return [];
  try {
    return JSON.parse(json);
  } catch (e) {
    console.error('Failed to parse saved decks', e);
    return [];
  }
}

export function deleteDeck(id: string): void {
  const existingDecks = loadDecks();
  const updatedDecks = existingDecks.filter((deck) => deck.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedDecks));
}
