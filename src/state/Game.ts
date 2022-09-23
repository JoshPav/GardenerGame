import { atom } from "recoil";
import { Coordinate, GameState, Highscore } from "../types/GameState";

export const initialGameState: GameState = {
  playerStats: {
    name: "",
    isGo: false,
    isSwapTool: false,
    numberofTurns: 0,
    prevMove: "",
    score: 0,
  },
  board: [
    ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
    ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
    ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
    ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
    ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
    ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
    ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
    ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
  ],
};

export const GameSetup = atom({
  key: "gameboard",
  default: initialGameState,
});

export const GameStarted = atom({
  key: "gameStarted",
  default: false,
});

export const GameEnded = atom({
  key: "gameEnded",
  default: false,
});

type PlantToSwap = null | Coordinate;
export const PlantToSwap = atom<PlantToSwap>({
  key: "plantToSwap",
  default: null,
});

export const SavedGames = atom({
  key: "savedGames",
  default: [] as GameState[],
});

export const SavedHighScores = atom({
  key: "savedHighscores",
  default: [] as Highscore[],
});

export const PlantsLeaving = atom({
  key: "plantsLeaving",
  default: [] as Coordinate[],
});

export const IsLandscape = atom<Boolean | undefined>({
  key: "isLandscape",
  default: undefined,
});
