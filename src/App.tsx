import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled, { css } from "styled-components";
import GameHeaderBar from "./components/gameheaderbar/GameHeaderBar";
import Overlay from "./components/overlay/Overlay";
import Gardener from "./page/Gardener";
import websiteBackground from "./assets/Websitebackground.png";
import backgroundPortrait from "./assets/background_portrait.png";
import backgroundLandscape from "./assets/background_landscape.png";
import { LoadInPage } from "./page/LoadInPage";
import {
  GameEnded,
  GameStarted,
  HasError,
  IsLandscape,
  SavedGames,
  SavedHighScores,
} from "./state/Game";
import GameOver from "./page/GameOver";
type Props = {
  isPortrait: boolean;
};
const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  height: 100vh;
  background-image: url(${websiteBackground});
  background-size: cover;
`;

const AppBorder = styled.div(({ isPortrait }: Props) => {
  return css`
    display: flex;
    border: 5px solid black;
    height: ${isPortrait ? "1014" : "758"}px;
    width: ${isPortrait ? "758" : "1014"}px;
  `;
});

const GameboardContainer = styled.div(({ isPortrait }: Props) => {
  return css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    flex: 1;
    background-image: ${isPortrait
      ? `url(${backgroundPortrait})`
      : `url(${backgroundLandscape})`};
    background-repeat: no-repeat;
    background-size: cover;
  `;
});

const NotificationBar = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: fantasy;
  font-weight: 700;
  top: 2%;
  width: 50%;
  height: 5%;
  margin: auto;
  background-color: #cc0000;
  border: 1px solid black;
  z-index: 5;
  border-radius: 10px;
  color: #ffffff;
  animation: slideInDown;
  animation-duration: 1.5s;
  animation-iteration-count: 1;
`;

function App() {
  const [open, setOpen] = useState(false);
  const [isGameActive, setIsGameActive] = useRecoilState(GameStarted);
  const hasError = useRecoilValue(HasError);
  const [isGameEnded, setIsGameEnded] = useRecoilState(GameEnded);
  const [isLandscape, setIsLandscape] = useRecoilState(IsLandscape);
  const [menuType, setMenuType] = useState("");
  const setSavedGames = useSetRecoilState(SavedGames);
  const setSavedHighscores = useSetRecoilState(SavedHighScores);

  useEffect(() => {
    if (window.innerWidth >= window.innerHeight) {
      setIsLandscape(true);
    } else {
      setIsLandscape(false);
    }
    window.addEventListener("resize", () => {
      if (window.innerWidth >= window.innerHeight) {
        setIsLandscape(true);
      } else {
        setIsLandscape(false);
      }
    });
    return () => {
      window.removeEventListener("resize", () => {
        if (window.innerWidth >= window.innerHeight) {
          setIsLandscape(true);
        } else {
          setIsLandscape(false);
        }
      });
    };
  });

  const onOpenInGameOverLay = () => {
    setMenuType("inGame");
    setOpen(true);
  };

  const onNewGameClick = () => {
    setOpen(true);
    setMenuType("newGame");
  };

  const onHighscoresClick = () => {
    setOpen(true);
    setMenuType("highscores");
  };
  const onExitGameClick = () => {
    window.close();
  };

  const onStartNewGame = () => {
    setIsGameActive(true);
    setOpen(false);
  };

  const closeActiveGame = () => {
    setOpen(false);
    setIsGameActive(false);
  };

  const onMainMenuClick = () => {
    setIsGameEnded(false);
  };

  if (isGameEnded)
    return (
      <AppContainer>
        <AppBorder isPortrait={!isLandscape}>
          <GameboardContainer isPortrait={!isLandscape}>
            <GameOver
              onNewGameClick={onNewGameClick}
              onMainMenuClick={onMainMenuClick}
            />
            {open ? (
              <Overlay
                menuType={menuType}
                onCancelClick={() => setOpen(false)}
                onStartNewGame={onStartNewGame}
                onExitGameClick={() => console.log("exit")}
              />
            ) : null}
          </GameboardContainer>
        </AppBorder>
      </AppContainer>
    );

  if (isGameActive)
    return (
      <AppContainer>
        <AppBorder isPortrait={!isLandscape}>
          <GameboardContainer isPortrait={!isLandscape}>
            {hasError.show ? (
              <NotificationBar>{hasError.message}</NotificationBar>
            ) : null}
            <GameHeaderBar onMenuClick={onOpenInGameOverLay} />
            <Gardener />
            {open ? (
              <Overlay
                menuType={menuType}
                onCancelClick={() => setOpen(false)}
                onStartNewGame={onStartNewGame}
                onExitGameClick={closeActiveGame}
              />
            ) : null}
          </GameboardContainer>
        </AppBorder>
      </AppContainer>
    );
  return (
    <AppContainer>
      <AppBorder isPortrait={!isLandscape}>
        <GameboardContainer isPortrait={!isLandscape}>
          <LoadInPage
            onExitGameClick={onExitGameClick}
            onHighscoresClick={onHighscoresClick}
            onNewGameClick={onNewGameClick}
          />
          {open ? (
            <Overlay
              menuType={menuType}
              onCancelClick={() => setOpen(false)}
              onStartNewGame={onStartNewGame}
              onExitGameClick={() => console.log("exit")}
            />
          ) : null}
        </GameboardContainer>
      </AppBorder>
    </AppContainer>
  );
}

export default App;
