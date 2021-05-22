import React from "react";
import { useParams } from "react-router-dom";

interface GameRoomProps {
  game: string;
}

export default function Game() {
  const { game } = useParams<GameRoomProps>();

  return <h1>{game}</h1>;
}
