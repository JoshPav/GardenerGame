import React from "react";
import scorePart1 from "../../assets/ScorePart1.png";
import scorePart2 from "../../assets/ScorePart2.png";
import scorePart3 from "../../assets/ScorePart3.png";
import scorePart4 from "../../assets/ScorePart4.png";
import scorePart5 from "../../assets/ScorePart5.png";

import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { GameSetup, IsLandscape } from "../../state/Game";

const PortraitScoreMenu = styled.div`
  position: absolute;
  top: 46%;
  width: 55%;
  left: 10%;
  text-align: center;
  font-weight: 700;
  transform: rotate(-9deg);
  font-family: sans-serif;
  color: #e5b41d;
  cursor: default;
`;

const PortraitNameLabel = styled.div`
  position:absolute;
  top: 9%;
  width: 55%;
  left: 12%;
  text-align:center;
  font-weight: 700;
  transform rotate(-8deg);
  font-family: sans-serif;
  letter-spacing: 2px;
  color: #e5b41d;
  cursor: default;
`;
type Props = {
  onMenuClick: () => void;
};

const MenuPost = (props: Props) => {
  const isLandscape = useRecoilValue(IsLandscape);
  let width;
  if (isLandscape) {
    width = "15%";
  } else {
    width = "20%";
  }
  const playerStats = useRecoilValue(GameSetup).playerStats;
  return (
    <div
      style={{
        width: width,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        position: "relative",
      }}
    >
      <img src={scorePart5} width="100%" style={{ objectFit: "contain" }} />
      <img src={scorePart4} width="100%" style={{ objectFit: "contain" }} />
      <img src={scorePart3} width="100%" style={{ objectFit: "contain" }} />
      <PortraitNameLabel>
        {playerStats.name.toLocaleUpperCase()}
      </PortraitNameLabel>
      <PortraitScoreMenu>{playerStats.score}</PortraitScoreMenu>
      <img
        src={scorePart2}
        width="100%"
        style={{ objectFit: "contain", cursor: "pointer" }}
        onClick={props.onMenuClick}
      />
      <img src={scorePart1} width="100%" style={{ objectFit: "contain" }} />
    </div>
  );
};

export default MenuPost;
