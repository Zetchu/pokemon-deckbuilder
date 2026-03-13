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

export function getDeck(id: string): SavedDeck | null {
  const decks = loadDecks();
  return decks.find((d) => d.id === id) || null;
}

export function deleteDeck(id: string): void {
  const existingDecks = loadDecks();
  const updatedDecks = existingDecks.filter((deck) => deck.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedDecks));
}
