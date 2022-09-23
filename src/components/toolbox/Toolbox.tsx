import React from "react";
import { useRecoilState } from "recoil";
import { GameSetup } from "../../state/Game";
import styled, { css } from "styled-components";
import swapSmurf from "../../assets/SwapSmurf.png";
import digSmurf from "../../assets/DigSmurf.png";
type ToolContainerProps = {
  isSelected: boolean;
};

const CharacterContainer = styled.div`
  display: flex;
  height: 100%;
`;

const Toolbox = () => {
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
    <CharacterContainer
      onClick={() => setIsSwapTool(!gameSetup.playerStats.isSwapTool)}
    >
      <img
        src={gameSetup.playerStats.isSwapTool ? swapSmurf : digSmurf}
        width="100%"
        style={{ objectFit: "contain" }}
      />
    </CharacterContainer>
  );
};

export default Toolbox;
