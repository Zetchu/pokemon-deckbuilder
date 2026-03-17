export interface PokemonCard {
  id: string;
  localId: string; // The number on the card in the set
  name: string;
  image?: string; // High-res URL provided by TCGdex
  category: 'Pokemon' | 'Energy' | 'Trainer';
  types?: string[]; // e.g., ["Fire", "Water"]
  stage?: string; // e.g., "Basic", "Stage 1", "Stage 2"
  rarity: string;
  set: {
    id: string;
    name: string;
    logo?: string;
  };
  hp?: number;
  retreat?: number;
}

export interface DeckItem extends PokemonCard {
  count: number;
}
