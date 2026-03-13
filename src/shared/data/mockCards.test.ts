import { describe, it, expect } from 'vitest';
import { RIFTBOUND_CARDS } from './mockCards';

describe('mockCards', () => {
  it('exports cards', () => {
    expect(RIFTBOUND_CARDS.length).toBeGreaterThan(0);
    // Check first card structure
    const card = RIFTBOUND_CARDS[0];
    expect(card).toHaveProperty('id');
    expect(card).toHaveProperty('name');
    expect(card).toHaveProperty('cost');
    expect(card).toHaveProperty('type');
  });
});
