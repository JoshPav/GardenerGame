import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled, { css } from "styled-components";
import { GameSetup, IsLandscape } from "../../state/Game";
import { BoardRow } from "./BoardRow";
import {
  screenHeight,
  screenWidth,
  useGameLogic,
} from "../../hooks/useGameLogic";

type Props = {
  isPortrait: boolean;
};

const GamboardContainer = styled.div(({ isPortrait }: Props) => {
  return css`
    display: flex;
    height: ${isPortrait ? screenWidth * 0.6 : screenHeight * 0.5}px;
    width: ${isPortrait ? screenWidth * 0.6 : screenHeight * 0.5}px;
    flex-direction: column;
    border: 0.5vh solid #966f33;
    background-image: url(src/assets/grid_no_patches.png);
    background-size: contain;
  `;
});

const Gameboard = () => {
  const isLandscape = useRecoilValue(IsLandscape);
  const gameboard = useRecoilValue(GameSetup).board;
  return (
    <div style={{ display: "flex", flex: 1, alignItems: "center" }}>
      <GamboardContainer isPortrait={!isLandscape}>
        {gameboard.map((row, ycord) => {
          return <BoardRow row={row} ycord={ycord} key={`row ${ycord + 1}`} />;
        })}
      </GamboardContainer>
    </div>
  );
};

export default Gameboard;
