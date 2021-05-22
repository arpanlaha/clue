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
  "Lounge",
  "Library",
  "Study",
];

export type Room = typeof ROOMS[number];

export type Card = Character | Weapon | Room;
export type CardType = "Character" | "Weapon" | "Room";

export function getCardType(card: Card): CardType {
  if (CHARACTERS.includes(card as Character)) {
    return "Character";
  }

  if (WEAPONS.includes(card as Weapon)) {
    return "Weapon";
  }

  return "Room";
}

function generateNumbering(): Record<Card, number> {
  const numbering: Partial<Record<Card, number>> = {};

  CHARACTERS.forEach((character, index) => (numbering[character] = index));
  WEAPONS.forEach(
    (weapon, index) => (numbering[weapon] = index + CHARACTERS.length)
  );
  ROOMS.forEach(
    (room, index) =>
      (numbering[room] = index + CHARACTERS.length + WEAPONS.length)
  );

  return numbering as Record<Card, number>;
}

export const NUMBERING: Record<Card, number> = generateNumbering();

export const DECK: Card[] = (CHARACTERS.slice() as Card[])
  .concat(WEAPONS.slice() as Card[])
  .concat(ROOMS.slice() as Card[]);

export const MIN_PLAYERS = 3;
export const MAX_PLAYERS = CHARACTERS.length;
