// src/utils/storage.ts
import type { DeckItem } from '../pokemon/types';

export interface SavedDeck {
  id: string;
  name: string;
  items: DeckItem[];
  createdAt: number;
}

const STORAGE_KEY = 'riftbound_decks';

function loadDecks(): SavedDeck[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

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

export function updateDeck(
  id: string,
  name: string,
  deck: DeckItem[]
): SavedDeck {
  const existingDecks = loadDecks();
  const deckIndex = existingDecks.findIndex((d) => d.id === id);

  if (deckIndex === -1) {
    throw new Error('Deck not found');
  }

  const updatedDeck: SavedDeck = {
    ...existingDecks[deckIndex],
    name,
    items: deck,
    // Optional: update 'updatedAt' timestamp if we had one
  };

  const updatedDecks = [...existingDecks];
  updatedDecks[deckIndex] = updatedDeck;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedDecks));
  return updatedDeck;
}

export function getDecks(): SavedDeck[] {
  return loadDecks();
}

export function getDeck(id: string): SavedDeck | undefined {
  return loadDecks().find((d) => d.id === id);
}

export function deleteDeck(id: string): void {
  const existingDecks = loadDecks();
  const updatedDecks = existingDecks.filter((d) => d.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedDecks));
}
