import React, { ChangeEvent, ReactElement, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Container, Heading } from "@chakra-ui/react";
import { Select } from "../components";
import { decodeGame, GameState } from "../utils/game";
import { Character, NUMBERING } from "../utils/schema";

interface GameRoomProps {
  game: string;
}

export default function Game(): ReactElement {
  const [gameState, setGameState] = useState<GameState | undefined>(undefined);
  const [player, setPlayer] = useState<Character | undefined>(undefined);
  const { game } = useParams<GameRoomProps>();

  useEffect(() => setGameState(decodeGame(game)), [game]);

  function handleSelect(e: ChangeEvent<HTMLSelectElement>): void {
    setPlayer(e.target.value as Character);
  }

  return (
    <Container maxW="container.md">
      <Heading as="h2" size="md">
        Select your character:
      </Heading>
      {gameState !== undefined && (
        <Select
          placeholder="Select character..."
          onChange={handleSelect}
          options={gameState.players}
        />
      )}

      <Link to={`${game}/${player !== undefined ? NUMBERING[player] : ""}`}>
        <Button colorScheme="blue" disabled={player === undefined}>
          Select
        </Button>
      </Link>
    </Container>
  );
}
