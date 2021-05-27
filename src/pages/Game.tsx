import React, { ChangeEvent, ReactElement, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Container,
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalFooter,
  SimpleGrid,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Card, Select } from "../components";
import { accuse, decodeGame, GameState, rollDice } from "../utils/game";
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
  const toast = useToast();

  useEffect(() => setGameState(decodeGame(game)), [game]);

  useEffect(
    () => setCharacterName(DECK[parseInt(character)] as Character),
    [character]
  );

  function handleRoll(): void {
    toast.closeAll();
    toast({
      title: `You rolled a ${rollDice()}!`,
      duration: null,
      isClosable: true,
    });
  }

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
    if (
      gameState !== undefined &&
      accusedCharacter !== undefined &&
      accusedWeapon !== undefined &&
      accusedRoom !== undefined
    ) {
      const accusation = { accusedCharacter, accusedWeapon, accusedRoom };

      setAccusationSuccess(accuse(accusation, gameState));
    }
  }

  return (
    <Container maxW="container.md">
      <Heading as="h2" size="md">
        Character: {characterName}
      </Heading>
      <SimpleGrid className="hand-grid" columns={3} spacing={2}>
        {gameState !== undefined &&
          characterName !== undefined &&
          gameState.hands[characterName]!.map((card) => (
            <Card key={card}>
              <Heading as="h3" size="sm">
                {getCardType(card)}
              </Heading>
              <Text>{card}</Text>
            </Card>
          ))}
      </SimpleGrid>
      <Button colorScheme="blue" onClick={handleRoll}>
        Roll Dice
      </Button>
      <Button colorScheme="red" onClick={toggleModal}>
        Submit Final Accusation
      </Button>
      <Modal isOpen={modalOpen} onClose={toggleModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Final Accusation</ModalHeader>
          <ModalBody>
            {accusationSuccess === undefined ? (
              <>
                <Heading as="h3" size="sm">
                  Murderer:
                </Heading>
                <Select
                  onChange={handleAccuseCharacter}
                  placeholder="Pick a character..."
                  options={CHARACTERS}
                />
                <Heading as="h3" size="sm">
                  Murder Weapon:
                </Heading>
                <Select
                  onChange={handleAccuseWeapon}
                  placeholder="Pick a weapon..."
                  options={WEAPONS}
                />
                <Heading as="h3" size="sm">
                  Murder Location:
                </Heading>
                <Select
                  onChange={handleAccuseRoom}
                  placeholder="Pick a room..."
                  options={ROOMS}
                />
              </>
            ) : (
              <>
                <Heading as="h3" size="sm">
                  Your Accusation:
                </Heading>
                <Text>Murderer: {accusedCharacter}</Text>
                <Text>Murder Weapon: {accusedWeapon}</Text>
                <Text>Murder Location: {accusedRoom}</Text>
                <Alert status={accusationSuccess ? "success" : "error"}>
                  <AlertIcon />
                  <AlertTitle>
                    {accusationSuccess ? "Correct!" : "Incorrect!"}
                  </AlertTitle>
                </Alert>
              </>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              className="modal-button"
              key="back"
              colorScheme="red"
              onClick={toggleModal}
            >
              Exit
            </Button>
            <Button
              className="modal-button"
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
        </ModalContent>
      </Modal>
    </Container>
  );
}
