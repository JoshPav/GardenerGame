import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { GameSetup, IsLandscape } from "../../state/Game";
import styled, { css } from "styled-components";
import swapSmurf from "../../assets/SwapSmurf.png";
import digSmurf from "../../assets/DigSmurf.png";
type ToolContainerProps = {
  isSelected: boolean;
};

const PortraitCharacterContainer = styled.div`
  display: flex;
  width: 30%;
  margin-right: 10%;
`;

const LandscapeCharacterContainer = styled.div`
  display: flex;
  width: 20%;
  margin-right: 10%;
`;

const Toolbox = () => {
  const [gameSetup, updateGameSetup] = useRecoilState(GameSetup);
  const isLandscape = useRecoilValue(IsLandscape);
  const setIsSwapTool = (bool: boolean) => {
    updateGameSetup((prevState) => ({
      ...prevState,
      playerStats: {
        ...prevState.playerStats,
        isSwapTool: bool,
      },
    }));
  };
  if (isLandscape)
    return (
      <LandscapeCharacterContainer
        onClick={() => setIsSwapTool(!gameSetup.playerStats.isSwapTool)}
      >
        <img
          src={gameSetup.playerStats.isSwapTool ? swapSmurf : digSmurf}
          width="100%"
          style={{ objectFit: "contain" }}
        />
      </LandscapeCharacterContainer>
    );
  return (
    <PortraitCharacterContainer
      onClick={() => setIsSwapTool(!gameSetup.playerStats.isSwapTool)}
    >
      <img
        src={gameSetup.playerStats.isSwapTool ? swapSmurf : digSmurf}
        width="100%"
        style={{ objectFit: "contain" }}
      />
    </PortraitCharacterContainer>
  );
};

export default Toolbox;
