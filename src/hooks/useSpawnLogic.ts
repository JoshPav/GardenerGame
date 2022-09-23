import { Coordinate, GameState } from "../types/GameState";
import { Plant } from "../types/Plant";
import { useGameLogic } from "./useGameLogic";

export const useSpawnLogic = () => {
  const getSpawnCount = (playerHasSwapped: boolean) => {
    if (playerHasSwapped) return 6;
    return 3;
  };

  const getRandomNumber = (minimum: number, maximum: number) => {
    return Math.floor(Math.random() * maximum) + minimum;
  };
  const getEmptyCellCoordinates = (gameboard: GameState["board"]) => {
    const emptyCoordinates: Coordinate[] = [];
    gameboard.forEach((row, yCord) => {
      row.forEach((cell, xCord) => {
        if (cell === "empty") {
          emptyCoordinates.push({ XCord: xCord, YCord: yCord });
        }
      });
    });
    return emptyCoordinates;
  };

  const spawnPlantRandomly = (
    gameboard: GameState["board"],
    emptyCoordinates: Coordinate[],
    plant: Plant
  ) => {
    const { plantCrop } = useGameLogic();
    const randomCoordinate =
      emptyCoordinates[getRandomNumber(0, emptyCoordinates.length - 1)];
    console.log("random coordinate: ", randomCoordinate);
    const newGameboard = plantCrop(gameboard, plant, {
      XCord: randomCoordinate.XCord,
      YCord: randomCoordinate.YCord,
    });
    return newGameboard;
  };

  return {
    getSpawnCount,
    getEmptyCellCoordinates,
    getRandomNumber,
    spawnPlantRandomly,
  };
};
