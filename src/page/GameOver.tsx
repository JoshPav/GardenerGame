import React from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import Button from "@mui/material/Button";
import { GameSetup } from "../state/Game";
import GameOverPNG from "../assets/game_over.png";

type Props = {
  onNewGameClick: () => void;
  onMainMenuClick: () => void;
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

const BackgroundContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: center;
  justify-content: center;
  height: 95%;
  width: 95%;
  background-image: url(${GameOverPNG});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const StyledButton = styled(Button)`
  width: 20%;
  background-color: #ffa800 !important;
  color: #0f0a00 !important;

  &:hover {
    background-color: #ab7203 !important;
    color: #ffffff !important;
  }
`;

const Text = styled.p`
  font-family: fantasy;
  font-size: 26px;
  margin: 0;
`;

const GameOver = (props: Props) => {
  const playerStats = useRecoilValue(GameSetup).playerStats;
  return (
    <Container>
      <BackgroundContainer>
        <div style={{ paddingBottom: "5%" }}></div>
        <Text>{playerStats.name}Name</Text>
        <Text>Score: {playerStats.score}</Text>
        <StyledButton
          size="large"
          variant="contained"
          onClick={props.onNewGameClick}
        >
          New Game
        </StyledButton>
        <StyledButton onClick={props.onMainMenuClick}>Main Menu</StyledButton>
      </BackgroundContainer>
    </Container>
  );
};

export default GameOver;
