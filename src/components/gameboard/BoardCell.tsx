import React from "react";
import "animate.css";
import styled, { css } from "styled-components";
import { Cell, Coordinate } from "../../types/GameState";
import { Plant } from "../../types/Plant";
import { screenHeight, useGameLogic } from "../../hooks/useGameLogic";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { GameSetup, HasError, PlantToSwap } from "../../state/Game";
import Aubergine from "../plantables/Aubergine";
import Flower from "../plantables/Flower";
import Pumpkin from "../plantables/Pumpkin";
import Tomato from "../plantables/Tomato";
import Watermelon from "../plantables/Watermelon";
import yellowPatch from "../../assets/yellow_patch.png";
import beigePatch from "../../assets/beige_patch.png";

const CellContainer = styled.div`
  display: flex;
  width: ${screenHeight / 8}px;
  background-image: url("src/assets/soilpatch.png");
  background-size: contain;
  align-items: flex-end;
  justify-content: center;
`;

type PlantCellProps = {
  selected: boolean;
};

type PlantGraphicProps = {
  plant: Plant;
};
const PlantGraphic = ({ plant }: PlantGraphicProps) => {
  if (plant.name === "aubergine") return <Aubergine />;
  if (plant.name === "flower") return <Flower />;
  if (plant.name === "pumpkin") return <Pumpkin />;
  if (plant.name === "tomato") return <Tomato />;
  return <Watermelon />;
};

const PlantCellContainer = styled.div`
  display: flex;
  width: ${screenHeight / 8}px;
  background-image: url("src/assets/soilpatch.png");
  background-size: contain;
  align-items: center;
  justify-content: center;
`;

const PlantGraphicContainer = styled.div(({ selected }: PlantCellProps) => {
  return css`
    display: flex;
    justify-content: center;
    align-items: center;
    animation: jackInTheBox;
    animation-duration: 1.5s;
    animation-iteration-count: 1;
    ${selected
      ? `animation: jackInTheBox, heartBeat;
  animation-duration: 1.5s, 2s;
  animation-iteration-count: 1, infinite;`
      : null}
  `;
});

type Props = {
  cell: Cell;
  coordinate: Coordinate;
};

type EmptyCellProps = {
  coordinate: Coordinate;
};

const EmptyCell = ({ coordinate }: EmptyCellProps) => {
  return (
    <CellContainer>
      <img
        src={coordinate.YCord % 2 == 0 ? yellowPatch : beigePatch}
        width={"70%"}
        height={"auto"}
        style={{ marginBottom: "10%" }}
      />
    </CellContainer>
  );
};

type PlantedCellProps = {
  plant: Plant;
  coordinate: Coordinate;
};

const PlantedCell = ({ plant, coordinate }: PlantedCellProps) => {
  const [gameSetup, setGameSetup] = useRecoilState(GameSetup);
  const [plantToSwap, setPlantToSwap] = useRecoilState(PlantToSwap);
  const setHasError = useSetRecoilState(HasError);
  const {
    plantCrop,
    mapCoordinateToBoardCell,
    swapPlants,
    matchingPlantsTouching,
    canDigUp,
    digUpPlants,
    calculateDigUpScore,
  } = useGameLogic();

  const setPlantIsSwapping = (bool: boolean, co: Coordinate) => {
    const newPlant: Plant = { ...plant, beingSwapped: bool };
    const newGameboard = plantCrop(gameSetup.board, newPlant, co);
    setGameSetup((prevState) => ({
      ...prevState,
      board: newGameboard,
    }));
  };

  const onPlantDig = () => {
    // Check is Valid Dig
    const touchingPlantCoordinates = matchingPlantsTouching(
      gameSetup.board,
      coordinate
    );
    const canDig = canDigUp(
      plant.minimumToDig,
      touchingPlantCoordinates.length
    );
    if (canDig) {
      const boardAfterDig = digUpPlants(
        gameSetup.board,
        touchingPlantCoordinates as Coordinate[]
      );
      const newScore =
        gameSetup.playerStats.score +
        calculateDigUpScore(
          plant.pointsPerDig,
          touchingPlantCoordinates.length
        );
      const numberOfTurns = gameSetup.playerStats.numberofTurns + 1;
      setGameSetup((prevState) => ({
        ...prevState,
        board: boardAfterDig,
        playerStats: {
          ...prevState.playerStats,
          isGo: false,
          numberofTurns: numberOfTurns,
          prevMove: "dug",
          score: newScore,
        },
      }));
    } else {
      setHasError({ show: true, message: "Error: Not enough to dig" });
      setTimeout(() => {
        setHasError({ show: false, message: "" });
      }, 3000);
    }
  };

  let plantSwapCoordinateMatched = false;
  const onPlantSwap = () => {
    let plantTypeMatched = false;
    if (plantToSwap !== null) {
      const plantAtSwapCell = mapCoordinateToBoardCell(
        plantToSwap,
        gameSetup.board
      );
      plantSwapCoordinateMatched =
        plantToSwap.XCord === coordinate.XCord &&
        plantToSwap.YCord === coordinate.YCord;
      if (plantAtSwapCell !== "empty") {
        plantTypeMatched = plantAtSwapCell.name === plant.name;
      }
      plantSwapCoordinateMatched = plantSwapCoordinateMatched;
    }
    // If Plants to Swap is Empty
    if (plantToSwap === null) {
      setPlantToSwap(coordinate);
      setPlantIsSwapping(true, coordinate);
    }
    // If Plants to Swap already includes the plant at coordinate
    if (plantSwapCoordinateMatched) {
      setPlantToSwap(null);
      setPlantIsSwapping(false, coordinate);
    }
    if (plantTypeMatched && !plantSwapCoordinateMatched) {
      setHasError({
        show: true,
        message: "Error: Cannot Dig Same Type of Plant",
      });
      setTimeout(() => {
        setHasError({ show: false, message: "" });
      }, 3000);
    }
    // If plants to swap has one in there
    if (plantToSwap !== null && !plantTypeMatched) {
      const newGameboard = swapPlants(gameSetup.board, plantToSwap, coordinate);
      if (newGameboard !== false) {
        const numberOfTurns = gameSetup.playerStats.numberofTurns + 1;
        setGameSetup((prevState) => ({
          ...prevState,
          board: newGameboard,
          playerStats: {
            ...prevState.playerStats,
            isGo: false,
            prevMove: "swapped",
            numberofTurns: numberOfTurns,
          },
        }));
        setPlantToSwap(null);
      }
    }
  };

  const onPlantClick = () => {
    if (gameSetup.playerStats.isGo && gameSetup.playerStats.isSwapTool) {
      onPlantSwap();
    }
    if (gameSetup.playerStats.isGo && !gameSetup.playerStats.isSwapTool) {
      onPlantDig();
    }
  };
  return (
    <PlantCellContainer onClick={onPlantClick}>
      <PlantGraphicContainer selected={plant.beingSwapped}>
        <PlantGraphic plant={plant} />
      </PlantGraphicContainer>
    </PlantCellContainer>
  );
};

const BoardCell = ({ coordinate }: Props) => {
  const cell =
    useRecoilValue(GameSetup).board[coordinate.YCord][coordinate.XCord];
  if ((cell as Cell) === "empty") {
    return <EmptyCell coordinate={coordinate} />;
  }
  return <PlantedCell plant={cell as Plant} coordinate={coordinate} />;
};

export { BoardCell };
