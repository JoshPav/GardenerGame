import React, { useState } from "react";
import Card from "@mui/material/Card";
import styled from "styled-components";
import { Button, IconButton, TextField } from "@mui/material";
import "animate.css";
import CancelIcon from "@mui/icons-material/Cancel";
import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";
import { GameSetup, initialGameState } from "../../state/Game";
type Props = {
  menuType: string;
  onCancelClick: () => void;
  onStartLoadGame: () => void;
  onStartNewGame: () => void;
};

const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100vh;
  height: 30vh;
  background-color: #ffde9e !important;
`;

const OverlayContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60%;
  width: 60%;
  position: fixed;
  z-index: 2;
`;

const BarContainer = styled.div`
  display: flex;
  margin: 5px;
  width: 98%;
  justify-content: space-between;
  align-items: center;
`;

const Slot = styled.div`
  width: 40px;
`;

type OverlayHeaderProps = {
  name: string;
  onCancelClick: () => void;
};

const GameHeader = styled.div`
  font-size: 26px;
`;

const OverlayHeader = ({ name, onCancelClick }: OverlayHeaderProps) => {
  return (
    <BarContainer>
      <Slot></Slot>
      <GameHeader>{name}</GameHeader>
      <IconButton onClick={onCancelClick}>
        <CancelIcon fontSize="large" />
      </IconButton>
    </BarContainer>
  );
};

type FooterProps = {
  menuType: string;
  onStartNewGame: () => void;
  onStartLoadGame: () => void;
};

const FooterContainer = styled.div`
  display: flex;
  margin: 20px;
  width: 98%;
  justify-content: center;
  align-items: center;
`;

const StyledButton = styled(Button)`
  background-color: #ffa800 !important;
  color: #0f0a00 !important;

  &:hover {
    background-color: #ab7203 !important;
    color: #ffffff !important;
  }
`;

const OverlayFooter = ({
  menuType,
  onStartNewGame,
  onStartLoadGame,
}: FooterProps) => {
  return (
    <FooterContainer>
      {menuType === "newGame" ? (
        <StyledButton size="large" variant="contained" onClick={onStartNewGame}>
          Let's Go!
        </StyledButton>
      ) : menuType === "loadGame" ? (
        <StyledButton
          size="large"
          variant="contained"
          onClick={onStartLoadGame}
        >
          Open
        </StyledButton>
      ) : null}
    </FooterContainer>
  );
};

type NewGameOverlayProps = {
  onPlayerNameEntered: (value: string) => void;
};

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#ab7203",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#ab7203",
  },
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "#ab7203",
    },
  },
});

const NewGameOverlay = ({ onPlayerNameEntered }: NewGameOverlayProps) => {
  return (
    <CssTextField
      label="Player's Name"
      focused
      onChange={(event) => onPlayerNameEntered(event.target.value)}
    />
  );
};

const Overlay = ({
  menuType,
  onCancelClick,
  onStartLoadGame,
  onStartNewGame,
}: Props) => {
  const [playerName, setPlayerName] = useState("");
  const setGameSetup = useSetRecoilState(GameSetup);
  const resetGame = useResetRecoilState(GameSetup);
  const onNewGameClick = () => {
    console.log("click");
    resetGame();
    setGameSetup((prevState) => ({
      ...prevState,
      playerStats: {
        ...prevState.playerStats,
        name: playerName,
      },
    }));
    onStartNewGame();
  };
  return (
    <OverlayContainer>
      <StyledCard>
        <OverlayHeader
          name={
            menuType === "newGame"
              ? "New Game"
              : menuType === "loadGame"
              ? "Load Game"
              : menuType === "highscores"
              ? "Highscores"
              : ""
          }
          onCancelClick={onCancelClick}
        />
        {menuType === "newGame" ? (
          <NewGameOverlay
            onPlayerNameEntered={(value) => setPlayerName(value)}
          />
        ) : null}
        <OverlayFooter
          menuType={menuType}
          onStartLoadGame={onStartLoadGame}
          onStartNewGame={onNewGameClick}
        />
      </StyledCard>
    </OverlayContainer>
  );
};

export default Overlay;
