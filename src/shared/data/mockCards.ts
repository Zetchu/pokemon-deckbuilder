import type { Card } from '../types';

export const RIFTBOUND_CARDS: Card[] = [
  {
    id: 'c1',
    name: 'Rift Guardian',
    cost: 3,
    type: 'Unit',
    attributes: {
      energy: 3,
      might: 2,
      power: 4,
    },
    classification: {
      type: 'Unit',
      supertype: null,
      rarity: 'Common',
      domain: ['Life'],
    },
    text: {
      rich: '<b>Guard.</b>',
      plain: 'Guard.',
    },
    set: {
      id: 'S1',
      label: 'Core Set',
    },
    media: {
      image_url: 'https://via.placeholder.com/150',
      artist: 'Unknown',
      accessibility_text: 'A giant tree creature.',
    },
  },
  {
    id: 'c2',
    name: 'Fire Blast',
    cost: 2,
    type: 'Spell',
    attributes: {
      energy: 2,
      might: null,
      power: null,
    },
    classification: {
      type: 'Spell',
      supertype: null,
      rarity: 'Common',
      domain: ['Fire'],
    },
    text: {
      rich: 'Deal 3 damage.',
      plain: 'Deal 3 damage.',
    },
    set: {
      id: 'S1',
      label: 'Core Set',
    },
    media: {
      image_url: 'https://via.placeholder.com/150',
      artist: 'Unknown',
      accessibility_text: 'A fireball explosion.',
    },
  },
  {
    id: 'c3',
    name: 'Ancient Tome',
    cost: 1,
    type: 'Artifact',
    attributes: {
      energy: 1,
      might: null,
      power: null,
    },
    classification: {
      type: 'Artifact',
      supertype: null,
      rarity: 'Rare',
      domain: ['Neutral'],
    },
    text: {
      rich: 'Draw a card.',
      plain: 'Draw a card.',
    },
    set: {
      id: 'S1',
      label: 'Core Set',
    },
    media: {
      image_url: 'https://via.placeholder.com/150',
      artist: 'Unknown',
      accessibility_text: 'An old dusty book.',
    },
  },
];
