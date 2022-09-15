import { useState } from "react";
import styled from "styled-components";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: blue;
`;

const NavBar = styled.div`
  display: flex;
  height: 10vh;
  background-color: yellow;
`;

const GameboardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  margin: 10vh;
  background-color: red;
`;

function App() {
  return (
    <AppContainer>
      <GameboardContainer>
        <div>Gameboard</div>
      </GameboardContainer>
    </AppContainer>
  );
}

export default App;
