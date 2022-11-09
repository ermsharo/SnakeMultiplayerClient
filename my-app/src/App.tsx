import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import useInterval from "./hooks/useInterval";
import AppleLogo from "./assets/applePixels.png";
import Monitor from "./assets/oldMonitor.png";

const Board = styled.div`
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

const PlayerInfo = styled.div`
  width: 100%;
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

  useInterval(() => runGame(), delay);

  function runGame() {
    const newSnake = [...snake];
    const newSnakeHead = [
      newSnake[0][0] + direction[0],
      newSnake[0][1] + direction[1],
    ];
    newSnake.unshift(newSnakeHead);
    if (checkCollision(newSnakeHead)) {
      setDelay(null);
      setGameOver(true);
      handleSetScore();
    }
    if (!appleAte(newSnake)) {
      newSnake.pop();
    }
    setSnake(newSnake);
  }

  useEffect(() => {
    console.log("snake", snake);
    let fruit = document.getElementById("fruit") as HTMLCanvasElement;
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.setTransform(scale, 0, 0, scale, 0, 0);
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        ctx.fillStyle = "#a3d001";
        snake.forEach(([x, y]) => ctx.fillRect(x, y, 1, 1));
        ctx.drawImage(fruit, apple[0], apple[1], 1, 1);
      }
    }
  }, [snake, apple, gameOver]);

  function play() {
    setSnake(initialSnake);
    setApple(initialApple);
    setDirection([1, 0]);
    setDelay(timeDelay);
    setScore(0);
    setGameOver(false);
  }

  function checkCollision(head: number[]) {
    for (let i = 0; i < snake.length; i++) {
      if (head[i] < 0 || head[i] * scale >= canvasX) return true;
    }
    for (const s of snake) {
      if (head[0] === s[0] && head[1] === s[1]) return true;
    }
    return false;
  }

  function handleSetScore() {
    if (score > Number(localStorage.getItem("snakeScore"))) {
      localStorage.setItem("snakeScore", JSON.stringify(score));
    }
  }

  function appleAte(newSnake: number[][]) {
    let coord = apple.map(() => Math.floor((Math.random() * canvasX) / scale));
    if (newSnake[0][0] === apple[0] && newSnake[0][1] === apple[1]) {
      let newApple = coord;
      setScore(score + 1);
      setApple(newApple);
      return true;
    }
    return false;
  }

  function changeDirection(e: React.KeyboardEvent<HTMLDivElement>) {
    switch (e.key) {
      case "ArrowLeft":
        setDirection([-1, 0]);
        break;
      case "ArrowUp":
        setDirection([0, -1]);
        break;
      case "ArrowRight":
        setDirection([1, 0]);
        break;
      case "ArrowDown":
        setDirection([0, 1]);
        break;
    }
  }


  return (
    <Background>
      <div>asdasd</div>
      <Board>
      <div onKeyDown={(e) => changeDirection(e)}>
      <img id="fruit" src={AppleLogo} alt="fruit" width="30" />
      {/* <img src={Monitor} alt="fruit" width="4000" className="monitor" /> */}
      <canvas
        className="playArea"
        ref={canvasRef}
        width={`${canvasX}px`}
        height={`${canvasY}px`}
      />
      {gameOver && <div className="gameOver">Game Over</div>}
      <button onClick={play} className="playButton">
        Play
      </button>
      <div className="scoreBox">
        <h2>Score: {score}</h2>
        <h2>High Score: {localStorage.getItem("snakeScore")}</h2>
      </div>
    </div>
        asdasdasd
      </Board>
      <PlayerInfo>      <div className="scoreBox">
            <h2>Score: {score}</h2>
            <h2>High Score: {localStorage.getItem("snakeScore")}</h2>
          </div></PlayerInfo>
    </Background>
  );
}

export default App;
