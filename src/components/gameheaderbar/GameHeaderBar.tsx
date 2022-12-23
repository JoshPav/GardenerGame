import React from "react";
import { useRecoilValue } from "recoil";
import styled, { css } from "styled-components";
import { GameSetup, IsLandscape } from "../../state/Game";
import MenuPost from "../menus/MenuPost";
import Toolbox from "../toolbox/Toolbox";
import nameSign from "../../assets/NameBoard.png";
import { useSpawnLogic } from "../../hooks/useSpawnLogic";

type Props = {
  isPortrait: boolean;
};

const Container = styled.div(({ isPortrait }: Props) => {
  return css`
    display: flex;
    height: ${isPortrait ? "25%" : "30%"};
    align-items: flex-end;
    align-self: flex-start;
    justify-content: space-evenly;
  `;
});

const Spacer = styled.div(({ isPortrait }: Props) => {
  return css`
    width: ${isPortrait ? "35vh;" : "25vh;"};
  `;
});

type GameHeaderBarProps = {
  onMenuClick: () => void;
};

const GameHeaderBar = (props: GameHeaderBarProps) => {
  const isLandscape = useRecoilValue(IsLandscape);
  const gameboard = useRecoilValue(GameSetup).board;
  const { getEmptyCellCoordinates } = useSpawnLogic();
  const spacesLeft = getEmptyCellCoordinates(gameboard).length;
  const spacesLeftText = `${spacesLeft} SPACES LEFT`;
  return (
    <Container isPortrait={!isLandscape}>
      <MenuPost onMenuClick={props.onMenuClick} />
      <Toolbox />
      <div
        style={{
          position: "absolute",
          right: 475,
          top: 238,
          transform: "rotate(13deg)",
          fontFamily: "fantasy",
          color: "#e5b41d",
          fontWeight: 700,
          fontSize: 14,
        }}
      >
        {spacesLeftText}
      </div>
    </Container>
  );
};

export default GameHeaderBar;
