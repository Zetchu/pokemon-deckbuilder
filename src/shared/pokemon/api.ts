import type { PokemonCard } from './types';

const BASE_URL = 'https://api.tcgdex.net/v2/en';

export async function fetchBaseSetCards(): Promise<PokemonCard[]> {
  const response = await fetch(`${BASE_URL}/sets/base1`);
  if (!response.ok) throw new Error('TCGdex API unavailable');

  const data = await response.json();
  const cardList = data.cards;

  // We need to fetch details for each card to get category, types, hp, etc.
  // Limiting concurrency to avoid overwhelming the browser/API
  const detailedCards: PokemonCard[] = [];
  const batchSize = 5;

  for (let i = 0; i < cardList.length; i += batchSize) {
    const batch = cardList.slice(i, i + batchSize);
    const promises = batch.map(async (card: { id: string }) => {
      try {
        const detailRes = await fetch(`${BASE_URL}/cards/${card.id}`);
        if (!detailRes.ok) return null;
        const detail = await detailRes.json();
        return {
          ...detail,
          image: `${detail.image}/high.webp`,
        };
      } catch (e) {
        console.error(`Failed to fetch card ${card.id}`, e);
        return null;
      }
    });

    const results = await Promise.all(promises);
    detailedCards.push(...(results.filter((c) => c !== null) as PokemonCard[]));
  }

  return detailedCards;
}
