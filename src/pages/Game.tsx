import React, { ChangeEvent, ReactElement, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  ModalFooter,
} from "@chakra-ui/react";
import { Card } from "../components";
import { decodeGame, GameState } from "../utils/game";
import {
  Character,
  CHARACTERS,
  DECK,
  getCardType,
  Room,
  ROOMS,
  Weapon,
  WEAPONS,
} from "../utils/schema";

import "../styles/game.css";

interface GameProps {
  game: string;
  character: string;
}

export default function Game(): ReactElement {
  const { game, character } = useParams<GameProps>();
  const [gameState, setGameState] = useState<GameState | undefined>(undefined);
  const [modalOpen, setModalOpen] = useState(false);
  const [characterName, setCharacterName] =
    useState<Character | undefined>(undefined);
  const [accusedCharacter, setAccusedCharacter] =
    useState<Character | undefined>(undefined);
  const [accusedWeapon, setAccusedWeapon] =
    useState<Weapon | undefined>(undefined);
  const [accusedRoom, setAccusedRoom] = useState<Room | undefined>(undefined);
  const [accusationSuccess, setAccusationSuccess] =
    useState<boolean | undefined>(undefined);

  useEffect(() => setGameState(decodeGame(game)), [game]);

  useEffect(
    () => setCharacterName(DECK[parseInt(character)] as Character),
    [character]
  );

  function toggleModal(): void {
    setModalOpen((visible) => !visible);
  }

  function handleAccuseCharacter(e: ChangeEvent<HTMLSelectElement>): void {
    setAccusedCharacter(e.target.value as Character);
  }

  function handleAccuseWeapon(e: ChangeEvent<HTMLSelectElement>): void {
    setAccusedWeapon(e.target.value as Weapon);
  }

  function handleAccuseRoom(e: ChangeEvent<HTMLSelectElement>): void {
    setAccusedRoom(e.target.value as Room);
  }

  function handleAccusation(): void {
    if (gameState !== undefined) {
      const { murderCharacter, murderWeapon, murderRoom } = gameState;
      setAccusationSuccess(
        accusedCharacter === murderCharacter &&
          accusedWeapon === murderWeapon &&
          accusedRoom === murderRoom
      );
    }
  }

  return (
    <>
      <h1>Character: {characterName}</h1>
      <div className="hand-grid">
        {gameState !== undefined &&
          characterName !== undefined &&
          gameState.hands[characterName]!.map((card) => (
            <Card key={card}>
              <h4>{getCardType(card)}</h4>
              {card}
            </Card>
          ))}
      </div>
      <Button colorScheme="blue" onClick={toggleModal}>
        Submit Final Accusation
      </Button>
      <Modal isOpen={modalOpen} onClose={toggleModal}>
        <ModalOverlay />
        <ModalHeader>Final Accusation</ModalHeader>
        <ModalContent>
          {accusationSuccess === undefined ? (
            <>
              <h4>Murderer:</h4>
              <Select allowClear onChange={handleAccuseCharacter}>
                {CHARACTERS.map((character) => (
                  <option key={character} value={character}>
                    {character}
                  </option>
                ))}
              </Select>
              <h4>Murder weapon:</h4>
              <Select allowClear onChange={handleAccuseWeapon}>
                {WEAPONS.map((weapon) => (
                  <option key={weapon} value={weapon}>
                    {weapon}
                  </option>
                ))}
              </Select>
              <h4>Murder location</h4>
              <Select allowClear onChange={handleAccuseRoom}>
                {ROOMS.map((room) => (
                  <option key={room} value={room}>
                    {room}
                  </option>
                ))}
              </Select>
            </>
          ) : (
            <>
              <h3>Your Accusation:</h3>
              <h4>Murderer: {accusedCharacter}</h4>
              <h4>Murder Weapon: {accusedWeapon}</h4>
              <h4>Murder Location: {accusedRoom}</h4>
              <Alert status={accusationSuccess ? "success" : "error"}>
                <AlertIcon />
                <AlertTitle>
                  {accusationSuccess ? "Correct!" : "Incorrect!"}
                </AlertTitle>
              </Alert>
            </>
          )}
        </ModalContent>
        <ModalFooter>
          <Button key="back" colorScheme="red" onClick={toggleModal}>
            Exit
          </Button>
          <Button
            key="submit"
            colorScheme="blue"
            onClick={handleAccusation}
            disabled={
              accusedCharacter === undefined ||
              accusedWeapon === undefined ||
              accusedRoom === undefined ||
              accusationSuccess === false
            }
          >
            Accuse
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
