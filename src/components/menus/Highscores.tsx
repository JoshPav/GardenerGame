import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Highscore } from "../../types/GameState";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { ApiContext } from "../../context/apiContext";
import { GameResult } from "gardener-schema";

const GoldTrophy = styled(EmojiEventsIcon)`
  color: #dbb000;
`;

const SilverTrophy = styled(EmojiEventsIcon)`
  color: #c0c0c0;
`;

const BronzeTrophy = styled(EmojiEventsIcon)`
  color: #cd7f32;
`;

type Props = {};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 95%;
  justify-content: center;
`;

const RowContainer = styled.div`
  display: flex;
  font-family: fantasy;
  font-size: 18px;
`;

const Item = styled.div`
  display: flex;
  flex: 2;
  align-self: center;
  justify-content: center;
  overflow: hidden;
`;

const ScrollableContainer = styled.div`
  display: flex;
  flex: 2;
  align-self: center;
  justify-content: center;
  overflow: hidden;
`;

const ScrollableText = styled.div`
  /* animation properties */
  -moz-transform: translateX(100%);
  -webkit-transform: translateX(100%);
  transform: translateX(100%);

  -moz-animation: my-animation 15s linear infinite;
  -webkit-animation: my-animation 15s linear infinite;
  animation: my-animation 15s linear infinite;

  /* for Firefox */
  @-moz-keyframes my-animation {
    from {
      -moz-transform: translateX(100%);
    }
    to {
      -moz-transform: translateX(-100%);
    }
  }

  /* for Chrome */
  @-webkit-keyframes my-animation {
    from {
      -webkit-transform: translateX(100%);
    }
    to {
      -webkit-transform: translateX(-100%);
    }
  }

  @keyframes my-animation {
    from {
      -moz-transform: translateX(100%);
      -webkit-transform: translateX(100%);
      transform: translateX(100%);
    }
    to {
      -moz-transform: translateX(-100%);
      -webkit-transform: translateX(-100%);
      transform: translateX(-100%);
    }
  }
`;
const PosColumn = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const PositionContainer = styled.div`
  display: flex;
  flexdirection: column;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
`;

const PositionText = styled.div`
  font-size: 18px;
  display: flex;
  flex: 1;
  justify-content: flex-end;
`;

const IconContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
`;

const PositionLabel = ({ position }: { position: number }) => {
  if (position === 1) {
    return (
      <PositionContainer>
        <IconContainer>
          <GoldTrophy fontSize="large" />
        </IconContainer>
        <PositionText>1ST</PositionText>
      </PositionContainer>
    );
  }
  if (position === 2) {
    return (
      <PositionContainer>
        <IconContainer>
          <SilverTrophy fontSize="medium" />
        </IconContainer>
        <PositionText>2ND</PositionText>
      </PositionContainer>
    );
  }
  if (position === 3) {
    return (
      <PositionContainer>
        <IconContainer>
          <BronzeTrophy fontSize="small" />
        </IconContainer>
        <PositionText>3RD</PositionText>
      </PositionContainer>
    );
  }
  return (
    <PositionContainer>
      <EmojiEventsIcon fontSize="large" style={{ visibility: "hidden" }} />
      <PositionText>{position}TH</PositionText>
    </PositionContainer>
  );
};

const HighscoreLine = ({
  score,
  position,
}: {
  score: Highscore;
  position: number;
}) => {
  const scrollingText = score.name.length >= 17;
  return (
    <RowContainer>
      <PosColumn style={{ justifyContent: "flex-end", width: "100%" }}>
        <PositionLabel position={position} />
      </PosColumn>
      <Item style={{ fontWeight: "800" }}>{score.score}</Item>
      {scrollingText ? (
        <ScrollableContainer>
          <ScrollableText>{score.name}</ScrollableText>
        </ScrollableContainer>
      ) : (
        <Item>{score.name}</Item>
      )}
      <Item>{new Date(score.endTime).toDateString()}</Item>
    </RowContainer>
  );
};

const HighscoreColumnHeaders = () => {
  return (
    <RowContainer style={{ fontSize: "24px" }}>
      <PosColumn>Pos</PosColumn>
      <Item>Score</Item>
      <Item>Name</Item>
      <Item>Date</Item>
    </RowContainer>
  );
};

const mapResult = (result: GameResult): Highscore => {
  return {
    name: result.name,
    score: result.score,
    endTime: new Date(result.endTime),
  };
};

const Highscores = (props: Props) => {
  const apiClient = useContext(ApiContext);
  const [highscores, setHighscores] = useState([] as Highscore[]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);

        const scores = (await apiClient.result.getTopResults()).data.map(
          mapResult
        );

        return setHighscores(scores);
      } catch (err) {
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  return (
    <Container>
      <HighscoreColumnHeaders />

      {loading && (
        <Item style={{ fontFamily: "fantasy", margin: "10px" }}>
          Loading...
        </Item>
      )}

      {!loading &&
        highscores.map((score, index) => (
          <HighscoreLine score={score} position={index + 1} key={index} />
        ))}
    </Container>
  );
};

export default Highscores;
