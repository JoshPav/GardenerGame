import React from "react";
import styled from "styled-components";
import LoadInMenu from "../components/menus/LoadInMenu";

const LoadInPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
`;

const GameHeader = styled.p`
  font-size: 30px;
`;

const BottomText = styled.p`
  font-size: 12px;
`;

type Props = {
  onNewGameClick: () => void;
  onLoadGameClick: () => void;
  onHighscoresClick: () => void;
  onExitGameClick: () => void;
};

const LoadInPage = ({
  onExitGameClick,
  onHighscoresClick,
  onLoadGameClick,
  onNewGameClick,
}: Props) => {
  const bottomText =
    "Coded By Bradley, Graphics Designed by Nicole & Tested By Libby";
  return (
    <LoadInPageContainer>
      <GameHeader>Welcome To Gardener!</GameHeader>
      <LoadInMenu
        onExitGameClick={onExitGameClick}
        onHighscoresClick={onHighscoresClick}
        onLoadGameClick={onLoadGameClick}
        onNewGameClick={onNewGameClick}
      />
      <BottomText>{bottomText}</BottomText>
    </LoadInPageContainer>
  );
};

export { LoadInPage };
