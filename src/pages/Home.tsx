import React, { ReactElement, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Select } from "antd";
import { Character, CHARACTERS, MIN_PLAYERS } from "../utils/schema";
import { generateGameState, encodeGame } from "../utils/game";

import "../styles/home.css";

const { Option } = Select;

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
      <h1>Clue</h1>
      <h2>Select players below:</h2>
      <Select
        mode="multiple"
        allowClear
        placeholder="Select characters..."
        onChange={handleSelect}
      >
        {CHARACTERS.map((character) => (
          <Option key={character} value={character}>
            {character}
          </Option>
        ))}
      </Select>
      <Button
        type="primary"
        onClick={handleGenerate}
        disabled={players.length < MIN_PLAYERS}
      >
        Generate Game
      </Button>
    </>
  );
}
