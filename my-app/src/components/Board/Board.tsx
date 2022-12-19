import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../Header/Header";
import Login from "../Login/Login";
import Game from "../Game/Game";
import styled from "styled-components";
import socketIOClient from "socket.io-client";
import React, { useState, useEffect } from "react";

const GamerBox = styled.div`
  background: white;
  padding: 0px;
  border: 0px;
  margin: 0px;
`;

function Board() {
  const [socketResponse, setSocketResponse] = useState("");
  useEffect(() => {
    const socket = socketIOClient("http://localhost:4000");
    socket.on("FromAPI", (data) => {
      setSocketResponse(data);
    });
  }, []);

  return (
    <BrowserRouter>
      <GamerBox>
        <Header />
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route
            path="/game"
            element={
              <Game
                setSocketResponse={setSocketResponse}
                socketResponse={socketResponse}
              />
            }
          ></Route>
        </Routes>
      </GamerBox>
    </BrowserRouter>
  );
}

export default Board;
