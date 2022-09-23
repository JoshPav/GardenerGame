import { Plant } from "./Plant";
export type Coordinate = {
  XCord: number;
  YCord: number;
};
export type Cell = Plant | "empty";

export type Row = Cell[];

export type PlayerStats = {
  name: string;
  score: number;
  isGo: boolean;
  isSwapTool: boolean;
  prevMove: "" | "dug" | "swapped";
  numberofTurns: number;
};

export type GameState = {
  playerStats: PlayerStats;
  board: Row[];
};

export type Highscore = {
  name: string;
  score: number;
  timeStamp: Date;
};
