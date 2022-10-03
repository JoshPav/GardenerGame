import React, { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { GameEnded, GameSetup, GameStarted } from "../state/Game";
import { useSpawnLogic } from "../hooks/useSpawnLogic";
import { plantables } from "../components/plantables/plantables";
import { useGameLogic } from "../hooks/useGameLogic";
import Gameboard from "../components/gameboard/Gameboard";
import Button from "@mui/material/Button";
import styled from "styled-components";
import { GameState } from "../types/GameState";

const spawnPlants = (
  quantity: number,
  board: GameState["board"],
  setGameOver: (bool: boolean) => void
) => {
  const { spawnPlantRandomly, getRandomNumber, getEmptyCellCoordinates } =
    useSpawnLogic();
  let tempBoard = board;
  for (let i = 0; i < quantity; i++) {
    const randomNumber = getRandomNumber(0, plantables.length);
    console.log("random number: ", randomNumber);
    const randomPlant = plantables[randomNumber];
    console.log("randomPlant: ", randomPlant);
    const emptyCoordinates = getEmptyCellCoordinates(tempBoard);
    console.log("empty coordinates: ", emptyCoordinates);
    if (emptyCoordinates.length === 0) {
      console.log("Game over");
      setGameOver(true);
      break;
    }
    const newGameboard = spawnPlantRandomly(
      tempBoard,
      emptyCoordinates,
      randomPlant
    );
    tempBoard = newGameboard;
  }
  return tempBoard;
};

const Gardener = () => {
  const [gameSetup, updateGameSetup] = useRecoilState(GameSetup);
  const toggleGameOver = useSetRecoilState(GameEnded);
  const toggleGameActive = useSetRecoilState(GameStarted);

  const setGameOver = (bool: boolean) => {
    toggleGameOver(bool);
    toggleGameActive(!bool);
  };
  // Computers Go
  // Spawn Initial 10 plants
  if (
    gameSetup.playerStats.numberofTurns === 0 &&
    !gameSetup.playerStats.isGo
  ) {
    const newBoard = spawnPlants(10, gameSetup.board, setGameOver);
    setTimeout(() => {
      updateGameSetup((prevState) => ({
        ...prevState,
        board: newBoard,
        playerStats: {
          ...prevState.playerStats,
          isGo: true,
        },
      }));
    }, 500);
  }
  // Spawn 6 or 3 plants
  if (!gameSetup.playerStats.isGo && !(gameSetup.playerStats.prevMove === "")) {
    if (gameSetup.playerStats.prevMove === "dug") {
      const newBoard = spawnPlants(3, gameSetup.board, setGameOver);
      setTimeout(() => {
        updateGameSetup((prevState) => ({
          ...prevState,
          board: newBoard,
          playerStats: {
            ...prevState.playerStats,
            isGo: true,
          },
        }));
      }, 500);
    }
    if (gameSetup.playerStats.prevMove === "swapped") {
      const newBoard = spawnPlants(6, gameSetup.board, setGameOver);
      setTimeout(() => {
        updateGameSetup((prevState) => ({
          ...prevState,
          board: newBoard,
          playerStats: {
            ...prevState.playerStats,
            isGo: true,
          },
        }));
      }, 500);
    }
  }

  console.log("Game Setup Updated: ", gameSetup);

  return <Gameboard />;
};

export default Gardener;
