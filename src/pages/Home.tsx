import React, { ReactElement, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Checkbox, CheckboxGroup, HStack } from "@chakra-ui/react";
import {
  Character,
  CHARACTERS,
  CHARACTER_TO_COLOR,
  MIN_PLAYERS,
} from "../utils/schema";
import { generateGameState, encodeGame } from "../utils/game";

import "../styles/home.css";

export default function Home(): ReactElement {
  const [players, setPlayers] = useState<Character[]>([]);
  const history = useHistory();

  function handleSelect(selectedPlayers: Character[] | undefined): void {
    setPlayers(selectedPlayers ?? []);
  }

  function handleGenerate(): void {
    const gameState = generateGameState(players);

    history.push(encodeGame(gameState));
  }

  return (
    <>
      <h2>Select players below:</h2>
      <CheckboxGroup onChange={handleSelect as any}>
        <HStack>
          {CHARACTERS.map((character) => (
            <Checkbox
              key={character}
              value={character}
              colorScheme={CHARACTER_TO_COLOR[character]}
            >
              {character}
            </Checkbox>
          ))}
        </HStack>
      </CheckboxGroup>

      <Button
        colorScheme="blue"
        onClick={handleGenerate}
        disabled={players.length < MIN_PLAYERS}
      >
        Generate Game
      </Button>
    </>
  );
}
