export interface Card {
  id: string;
  name: string;
  riftbound_id?: string;
  tcgplayer_id?: string;
  public_code?: string;
  collector_number?: number;
  attributes?: {
    energy: number | null;
    might: number | null;
    power: number | null;
  };
  classification?: {
    type: string;
    supertype: string | null;
    rarity: string;
    domain: string[];
  };
  text?: {
    rich: string;
    plain: string;
  };
  set?: {
    id: string;
    label: string;
  };
  media?: {
    image_url: string;
    artist: string;
    accessibility_text: string;
  };
  tags?: string[];
  orientation?: string;
  metadata?: {
    alternate_art: boolean;
    overnumbered: boolean;
    signature: boolean;
  };
  // Keeping these for transition/backward compatibility, or mapping them
  cost?: number; // mapped from attributes.energy
  type?: string; // mapped from classification.type
  imageUrl?: string; // mapped from media.image_url
  description?: string; // mapped from text.plain
}

export interface DeckItem extends Card {
  count: number;
}
