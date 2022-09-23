import { renderHook } from "@testing-library/react";
import { Coordinate, GameState } from "../types/GameState";
import { Plant } from "../types/Plant";
import { useSpawnLogic } from "./useSpawnLogic";

describe("useSpawnLogic", () => {
  const { result } = renderHook(() => useSpawnLogic());
  describe("getSpawnCount", () => {
    it("should return 6 if playerHasSwapped is set to true", () => {
      expect(result.current.getSpawnCount(true)).toBe(6);
    });

    it("should return  if playerHasSwapped is set to true", () => {
      expect(result.current.getSpawnCount(false)).toBe(3);
    });
  });

  describe("getRandomNumber", () => {
    it("should return a random number between the given range", () => {
      const mockMinimum = 0;
      const mockMaximum = 10;
      const randomNumber = result.current.getRandomNumber(
        mockMinimum,
        mockMaximum
      );
      expect(randomNumber).toBeGreaterThanOrEqual(mockMinimum);
      expect(randomNumber).toBeLessThanOrEqual(mockMaximum);
    });
  });

  describe("getEmptyCellCoordinates", () => {
    const mockPlant: Plant = {
      name: "watermelon",
      beingSwapped: false,
      pointsPerDig: 3,
      minimumToDig: 5,
    };
    const mockBoard: GameState["board"] = [
      [
        mockPlant,
        mockPlant,
        mockPlant,
        mockPlant,
        mockPlant,
        mockPlant,
        mockPlant,
        mockPlant,
      ],
      [
        mockPlant,
        mockPlant,
        mockPlant,
        mockPlant,
        mockPlant,
        mockPlant,
        mockPlant,
        mockPlant,
      ],
      [
        mockPlant,
        "empty",
        mockPlant,
        mockPlant,
        mockPlant,
        mockPlant,
        mockPlant,
        mockPlant,
      ],
      [
        mockPlant,
        mockPlant,
        mockPlant,
        mockPlant,
        mockPlant,
        mockPlant,
        mockPlant,
        mockPlant,
      ],
      [
        mockPlant,
        mockPlant,
        mockPlant,
        mockPlant,
        mockPlant,
        mockPlant,
        mockPlant,
        mockPlant,
      ],
      [
        mockPlant,
        mockPlant,
        mockPlant,
        mockPlant,
        mockPlant,
        mockPlant,
        mockPlant,
        mockPlant,
      ],
      [
        mockPlant,
        mockPlant,
        mockPlant,
        mockPlant,
        mockPlant,
        mockPlant,
        mockPlant,
        mockPlant,
      ],
      [
        mockPlant,
        mockPlant,
        mockPlant,
        mockPlant,
        mockPlant,
        mockPlant,
        mockPlant,
        mockPlant,
      ],
    ];
    const mockBoardResult = [{ XCord: 1, YCord: 2 }];
    const mockFullBoard: GameState["board"] = [
      [
        mockPlant,
        mockPlant,
        mockPlant,
        mockPlant,
        mockPlant,
        mockPlant,
        mockPlant,
        mockPlant,
      ],
      [
        mockPlant,
        mockPlant,
        mockPlant,
        mockPlant,
        mockPlant,
        mockPlant,
        mockPlant,
        mockPlant,
      ],
      [
        mockPlant,
        mockPlant,
        mockPlant,
        mockPlant,
        mockPlant,
        mockPlant,
        mockPlant,
        mockPlant,
      ],
      [
        mockPlant,
        mockPlant,
        mockPlant,
        mockPlant,
        mockPlant,
        mockPlant,
        mockPlant,
        mockPlant,
      ],
      [
        mockPlant,
        mockPlant,
        mockPlant,
        mockPlant,
        mockPlant,
        mockPlant,
        mockPlant,
        mockPlant,
      ],
      [
        mockPlant,
        mockPlant,
        mockPlant,
        mockPlant,
        mockPlant,
        mockPlant,
        mockPlant,
        mockPlant,
      ],
      [
        mockPlant,
        mockPlant,
        mockPlant,
        mockPlant,
        mockPlant,
        mockPlant,
        mockPlant,
        mockPlant,
      ],
      [
        mockPlant,
        mockPlant,
        mockPlant,
        mockPlant,
        mockPlant,
        mockPlant,
        mockPlant,
        mockPlant,
      ],
    ];
    it("should return all coordinates which are empty in the gameboard", () => {
      expect(result.current.getEmptyCellCoordinates(mockBoard)).toStrictEqual(
        mockBoardResult
      );
    });
    it("should return an empty array if the board is full", () => {
      expect(
        result.current.getEmptyCellCoordinates(mockFullBoard)
      ).toStrictEqual([]);
    });
  });

  describe("spawnPlantRandomly", () => {
    const mockPlant: Plant = {
      name: "watermelon",
      beingSwapped: false,
      pointsPerDig: 3,
      minimumToDig: 5,
    };

    const mockBoard: GameState["board"] = [
      ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
      ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
      ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
      ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
      ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
      ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
      ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
      ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
    ];

    const mockEmptyCoordinates = [
      { XCord: 1, YCord: 1 },
      { XCord: 0, YCord: 0 },
    ];
    it("should spawn a plant at a random coordinate", () => {
      const resultBoard = result.current.spawnPlantRandomly(
        mockBoard,
        mockEmptyCoordinates,
        mockPlant
      );
      let coordinateFound = false;
      let foundCoordinate = {} as Coordinate;
      resultBoard.forEach((row, yCord) =>
        row.forEach((cell, xCord) => {
          if (cell === mockPlant) {
            coordinateFound = true;
            foundCoordinate = { XCord: xCord, YCord: yCord };
          }
        })
      );
      expect(coordinateFound).toBeTruthy();
      expect(mockEmptyCoordinates.includes(foundCoordinate)).toBeTruthy;
    });
  });
});
