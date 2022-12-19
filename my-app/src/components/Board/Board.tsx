import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../Header/Header";
import Login from "../Login/Login";
import Game from "../Game/Game";
import styled from "styled-components";

const GamerBox = styled.div`
  background: white;
  padding: 0px;
  border: 0px;
  margin: 0px;
`;

function Board() {
  return (
    <BrowserRouter>
      <GamerBox>
        <Header />
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/game" element={<Game />}></Route>
        </Routes>
      </GamerBox>
    </BrowserRouter>
  );
}

export default Board;
