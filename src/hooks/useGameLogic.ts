import { Cell, Coordinate, GameState } from "../types/GameState";
import { Plant } from "../types/Plant";

export const useGameLogic = () => {
  const touchingCellsToCheck = (coordinate: Coordinate): Coordinate[] => {
    const arrayOfCoordinates = [
      { XCord: coordinate.XCord - 1, YCord: coordinate.YCord },
      { XCord: coordinate.XCord + 1, YCord: coordinate.YCord },
      { XCord: coordinate.XCord, YCord: coordinate.YCord - 1 },
      { XCord: coordinate.XCord, YCord: coordinate.YCord + 1 },
    ];

    // Filter out coordinates not in grid
    const validCordinates = arrayOfCoordinates.filter((c) => {
      return c.XCord >= 0 && c.XCord < 8 && c.YCord >= 0 && c.YCord < 8;
    });
    return validCordinates;
  };

  const mapCoordinateToBoardCell = (
    coordinate: Coordinate,
    gameboard: GameState["board"]
  ) => {
    return gameboard[coordinate.YCord][coordinate.XCord];
  };

  const coordinatesToTouchingCoordinates = (coordinates: Coordinate[]) => {
    const newArray = coordinates.flatMap((coordinate) =>
      touchingCellsToCheck(coordinate)
    );
    return newArray;
  };

  const removeCheckedCoordinates = (
    coordinates: Coordinate[],
    checkedCoordinates: Coordinate[]
  ) => {
    const newArray = coordinates.filter(
      (coordinate) =>
        !checkedCoordinates.find((checkedCoordinate) => {
          return (
            checkedCoordinate.XCord === coordinate.XCord &&
            checkedCoordinate.YCord === coordinate.YCord
          );
        })
    );
    return newArray;
  };

  const removeDuplicateCoordinates = (coordinates: Coordinate[]) => {
    let noDuplicates: Coordinate[] = [];

    coordinates.forEach((element) => {
      if (!noDuplicates.includes(element)) {
        noDuplicates.push(element);
      }
    });
    return noDuplicates;
  };

  const matchingPlantsTouching = (
    gameboard: GameState["board"],
    startingCoordinate: Coordinate
  ) => {
    if (mapCoordinateToBoardCell(startingCoordinate, gameboard) === "empty")
      return "empty";
    const plantToMatch = (
      mapCoordinateToBoardCell(startingCoordinate, gameboard) as Plant
    ).name;
    let matchingCoordinates = [startingCoordinate];
    let touchingCoordinates = touchingCellsToCheck(startingCoordinate);
    let checkedCoordinates = [startingCoordinate];
    while (touchingCoordinates.length !== 0) {
      let coordinatesToCheck = [];
      for (let i = 0; i < touchingCoordinates.length; i++) {
        checkedCoordinates.push(touchingCoordinates[i]);
        if (
          (mapCoordinateToBoardCell(touchingCoordinates[i], gameboard) as Plant)
            .name === plantToMatch
        ) {
          matchingCoordinates.push(touchingCoordinates[i]);
          coordinatesToCheck.push(touchingCoordinates[i]);
        }
      }
      if (coordinatesToCheck.length !== 0) {
        const newTouchingCoordinates =
          coordinatesToTouchingCoordinates(coordinatesToCheck);
        const removedCheckedCoordinates = removeCheckedCoordinates(
          newTouchingCoordinates,
          checkedCoordinates
        );
        const removedDuplicateCoordinates = removeDuplicateCoordinates(
          removedCheckedCoordinates
        );
        touchingCoordinates = removedDuplicateCoordinates;
      } else {
        touchingCoordinates = [];
      }
    }
    return matchingCoordinates;
  };

  const canDigUp = (minimumToDig: number, numberOfDigUp: number) => {
    return numberOfDigUp >= minimumToDig;
  };

  const calculateDigUpScore = (pointsPerDig: number, numberOfDigUp: number) => {
    return pointsPerDig * numberOfDigUp;
  };

  const plantCrop = (
    gameboard: GameState["board"],
    plant: Plant,
    coordinate: Coordinate
  ) => {
    // Changing Cell
    const rowToChange = gameboard[coordinate.YCord];
    const rowFirstPart = rowToChange.slice(0, coordinate.XCord);
    const rowEndPart = rowToChange.slice(coordinate.XCord + 1);
    const newRow = [...rowFirstPart, plant, ...rowEndPart];

    // Replacing Row
    const boardFirstPart = gameboard.slice(0, coordinate.YCord);
    const boardEndPart = gameboard.slice(coordinate.YCord + 1);
    const newGameboard = [...boardFirstPart, newRow, ...boardEndPart];
    return newGameboard;
  };

  const digupPlant = (
    gameboard: GameState["board"],
    coordinate: Coordinate
  ) => {
    // Changing Cell
    const rowToChange = gameboard[coordinate.YCord];
    const rowFirstPart = rowToChange.slice(0, coordinate.XCord);
    const rowEndPart = rowToChange.slice(coordinate.XCord + 1);
    const newRow = [...rowFirstPart, "empty" as Cell, ...rowEndPart];

    // Replacing Row
    const boardFirstPart = gameboard.slice(0, coordinate.YCord);
    const boardEndPart = gameboard.slice(coordinate.YCord + 1);
    const newGameboard = [...boardFirstPart, newRow, ...boardEndPart];
    return newGameboard;
  };

  const digUpPlants = (
    gameboard: GameState["board"],
    plantedCoordinatesToDig: Coordinate[]
  ) => {
    let newgameBoard = gameboard;
    plantedCoordinatesToDig.forEach((coordinate) => {
      newgameBoard = digupPlant(newgameBoard, coordinate);
    });
    return newgameBoard;
  };

  const swapPlants = (
    gameboard: GameState["board"],
    firstCoordinate: Coordinate,
    secondCoordinate: Coordinate
  ) => {
    const plantAtFirstCoordinate = mapCoordinateToBoardCell(
      firstCoordinate,
      gameboard
    );
    const plantAtSecondCoordinate = mapCoordinateToBoardCell(
      secondCoordinate,
      gameboard
    );
    if (
      plantAtFirstCoordinate === "empty" ||
      plantAtSecondCoordinate === "empty" ||
      plantAtFirstCoordinate.name === plantAtSecondCoordinate.name
    )
      return false;
    const newgameboard = gameboard;
    const newPlantAtFirstCoordinate = {
      ...(plantAtSecondCoordinate as Plant),
      beingSwapped: false,
    };
    const newPlantAtSecondCoordinate = {
      ...(plantAtFirstCoordinate as Plant),
      beingSwapped: false,
    };

    const boardAfterFirstPlant = plantCrop(
      newgameboard,
      newPlantAtFirstCoordinate,
      firstCoordinate
    );
    const boardAfterSecondPlant = plantCrop(
      boardAfterFirstPlant,
      newPlantAtSecondCoordinate,
      secondCoordinate
    );
    return boardAfterSecondPlant;
  };

  return {
    touchingCellsToCheck,
    mapCoordinateToBoardCell,
    matchingPlantsTouching,
    canDigUp,
    calculateDigUpScore,
    digUpPlants,
    swapPlants,
    plantCrop,
  };
};

export const screenHeight = innerHeight;
export const screenWidth = innerWidth;
