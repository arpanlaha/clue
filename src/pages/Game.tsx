import React from "react";
import { useParams } from "react-router-dom";

interface GameProps {
  game: string;
  character: string;
}

export default function Game() {
  const { game, character } = useParams<GameProps>();

  return (
    <h1>
      {game}: {character}
    </h1>
  );
}
