import React from "react";
import { useRecoilValue } from "recoil";
import styled, { css } from "styled-components";
import { IsLandscape } from "../../state/Game";
import Toolbox from "../toolbox/Toolbox";

type Props = {
  isPortrait: boolean;
};

const Container = styled.div(({ isPortrait }: Props) => {
  return css`
    display: flex;
    height: ${isPortrait ? "28%" : "38%"};
    align-items: flex-end;
    align-self: flex-start;
    background-color: yellow;
  `;
});

const Spacer = styled.div(({ isPortrait }: Props) => {
  return css`
    width: ${isPortrait ? "32vh;" : "63vh;"};
  `;
});

const GameHeaderBar = () => {
  const isLandscape = useRecoilValue(IsLandscape);
  return (
    <Container isPortrait={!isLandscape}>
      <div>Menu Post</div>
      <Spacer isPortrait={!isLandscape} />
      <Toolbox />
    </Container>
  );
};

export default GameHeaderBar;
