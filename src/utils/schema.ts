export const CHARACTERS = [
  "Green",
  "Mustard",
  "Orchid",
  "Peacock",
  "Plum",
  "Scarlett",
] as const;

export type Character = typeof CHARACTERS[number];

export const WEAPONS = [
  "Candlestick",
  "Dagger",
  "Lead Pipe",
  "Revolver",
  "Rope",
  "Wrench",
] as const;

export type Weapon = typeof WEAPONS[number];

export const ROOMS = [
  "Ballroom",
  "Billiard Room",
  "Conservatory",
  "Dining Room",
  "Hall",
  "Kitchen",
  "Library",
  "Study",
];

export type Room = typeof ROOMS[number];

export type Card = Character | Weapon | Room;

export const MIN_PLAYERS = 3;
export const MAX_PLAYERS = CHARACTERS.length;
