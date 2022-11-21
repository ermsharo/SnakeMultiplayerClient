import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const FormBox = styled.div`
  width: 50vw;
  margin: auto;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 18px;
`;

const ButtonBox = styled.div`
  padding: 16px;
`;

const SingInButton = styled.button`
  width: 300px;
  background-color: blue;
  font-family: "Press Start 2P", cursive;
  padding: 8px;
  color: white;
  outline: none;

  border: 1px solid transparent;
  border-radius: 5px;
`;

function Login() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    localStorage.setItem("userName", userName);
    // socket.emit("newUser", {userName, socketID: socket.id})
    navigate("/game");
  };

  return (
    <FormBox>
      <form className="home__container" onSubmit={handleSubmit}>
        <Title> Snake multiplayer</Title>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          minLength={6}
          name="username"
          id="username"
          className="username__input"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <ButtonBox>
          {" "}
          <SingInButton>SIGN IN</SingInButton>
        </ButtonBox>
      </form>
    </FormBox>
  );
}

export default Login;
