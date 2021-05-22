import {
  Card,
  Character,
  CHARACTERS,
  MAX_PLAYERS,
  MIN_PLAYERS,
  Room,
  ROOMS,
  Weapon,
  WEAPONS,
} from "./schema";

interface GameState {
  murderCharacter: Character;
  murderWeapon: Weapon;
  murderRoom: Room;
  hands: Partial<Record<Character, Card[]>>;
  players: Character[];
}

export function generateGameState(players: Character[]): GameState | null {
  const numPlayers = players.length;

  if (numPlayers < MIN_PLAYERS || numPlayers > MAX_PLAYERS) {
    return null;
  }

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

export function encodeGame(game: GameState): string {
  return atob(JSON.stringify(game));
}

export function decodeGame(gameEncoding: string): GameState {
  return JSON.parse(btoa(gameEncoding));
}

// Function copied from https://stackoverflow.com/a/12646864
function shuffleArray<T>(array: T[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
