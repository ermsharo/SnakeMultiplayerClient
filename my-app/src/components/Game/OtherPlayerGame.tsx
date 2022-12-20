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

const canvasX = 1000;
const canvasY = 1000;

const scale = 50;
const timeDelay = 1000;

function OtherGamePlayer({ otherPlayerSnake }: any) {
  const canvasRefOtherPlayer = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    if (canvasRefOtherPlayer.current) {
      const canvas = canvasRefOtherPlayer.current;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.setTransform(scale, 0, 0, scale, 0, 0);
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        ctx.fillStyle = "purple";
        otherPlayerSnake.forEach(([x, y]: [any, any]) =>
          ctx.fillRect(x, y, 1, 1)
        );
      }
    }
  }, [otherPlayerSnake]);

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
