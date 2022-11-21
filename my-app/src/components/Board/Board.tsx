import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../Header/Header";
import Login from "../Login/Login";
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
          <Route path="/game" element={<> game </>}></Route>
        </Routes>
      </GamerBox>
    </BrowserRouter>
  );
}

export default Board;
