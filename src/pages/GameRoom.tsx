import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Select } from "antd";
import { decodeGame, GameState } from "../utils/game";
import { Character, NUMBERING } from "../utils/schema";

const { Option } = Select;

interface GameRoomProps {
  game: string;
}

export default function Game() {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [player, setPlayer] = useState<Character | undefined>(undefined);
  const { game } = useParams<GameRoomProps>();

  useEffect(() => setGameState(decodeGame(game)), [game]);

  function handleSelect(player: Character | undefined): void {
    setPlayer(player);
  }

  return (
    <>
      <h1>Select your character:</h1>
      {gameState !== null && (
        <Select
          placeholder="Select character..."
          allowClear
          style={{ width: "200px" }}
          onChange={handleSelect}
        >
          {gameState.players.map((character) => (
            <Option key={character} value={character}>
              {character}
            </Option>
          ))}
        </Select>
      )}

      <Button type="primary" disabled={player === undefined}>
        <Link to={`${game}/${player !== undefined ? NUMBERING[player] : ""}`}>
          Select
        </Link>
      </Button>
    </>
  );
}
