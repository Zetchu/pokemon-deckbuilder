export interface PokemonCard {
  id: string;
  localId: string;
  name: string;
  image?: string;
  category: 'Pokemon' | 'Energy' | 'Trainer';
  types?: string[];
  stage?: string;
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
