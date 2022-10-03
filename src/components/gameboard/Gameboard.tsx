import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled, { css } from "styled-components";
import { GameSetup, IsLandscape } from "../../state/Game";
import { BoardRow } from "./BoardRow";

type Props = {
  isPortrait: boolean;
};

const GamboardContainer = styled.div(({ isPortrait }: Props) => {
  return css`
    display: flex;
    height: ${isPortrait ? 768 * 0.8 : 1024 * 0.7 * 0.63}px;
    width: ${isPortrait ? 768 * 0.8 : 1024 * 0.7 * 0.63}px;
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
