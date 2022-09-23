import React from "react";
import styled from "styled-components";
import { Row } from "../../types/GameState";
import { BoardCell } from "./BoardCell";

type GameBoardRowProps = {
  row: Row;
  ycord: number;
};

const RowContainer = styled.div`
  display: flex;
  flex: 1;
  alignitems: center;
  justify-content: center;
`;

const BoardRow = ({ row, ycord }: GameBoardRowProps) => {
  return (
    <RowContainer>
      {row.map((cell, xcord) => {
        return (
          <BoardCell
            cell={cell}
            coordinate={{ YCord: ycord, XCord: xcord }}
            key={`cell ${xcord + 1}`}
          />
        );
      })}
    </RowContainer>
  );
};

export { BoardRow };
