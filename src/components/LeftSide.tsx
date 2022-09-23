import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import React from "react";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { GameSetup, GameStarted } from "../state/Game";

type Props = {
  onNewGameClick: () => void;
  onSaveGameClick: () => void;
  onLoadGameClick: () => void;
};
const StyledButton = styled(Button)`
  margin-bottom: 5% !important;
  background-color: #ffa800 !important;
  color: #0f0a00 !important;

  &:hover {
    background-color: #ab7203 !important;
    color: #ffffff !important;
  }
`;

const StatsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 10vh;
  font-size: 18px;
`;

const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 1% 2%;
  margin-right: 2%;
  background-color: #ffde9e !important;
`;

const LeftSide = ({
  onLoadGameClick,
  onNewGameClick,
  onSaveGameClick,
}: Props) => {
  const setIsGameActive = useSetRecoilState(GameStarted);
  const gameSetup = useRecoilValue(GameSetup);
  const onMainMenuClick = () => {
    setIsGameActive(false);
  };
  return (
    <StyledCard>
      <StatsContainer>
        <div>{gameSetup.playerStats.name}</div>
        <div>Score: {gameSetup.playerStats.score}</div>
      </StatsContainer>
      <StyledButton onClick={onNewGameClick}>New Game</StyledButton>
      <StyledButton onClick={onSaveGameClick}>Save Game</StyledButton>
      <StyledButton onClick={onLoadGameClick}>Load Game</StyledButton>
      <StyledButton onClick={onMainMenuClick}>Main Menu</StyledButton>
    </StyledCard>
  );
};

export default LeftSide;
