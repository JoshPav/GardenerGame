import { useSetRecoilState } from "recoil";
import { SavedGames, SavedHighScores } from "../state/Game";

export const useLocalStorage = () => {
  const setSavedGames = useSetRecoilState(SavedGames);
  const setSavedHighscores = useSetRecoilState(SavedHighScores);

  const initialiseSavedGames = () => {
    const localStorageSavedGames = localStorage.getItem("savedGames");
    if (localStorageSavedGames !== null) {
      setSavedGames(JSON.parse(localStorageSavedGames));
    }
  };
  const initialiseHighscoresStorage = () => {
    const localStorageHighscores = localStorage.getItem("savedHighscores");
    if (localStorageHighscores !== null) {
      setSavedHighscores(JSON.parse(localStorageHighscores));
    }
  };
  const initialiseLocalStorage = () => {
    initialiseHighscoresStorage();
    initialiseSavedGames();
  };

  const saveGame = () => {};
};
