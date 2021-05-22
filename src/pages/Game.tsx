import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Alert, Button, Card, Modal, Select } from "antd";
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

const { Option } = Select;

interface GameProps {
  game: string;
  character: string;
}

export default function Game() {
  const { game, character } = useParams<GameProps>();
  const [gameState, setGameState] = useState<GameState | undefined>(undefined);
  const [modalVisible, setModalVisible] = useState(false);
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

  function toggleModal() {
    setModalVisible((visible) => !visible);
  }

  function handleAccuseCharacter(character: Character | undefined): void {
    setAccusedCharacter(character);
  }

  function handleAccuseWeapon(weapon: Weapon | undefined): void {
    setAccusedWeapon(weapon);
  }

  function handleAccuseRoom(room: Room | undefined): void {
    setAccusedRoom(room);
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
            <Card style={{ width: "200px" }} title={getCardType(card)}>
              {card}
            </Card>
          ))}
      </div>
      <Button type="primary" onClick={toggleModal}>
        Submit Final Accusation
      </Button>
      <Modal
        title="Final Accusation"
        visible={modalVisible}
        onCancel={toggleModal}
        footer={[
          <Button key="back" danger onClick={toggleModal}>
            Exit
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleAccusation}
            disabled={
              accusedCharacter === undefined ||
              accusedWeapon === undefined ||
              accusedRoom === undefined ||
              accusationSuccess === false
            }
          >
            Accuse
          </Button>,
        ]}
      >
        {accusationSuccess === undefined ? (
          <>
            <h4>Murderer:</h4>
            <Select allowClear onChange={handleAccuseCharacter}>
              {CHARACTERS.map((character) => (
                <Option key={character} value={character}>
                  {character}
                </Option>
              ))}
            </Select>
            <h4>Murder weapon:</h4>
            <Select allowClear onChange={handleAccuseWeapon}>
              {WEAPONS.map((weapon) => (
                <Option key={weapon} value={weapon}>
                  {weapon}
                </Option>
              ))}
            </Select>
            <h4>Murder location</h4>
            <Select allowClear onChange={handleAccuseRoom}>
              {ROOMS.map((room) => (
                <Option key={room} value={room}>
                  {room}
                </Option>
              ))}
            </Select>
          </>
        ) : (
          <>
            <h3>Your Accusation:</h3>
            <h4>Murderer: {accusedCharacter}</h4>
            <h4>Murder Weapon: {accusedWeapon}</h4>
            <h4>Murder Location: {accusedRoom}</h4>
            <Alert
              type={accusationSuccess ? "success" : "error"}
              message={accusationSuccess ? "Correct!" : "Incorrect!"}
            />
          </>
        )}
      </Modal>
    </>
  );
}
