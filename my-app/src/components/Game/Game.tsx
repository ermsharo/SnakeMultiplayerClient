import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import useInterval from "./../../hooks/useInterval";
import AppleLogo from "./../../assets/applePixels.png";
import { getIsLogged, getUserInfo } from "./../../utils/storageManegement";
import { useNavigate } from "react-router-dom";

const Board = styled.div`
  margin: auto;

  canvas {
    border: 2px solid black;
    background-color: rgba(6, 20, 11, 0.2);
  }
`;

const Background = styled.div`
  display: grid;
  grid-template-columns: 1fr 1000px 1fr;
  padding-top: 60px;
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
const timeDelay = 1000;

function Game({ socket }: any) {
  const navigate = useNavigate();

  // const [messages, setMessages] = useState<any | any>([]);
  // const [typingStatus, setTypingStatus] = useState("");
  // const lastMessageRef = useRef(null);

  const sendInfoToServer = (info: any) => {
    console.log("Info ->", info);
    socket.emit("gameData", { info, socketID: socket.id });
  };
  const gameMessageFormat = (
    playerId: any,
    playerToken: any,
    gameStart: any,
    playerPosition: any
  ) => {
    return {
      player_id: playerId,
      player_token: playerToken,
      game_start: gameStart,
      player_position: playerPosition,
    };
  };

  if (getIsLogged() === null) {
    navigate("/");
  }
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [snake, setSnake] = useState(initialSnake);
  const [apple, setApple] = useState(initialApple);
  const [direction, setDirection] = useState([0, -1]);
  const [delay, setDelay] = useState<number | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  useInterval(() => runGame(), delay);
  const { id, user } = getUserInfo();
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
    let { id, token } = getUserInfo();
    sendInfoToServer(gameMessageFormat(id, token, true, snake));
  }

  useEffect(() => {
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
      <Board>
        <div>{user}</div>
        <div onKeyDown={(e) => changeDirection(e)}>
          <img id="fruit" src={AppleLogo} alt="fruit" width="30" />
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
        </div>
      </Board>
      <PlayerInfo>
        <h2>Score: {score}</h2>
        <h2>High Score: {localStorage.getItem("snakeScore")}</h2>
      </PlayerInfo>
    </Background>
  );
}

export default Game;
