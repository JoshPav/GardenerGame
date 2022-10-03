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
  onStartNewGame: () => void;
  onExitGameClick: () => void;
};

const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-width: 50vh;
  background-color: #ffde9e !important;
`;

const OverlayContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
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
  color: #ab7203;
  font-family: fantasy;
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

const OverlayFooter = ({ menuType, onStartNewGame }: FooterProps) => {
  return (
    <FooterContainer>
      {menuType === "newGame" ? (
        <StyledButton size="large" variant="contained" onClick={onStartNewGame}>
          Let's Go!
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

const HighScoresOverlay = () => {
  return <div>Highscores</div>;
};

type InGameOverlayProps = {
  onNewGameClick: () => void;
  onExitGameClick: () => void;
};

const InGameOverlay = (props: InGameOverlayProps) => {
  return (
    <>
      <StyledButton
        size="large"
        variant="contained"
        onClick={props.onNewGameClick}
      >
        New Game
      </StyledButton>
      <div style={{ paddingBottom: "5%" }} />
      <StyledButton
        size="large"
        variant="contained"
        onClick={props.onExitGameClick}
      >
        End Game
      </StyledButton>
    </>
  );
};

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
  onStartNewGame,
  onExitGameClick,
}: Props) => {
  const [playerName, setPlayerName] = useState("");
  const [innerMenuType, setInnerMenuType] = useState(menuType);
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
            innerMenuType === "newGame"
              ? "New Game"
              : menuType === "highscores"
              ? "Highscores"
              : menuType === "inGame"
              ? "Menu"
              : ""
          }
          onCancelClick={onCancelClick}
        />
        {innerMenuType === "newGame" ? (
          <NewGameOverlay
            onPlayerNameEntered={(value) => setPlayerName(value)}
          />
        ) : innerMenuType === "highscores" ? (
          <HighScoresOverlay />
        ) : innerMenuType === "inGame" ? (
          <InGameOverlay
            onNewGameClick={() => setInnerMenuType("newGame")}
            onExitGameClick={onExitGameClick}
          />
        ) : null}
        <OverlayFooter
          menuType={innerMenuType}
          onStartNewGame={onNewGameClick}
        />
      </StyledCard>
    </OverlayContainer>
  );
};

export default Overlay;
