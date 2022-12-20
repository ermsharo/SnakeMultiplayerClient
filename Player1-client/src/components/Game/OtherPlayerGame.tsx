import { useEffect, useRef } from "react";
import styled from "styled-components";
import { getUserInfo } from "./../../utils/storageManegement";

const canvasX = 1000;
const canvasY = 1000;

const scale = 50;



function OtherGamePlayer({ otherPlayerSnake, gameInfo }: any) {
  const canvasRefOtherPlayer = useRef<HTMLCanvasElement | null>(null);

  let { id } = getUserInfo();

  const getSnakerArray = () => {
    console.log("Game info", gameInfo["playerOnePosition"]);
    if (id === "1") {
      return gameInfo["playerOnePosition"];
    }
    if (id === "2") {
      return gameInfo["playerTwoPositon"];
    }
  };

  console.log("get snakes array", getSnakerArray());

  useEffect(() => {
    if (canvasRefOtherPlayer.current) {
      const canvas = canvasRefOtherPlayer.current;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.setTransform(scale, 0, 0, scale, 0, 0);
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        ctx.fillStyle = "purple";
        getSnakerArray().forEach(([x, y]: [any, any]) =>
          ctx.fillRect(x, y, 1, 1)
        );
      }
    }
  }, [otherPlayerSnake]);

  // console.log("id ->", id)
  // console.log("game info from other" , gameInfo)
 

  if (!otherPlayerSnake)
    return <div className="playArea">Sem representação do outro player</div>;

  return (
    <div>
      <canvas
        className="playArea"
        ref={canvasRefOtherPlayer}
        width={`${canvasX}px`}
        height={`${canvasY}px`}
      />
    </div>
  );
}

export default OtherGamePlayer;
