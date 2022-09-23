import { renderHook } from "@testing-library/react";
import { Coordinate, GameState } from "../types/GameState";
import { Plant } from "../types/Plant";
import { useGameLogic } from "./useGameLogic";
describe("useGameLogic", () => {
  const { result } = renderHook(() => useGameLogic());

  describe("touchingCellsToCheck", () => {
    it("should return an array of the 4 surrounding coordinates", () => {
      const mockCoordinate: Coordinate = { XCord: 1, YCord: 1 };
      const mockCoordinateResult = [
        { XCord: 0, YCord: 1 },
        { XCord: 2, YCord: 1 },
        { XCord: 1, YCord: 0 },
        { XCord: 1, YCord: 2 },
      ];
      expect(result.current.touchingCellsToCheck(mockCoordinate)).toStrictEqual(
        mockCoordinateResult
      );
    });

    it("should return  an array of the 2 surrounding coordinates for (0,0)", () => {
      const mockCoordinate: Coordinate = { XCord: 0, YCord: 0 };
      const mockCoordinateResult = [
        { XCord: 1, YCord: 0 },
        { XCord: 0, YCord: 1 },
      ];
      expect(result.current.touchingCellsToCheck(mockCoordinate)).toStrictEqual(
        mockCoordinateResult
      );
    });

    it("should return  an array of the 2 surrounding coordinates for (0,7)", () => {
      const mockCoordinate: Coordinate = { XCord: 0, YCord: 7 };
      const mockCoordinateResult = [
        { XCord: 1, YCord: 7 },
        { XCord: 0, YCord: 6 },
      ];
      expect(result.current.touchingCellsToCheck(mockCoordinate)).toStrictEqual(
        mockCoordinateResult
      );
    });

    it("should return  an array of the 2 surrounding coordinates for (7,0)", () => {
      const mockCoordinate: Coordinate = { XCord: 7, YCord: 0 };
      const mockCoordinateResult = [
        { XCord: 6, YCord: 0 },
        { XCord: 7, YCord: 1 },
      ];
      expect(result.current.touchingCellsToCheck(mockCoordinate)).toStrictEqual(
        mockCoordinateResult
      );
    });

    it("should return  an array of the 2 surrounding coordinates for (7,7)", () => {
      const mockCoordinate: Coordinate = { XCord: 7, YCord: 7 };
      const mockCoordinateResult = [
        { XCord: 6, YCord: 7 },
        { XCord: 7, YCord: 6 },
      ];
      expect(result.current.touchingCellsToCheck(mockCoordinate)).toStrictEqual(
        mockCoordinateResult
      );
    });
  });

  describe("mapCoordinateToBoardCell", () => {
    it("should map a coordinate to the correct result and either return an empty state or a plant", () => {
      const mockEmptyCoordinate: Coordinate = { XCord: 0, YCord: 0 };
      const mockPlantCoordinate: Coordinate = { XCord: 1, YCord: 1 };
      const mockPlant: Plant = {
        name: "watermelon",
        beingSwapped: false,
        pointsPerDig: 3,
        minimumToDig: 5,
      };
      const mockBoard: GameState["board"] = [
        [
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
        ],
        [
          "empty",
          mockPlant,
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
        ],
        [
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
        ],
        [
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
        ],
        [
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
        ],
        [
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
        ],
        [
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
        ],
        [
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
        ],
      ];
      expect(
        result.current.mapCoordinateToBoardCell(mockEmptyCoordinate, mockBoard)
      ).toStrictEqual("empty");
      expect(
        result.current.mapCoordinateToBoardCell(mockPlantCoordinate, mockBoard)
      ).toStrictEqual(mockPlant);
    });
  });

  describe("matchingPlantsTouching", () => {
    it("should return empty if the first coordinate is empty", () => {
      const mockEmptyCoordinate = { XCord: 0, YCord: 0 };
      const mockBoard: GameState["board"] = [
        [
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
        ],
        [
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
        ],
        [
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
        ],
        [
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
        ],
        [
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
        ],
        [
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
        ],
        [
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
        ],
        [
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
        ],
      ];
      expect(
        result.current.matchingPlantsTouching(mockBoard, mockEmptyCoordinate)
      ).toStrictEqual("empty");
    });

    it("should return the starting coordinate if a plant is found but none are touching", () => {
      // Surround with all empty
      // Surround with one layer of empty and then a layer of potential plants
      const mockStartingCoordinate = { XCord: 1, YCord: 1 };
      const mockPlant: Plant = {
        name: "watermelon",
        beingSwapped: false,
        pointsPerDig: 3,
        minimumToDig: 5,
      };
      const mockBoardOne: GameState["board"] = [
        [
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
        ],
        [
          "empty",
          mockPlant,
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
        ],
        [
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
        ],
        [
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
        ],
        [
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
        ],
        [
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
        ],
        [
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
        ],
        [
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
        ],
      ];
      const mockBoardTwo: GameState["board"] = [
        [
          mockPlant,
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
        ],
        [
          "empty",
          mockPlant,
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
        ],
        [
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
        ],
        [
          "empty",
          "empty",
          "empty",
          "empty",
          mockPlant,
          "empty",
          "empty",
          "empty",
        ],
        [
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
        ],
        [
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
        ],
        [
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          mockPlant,
          "empty",
        ],
        [
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
        ],
      ];
      const touchingCoordinatesResult = [{ XCord: 1, YCord: 1 }];
      expect(
        result.current.matchingPlantsTouching(
          mockBoardOne,
          mockStartingCoordinate
        )
      ).toStrictEqual(touchingCoordinatesResult);
      expect(
        result.current.matchingPlantsTouching(
          mockBoardTwo,
          mockStartingCoordinate
        )
      ).toStrictEqual(touchingCoordinatesResult);
    });

    it("should return 3 matching coordinates if 2 matching plants found", () => {
      const mockStartingCoordinate = { XCord: 1, YCord: 1 };
      const mockPlant: Plant = {
        name: "watermelon",
        beingSwapped: false,
        pointsPerDig: 3,
        minimumToDig: 5,
      };
      const mockPlantTwo: Plant = {
        name: "flower",
        beingSwapped: false,
        pointsPerDig: 0,
        minimumToDig: 5,
      };
      const mockBoard: GameState["board"] = [
        [
          mockPlantTwo,
          mockPlant,
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
        ],
        [
          mockPlantTwo,
          mockPlant,
          mockPlant,
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
        ],
        [
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
        ],
        [
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
        ],
        [
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
        ],
        [
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
        ],
        [
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
        ],
        [
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
        ],
      ];
      const expectedResult = [
        { XCord: 1, YCord: 1 },
        { XCord: 2, YCord: 1 },
        { XCord: 1, YCord: 0 },
      ];
      expect(
        result.current.matchingPlantsTouching(mockBoard, mockStartingCoordinate)
      ).toStrictEqual(expectedResult);
    });
    it("should return 8 when there is a chain of plants touching each other", () => {
      const mockStartingCoordinate = { XCord: 1, YCord: 1 };
      const mockPlant: Plant = {
        name: "watermelon",
        beingSwapped: false,
        pointsPerDig: 3,
        minimumToDig: 5,
      };
      const mockPlantTwo: Plant = {
        name: "flower",
        beingSwapped: false,
        pointsPerDig: 0,
        minimumToDig: 5,
      };
      const mockBoard: GameState["board"] = [
        [
          mockPlantTwo,
          mockPlant,
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
        ],
        [
          mockPlantTwo,
          mockPlant,
          mockPlant,
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
        ],
        [
          "empty",
          "empty",
          mockPlant,
          mockPlant,
          "empty",
          "empty",
          "empty",
          "empty",
        ],
        [
          "empty",
          "empty",
          mockPlant,
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
        ],
        [
          "empty",
          "empty",
          mockPlant,
          mockPlant,
          "empty",
          "empty",
          "empty",
          "empty",
        ],
        [
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
        ],
        [
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
        ],
        [
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
        ],
      ];
      const expectedResult = [
        { XCord: 1, YCord: 1 },
        { XCord: 2, YCord: 1 },
        { XCord: 1, YCord: 0 },
        { XCord: 2, YCord: 2 },
        { XCord: 3, YCord: 2 },
        { XCord: 2, YCord: 3 },
        { XCord: 2, YCord: 4 },
        { XCord: 3, YCord: 4 },
      ];
      expect(
        result.current.matchingPlantsTouching(mockBoard, mockStartingCoordinate)
      ).toStrictEqual(expectedResult);
    });
  });

  describe("canDigUp", () => {
    const mockPlant: Plant = {
      name: "watermelon",
      beingSwapped: false,
      pointsPerDig: 3,
      minimumToDig: 5,
    };
    it("should return true if number of matching is greater than or equal to the minimum to dig", () => {
      expect(result.current.canDigUp(mockPlant.minimumToDig, 6)).toBeTruthy();
      expect(result.current.canDigUp(mockPlant.minimumToDig, 5)).toBeTruthy();
    });
    it("should return false if number of matching is less than the minimum to dig", () => {
      expect(result.current.canDigUp(mockPlant.minimumToDig, 3)).toBeFalsy();
    });
  });

  describe("calculateDigUpScore", () => {
    const mockPlant: Plant = {
      name: "watermelon",
      beingSwapped: false,
      pointsPerDig: 3,
      minimumToDig: 5,
    };
    it("should multiply the number of points per dig by the number dug up", () => {
      expect(
        result.current.calculateDigUpScore(mockPlant.pointsPerDig, 10)
      ).toBe(mockPlant.pointsPerDig * 10);
    });
  });

  describe("plantCrop", () => {
    it("should return a gameboard with the planted crop", () => {
      const mockPlant: Plant = {
        name: "watermelon",
        beingSwapped: false,
        pointsPerDig: 3,
        minimumToDig: 5,
      };
      const mockCoordinate = { XCord: 0, YCord: 0 };
      const mockBoard: GameState["board"] = [
        [
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
        ],
        [
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
        ],
        [
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
        ],
        [
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
        ],
        [
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
        ],
        [
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
        ],
        [
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
        ],
        [
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
        ],
      ];
      const mockResultBoard: GameState["board"] = [
        [
          mockPlant,
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
        ],
        [
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
        ],
        [
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
        ],
        [
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
        ],
        [
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
        ],
        [
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
        ],
        [
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
        ],
        [
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
          "empty",
        ],
      ];
      expect(
        result.current.plantCrop(mockBoard, mockPlant, mockCoordinate)
      ).toStrictEqual(mockResultBoard);
    });
  });

  describe("digUpPlants", () => {
    const mockPlant: Plant = {
      name: "watermelon",
      beingSwapped: false,
      pointsPerDig: 3,
      minimumToDig: 5,
    };
    const mockBoard: GameState["board"] = [
      ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
      [
        "empty",
        mockPlant,
        "empty",
        "empty",
        "empty",
        "empty",
        "empty",
        "empty",
      ],
      ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
      ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
      ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
      ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
      ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
      [
        "empty",
        "empty",
        "empty",
        "empty",
        "empty",
        "empty",
        "empty",
        mockPlant,
      ],
    ];
    const coordinatesToDig = [
      { XCord: 1, YCord: 1 },
      { XCord: 7, YCord: 7 },
    ];
    const expectedBoardResult: GameState["board"] = [
      ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
      ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
      ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
      ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
      ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
      ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
      ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
      ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
    ];
    it("should dig up all coordinates provided and replace with empty block on board", () => {
      expect(
        result.current.digUpPlants(mockBoard, coordinatesToDig)
      ).toStrictEqual(expectedBoardResult);
    });
  });

  describe("swapPlants", () => {
    const mockPlantOne: Plant = {
      name: "watermelon",
      beingSwapped: false,
      pointsPerDig: 3,
      minimumToDig: 5,
    };

    const mockPlantTwo: Plant = {
      name: "flower",
      beingSwapped: false,
      pointsPerDig: 3,
      minimumToDig: 5,
    };

    const mockEmptyCoordinate = { XCord: 0, YCord: 0 };
    const mockCoordinateOne = { XCord: 1, YCord: 1 };
    const mockCoordinateTwo = { XCord: 2, YCord: 2 };
    const mockCoordinateMatchOne = { XCord: 1, YCord: 2 };
    const mockBoard: GameState["board"] = [
      ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
      [
        "empty",
        mockPlantOne,
        "empty",
        "empty",
        "empty",
        "empty",
        "empty",
        "empty",
      ],
      [
        "empty",
        mockPlantOne,
        mockPlantTwo,
        "empty",
        "empty",
        "empty",
        "empty",
        "empty",
      ],
      ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
      ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
      ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
      ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
      ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
    ];
    const mockResultBoard: GameState["board"] = [
      ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
      [
        "empty",
        mockPlantTwo,
        "empty",
        "empty",
        "empty",
        "empty",
        "empty",
        "empty",
      ],
      [
        "empty",
        mockPlantOne,
        mockPlantOne,
        "empty",
        "empty",
        "empty",
        "empty",
        "empty",
      ],
      ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
      ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
      ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
      ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
      ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
    ];

    it("should return false if either of the coordinate passed are empty", () => {
      expect(
        result.current.swapPlants(
          mockBoard,
          mockEmptyCoordinate,
          mockCoordinateTwo
        )
      ).toBeFalsy();
      expect(
        result.current.swapPlants(
          mockBoard,
          mockCoordinateOne,
          mockEmptyCoordinate
        )
      ).toBeFalsy();
    });

    it("should return false if the two coordinates passed match plants", () => {
      expect(
        result.current.swapPlants(
          mockBoard,
          mockCoordinateOne,
          mockCoordinateMatchOne
        )
      ).toBeFalsy();
    });

    it("should successfully swap two different plants", () => {
      expect(
        result.current.swapPlants(
          mockBoard,
          mockCoordinateOne,
          mockCoordinateTwo
        )
      ).toStrictEqual(mockResultBoard);
    });
  });
});
