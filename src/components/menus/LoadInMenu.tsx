import React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import styled from "styled-components";

const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  padding: auto 0;
  width: 30vh;
  height: 50vh;
  background-color: #ffde9e !important;
`;

const StyledButton = styled(Button)`
  width: 85%;
  height: 15%;
  background-color: #ffa800 !important;
  color: #0f0a00 !important;

  &:hover {
    background-color: #ab7203 !important;
    color: #ffffff !important;
  }
`;

type Props = {
  onNewGameClick: () => void;
  onLoadGameClick: () => void;
  onHighscoresClick: () => void;
  onExitGameClick: () => void;
};

const LoadInMenu = ({
  onExitGameClick,
  onHighscoresClick,
  onLoadGameClick,
  onNewGameClick,
}: Props) => {
  return (
    <StyledCard>
      <StyledButton size="large" variant="contained" onClick={onNewGameClick}>
        New Game
      </StyledButton>
      <StyledButton size="large" variant="contained" onClick={onLoadGameClick}>
        Load Game
      </StyledButton>
      <StyledButton
        size="large"
        variant="contained"
        onClick={onHighscoresClick}
      >
        Highscores
      </StyledButton>
      <StyledButton size="large" variant="contained" onClick={onExitGameClick}>
        Exit Game
      </StyledButton>
    </StyledCard>
  );
};

export default LoadInMenu;
