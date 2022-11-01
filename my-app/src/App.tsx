import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useRef, useState } from 'react';
import styled from "styled-components";

const Board = styled.div`
  margin: auto;
  width: 1000px;
  height: 100%;
  border: 2px solid red;
`;


const canvasX = 1000;
const canvasY = 1000;

const initialSnake = [
  [4, 10],
  [4, 10],
];

const initialApple = [14, 10];
const scale = 50;
const timeDelay = 100;

function App() {

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [snake, setSnake] = useState(initialSnake);
  const [apple, setApple] = useState(initialApple);
  const [direction, setDirection] = useState([0, -1]);
  const [delay, setDelay] = useState<number | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  return (<Board>asdasdasd</Board>);
}

export default App;
