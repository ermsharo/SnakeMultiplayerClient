import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import AppleLogo from "./assets/applePixels.png";
import Monitor from "./assets/oldMonitor.png";

const Header = styled.div`
  margin: auto;
  width: 1000px;
  height: 100vh;

  background-color: black;
`;

const Background = styled.div`
  margin: auto;
  width: 100%;
  min-height: 100vh;
  background-image: url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAqpQe2mZTMhhzBylzw64LP37Ieu2yEYVZkq5VlYtDsWTVWM6PrRkwmYCXpekbSUxhEGc&usqp=CAU");
  display: grid;
  grid-template-columns: 1fr 1000px 1fr;
`;



function IntroPage() {
  return (
    <>
    <Header>
Aqui esta o nosso header
    </Header>
    
    </>

  );
}

export default IntroPage;
