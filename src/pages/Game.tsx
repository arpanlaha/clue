import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from "antd";
import { decodeGame, GameState } from "../utils/game";
import { Character, DECK, getCardType } from "../utils/schema";

interface GameProps {
  game: string;
  character: string;
}

export default function Game() {
  const { game, character } = useParams<GameProps>();
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [characterName, setCharacterName] = useState<Character | null>(null);

  useEffect(() => setGameState(decodeGame(game)), [game]);

  useEffect(
    () => setCharacterName(DECK[parseInt(character)] as Character),
    [character]
  );

  return (
    <>
      <h1>Character: {characterName}</h1>
      {gameState !== null &&
        characterName !== null &&
        gameState.hands[characterName]!.map((card) => (
          <Card style={{ width: "200px" }} title={getCardType(card)}>
            {card}
          </Card>
        ))}
    </>
  );
}
