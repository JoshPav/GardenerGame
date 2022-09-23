import React from "react";
import { useRecoilState } from "recoil";
import styled, { css } from "styled-components";
import { GameSetup } from "../state/Game";

type Props = {};

const GameMenuContainer = styled.div`
  display: flex;
  padding: 2%;
`;

type ToolProps = {
  isSelected: boolean;
};

const SwapToolContainer = styled.div(({ isSelected }: ToolProps) => {
  return css`
    ${isSelected ? "margin-bottom: 5vh;" : "margin-top: 5vh;"}
    display: flex;
    height: 20vh;
    background-color: green;
  `;
});

const DigToolContainer = styled.div(({ isSelected }: ToolProps) => {
  return css`
    ${isSelected ? "margin-bottom: 5vh;" : "margin-top: 5vh;"}
    display: flex;
  `;
});

const RightSide = (props: Props) => {
  const [gameSetup, updateGameSetup] = useRecoilState(GameSetup);
  const setIsSwapTool = (bool: boolean) => {
    updateGameSetup((prevState) => ({
      ...prevState,
      playerStats: {
        ...prevState.playerStats,
        isSwapTool: bool,
      },
    }));
  };
  return (
    <GameMenuContainer>
      <SwapToolContainer
        isSelected={gameSetup.playerStats.isSwapTool}
        onClick={() => setIsSwapTool(true)}
      >
        Swap Tool
      </SwapToolContainer>
      <DigToolContainer
        isSelected={!gameSetup.playerStats.isSwapTool}
        onClick={() => setIsSwapTool(false)}
      >
        Dig Tool
      </DigToolContainer>
    </GameMenuContainer>
  );
};

export default RightSide;
