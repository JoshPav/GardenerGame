import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled, { css } from "styled-components";
import GameHeaderBar from "./components/gameheaderbar/GameHeaderBar";
import Gameboard from "./components/gameboard/Gameboard";
import LeftSide from "./components/LeftSide";
import GameMenu from "./components/menus/GameMenu";
import Overlay from "./components/overlay/Overlay";
import RightSide from "./components/RightSide";
import Gardener from "./page/Gardener";
import { LoadInPage } from "./page/LoadInPage";
import {
  GameEnded,
  GameStarted,
  IsLandscape,
  SavedGames,
  SavedHighScores,
} from "./state/Game";
import { GameState, Highscore } from "./types/GameState";
type Props = {
  isPortrait: boolean;
};
const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  height: 100vh;
  background-image: url(src/assets/Websitebackground.png);
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

const NavBar = styled.div`
  display: flex;
  height: 10vh;
  background-color: yellow;
`;

const GameboardContainer = styled.div(({ isPortrait }: Props) => {
  return css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    flex: 1;
    background-image: ${isPortrait
      ? "url(src/assets/background_portrait.png)"
      : "url(src/assets/background_landscape.png)"};
    background-repeat: no-repeat;
    background-size: cover;
  `;
});

function App() {
  const [open, setOpen] = useState(false);
  const [isGameActive, setIsGameActive] = useRecoilState(GameStarted);
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

  const localStorageSavedGames = localStorage.getItem("savedGames");
  const localStorageHighscores = localStorage.getItem("savedHighscores");
  if (localStorageSavedGames !== null) {
    setSavedGames(JSON.parse(localStorageSavedGames));
  }
  if (localStorageHighscores !== null) {
    setSavedHighscores(JSON.parse(localStorageHighscores));
  }

  const onSaveGameClick = () => {
    console.log("On Save Game Click");
  };

  const onNewGameClick = () => {
    setOpen(true);
    setMenuType("newGame");
  };

  const onHighscoresClick = () => {
    setOpen(true);
    setMenuType("highscores");
  };

  const onLoadGameClick = () => {
    setOpen(true);
    setMenuType("loadGame");
  };
  const onExitGameClick = () => {
    window.close();
  };

  const onStartNewGame = () => {
    setIsGameActive(true);
    setOpen(false);
  };

  if (isGameEnded)
    return (
      <AppContainer>
        <AppBorder isPortrait={!isLandscape}>
          <GameboardContainer isPortrait={!isLandscape}>
            <div>Game Over</div>
          </GameboardContainer>
        </AppBorder>
      </AppContainer>
    );

  if (isGameActive)
    return (
      <AppContainer>
        <AppBorder isPortrait={!isLandscape}>
          <GameboardContainer isPortrait={!isLandscape}>
            <GameHeaderBar />
            <div
              style={
                !isLandscape
                  ? { height: "calc(70%-1px)" }
                  : { height: "calc(60%-1px)" }
              }
            >
              <Gardener />
            </div>
            {open ? (
              <Overlay
                menuType={menuType}
                onCancelClick={() => setOpen(false)}
                onStartNewGame={onStartNewGame}
                onStartLoadGame={() => console.log("Implement Loading")}
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
            onLoadGameClick={onLoadGameClick}
          />
          {open ? (
            <Overlay
              menuType={menuType}
              onCancelClick={() => setOpen(false)}
              onStartNewGame={onStartNewGame}
              onStartLoadGame={() => console.log("Implement Loading")}
            />
          ) : null}
        </GameboardContainer>
      </AppBorder>
    </AppContainer>
  );
}

export default App;
