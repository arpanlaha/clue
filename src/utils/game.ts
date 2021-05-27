import {
  Card,
  Character,
  CHARACTERS,
  DECK,
  NUMBERING,
  Room,
  ROOMS,
  Weapon,
  WEAPONS,
} from "./schema";

export interface GameState {
  murderCharacter: Character;
  murderWeapon: Weapon;
  murderRoom: Room;
  hands: Partial<Record<Character, Card[]>>;
  players: Character[];
}

export function generateGameState(players: Character[]): GameState {
  const numPlayers = players.length;

  const murderCharacter =
    CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
  const murderWeapon = WEAPONS[Math.floor(Math.random() * WEAPONS.length)];
  const murderRoom = ROOMS[Math.floor(Math.random() * ROOMS.length)];

  const validCharacters: Card[] = CHARACTERS.filter(
    (character) => character !== murderCharacter
  );

  const validWeapons: Card[] = WEAPONS.filter(
    (weapon) => weapon !== murderWeapon
  );

  const validRooms: Card[] = ROOMS.filter((room) => room !== murderRoom);

  const deck = validCharacters.concat(validWeapons).concat(validRooms);
  shuffleArray(deck);

  const hands: Partial<Record<Character, Card[]>> = {};
  players.forEach(
    (player, playerIndex) =>
      (hands[player] = deck.filter(
        (_, deckIndex) => deckIndex % numPlayers === playerIndex
      ))
  );

  return {
    murderCharacter,
    murderWeapon,
    murderRoom,
    hands,
    players,
  };
}

interface MinifiedGame {
  c: number;
  w: number;
  r: number;
  p: number[];
  h: Record<number, number[]>;
}

export function encodeGame(game: GameState): string {
  const { murderCharacter, murderWeapon, murderRoom, hands, players } = game;

  const minified: MinifiedGame = {
    c: NUMBERING[murderCharacter],
    w: NUMBERING[murderWeapon],
    r: NUMBERING[murderRoom],
    p: players.map((player) => NUMBERING[player]),
    h: {},
  };

  players.forEach((player) => {
    minified.h[NUMBERING[player]] = hands[player]!.map(
      (card) => NUMBERING[card]
    );
  });

  return btoa(JSON.stringify(minified));
}

export function decodeGame(gameEncoding: string): GameState {
  const minified: MinifiedGame = JSON.parse(atob(gameEncoding));

  const { c, w, r, p, h } = minified;

  const players = p.map((playerNumber) => DECK[playerNumber] as Character);
  const hands: Partial<Record<Character, Card[]>> = {};
  players.map(
    (player) => (hands[player] = h[NUMBERING[player]].map((card) => DECK[card]))
  );

  return {
    murderCharacter: DECK[c] as Character,
    murderWeapon: DECK[w] as Weapon,
    murderRoom: DECK[r] as Room,
    players,
    hands,
  };
}

// Function copied from https://stackoverflow.com/a/12646864
function shuffleArray<T>(array: T[]): void {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export function rollDice(): number {
  return rollDie(6) + rollDie(6);
}

function rollDie(sides: number): number {
  return Math.ceil(Math.random() * sides);
}
