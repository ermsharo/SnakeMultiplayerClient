import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import useInterval from "../../hooks/useInterval";
import AppleLogo from "./../../assets/applePixels.png";
import { getIsLogged, getUserInfo } from "../../utils/storageManegement";
import { useNavigate } from "react-router-dom";
import OtherGamePlayer from "./OtherPlayerGame";
import { useHotkeys } from "react-hotkeys-hook";
const Board = styled.div`
  margin: auto;

  canvas {
    border: 2px solid black;
    background-color: rgba(6, 20, 11, 0.2);
  }
`;

const OtherPlayer = styled.div`
  margin: auto;
  border: 2px solid red;
  width: 100%;
`;
const RegularPlayer = styled.div``;

const WaitingPlayersMessage = styled.div`
  border: 2px solid black;
  width: 585px;
  height: 440px;
  position: fixed;
  top: 43.2%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  font-size: 24px;
  line-height: 440px;
`;

const canvasX = 1000;
const canvasY = 1000;

const initialSnake = [
  [4, 10],
  [4, 10],
];

const initialApple = [14, 10];
const scale = 50;
const timeDelay = 2000;

function Game({ socket }: any) {
  const navigate = useNavigate();

  const [gameInfo, setGameInfo] = useState<any>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [snake, setSnake] = useState(initialSnake);
  const [otherPlayerSnake, setOtherPlayerSnake] = useState(null);
  const [apple, setApple] = useState(initialApple);
  const [direction, setDirection] = useState([0, -1]);
  const [delay, setDelay] = useState<number | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [waitingPlayers, setWaitingPlayers] = useState(true);

  const manageOtherPlayerSnake = () => {
    // console.log("gameInfo", gameInfo);
    // console.log("gameInfo", gameInfo.gameStatus);
    let playerOnePositionArray = gameInfo['playerOnePosition'];
    let playerTwoPositionArray = gameInfo['playerTwoPositon'];
    // console.log('p1 p ->',playerOnePositionArray)
    // console.log('p2 p ->',playerTwoPositionArray)
    if (gameInfo.gameStatus === "running") {

      if(id === '1'){
        // console.log("PLayer id", id)
        // console.log("Player 1 position",playerOnePositionArray)
        setOtherPlayerSnake(playerTwoPositionArray)
      }
      if(id === '2'){
        // console.log("PLayer id", id)
        // console.log("Player 2 position",playerTwoPositionArray)
        setOtherPlayerSnake(playerOnePositionArray)
      }
    }
  };


  useEffect(() => {
    socket.on("gameData", (data: any) => setGameInfo(data));
    console.log("Game info", gameInfo)
    if (gameInfo.gameStatus === "running") setWaitingPlayers(false);
  }, [socket, gameInfo]);

  const sendInfoToServer = (info: any) => {
    socket.emit("gameData", { info, socketID: socket.id });
  };
  const gameMessageFormat = (
    playerId: any,
    playerToken: any,
    playerPosition: any,
    playerDirection:any,
  ) => {
    return {
      player_id: playerId,
      player_token: playerToken,
      player_position: playerPosition,
      player_directon: playerDirection
    };
  };

  if (getIsLogged() === null) {
    console.log("is logged", getIsLogged());
    navigate("/login")
  }

  useInterval(() => runGame(), delay);
  let { id, token } = getUserInfo();
  const newSnake = [...snake];
  function runGame() {
    if (!waitingPlayers) {
      const newSnakeHead = [
        newSnake[0][0] + direction[0],
        newSnake[0][1] + direction[1],
      ];
      newSnake.unshift(newSnakeHead);
      if (checkCollision(newSnakeHead)) {
        setDelay(null);
        handleSetScore();
      }
      if (!appleAte(newSnake)) {
        newSnake.pop();
      }
    }
    setSnake(newSnake);
    manageOtherPlayerSnake();
    sendInfoToServer(gameMessageFormat(id, token, snake, direction));
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

  useHotkeys("left", () => {
    setDirection([-1, 0]);
  });
  useHotkeys("up", () => {
    setDirection([0, -1]);
  });
  useHotkeys("right", () => {
    setDirection([1, 0]);
  });
  useHotkeys("down", () => {
    setDirection([0, 1]);
  });

  if (waitingPlayers) {
    return (
      <Board>
        <WaitingPlayersMessage>
          Esperando a entrada de todos os jogadores
        </WaitingPlayersMessage>
        <button onClick={play} className="playButton">
          Entrar no jogo
        </button>
      </Board>
    );
  }


  return (
    <Board>
      <div>
        <RegularPlayer>
          {" "}
          <div>
            <img id="fruit" src={AppleLogo} alt="fruit" width="30" />
            <canvas
              className="playArea"
              ref={canvasRef}
              width={`${canvasX}px`}
              height={`${canvasY}px`}
            />
            {gameOver && <div className="gameOver">Game Over</div>}
            <button onClick={play} className="playButton">
              Entar no jogo
            </button>
          </div>
        </RegularPlayer>
        <OtherPlayer>
          <OtherGamePlayer
            otherPlayerSnake={otherPlayerSnake}
          />
        </OtherPlayer>
      </div>
    </Board>
  );
}

export default Game;
