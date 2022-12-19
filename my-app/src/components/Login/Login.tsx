import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "@mui/material/Button";

const BoardBox = styled.div`
  width: 100%;
  font-family: "Varela Round", sans-serif;
  font-weight: 400;
  height: 100%;
`;

const LoginBox = styled.div`
  padding-top: 32px;
  grid-column: 2/6;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 16px;

  input {
    font-family: "Varela Round", sans-serif;
  }
  button {
    font-family: "Varela Round", sans-serif;
    font-weight: 700;
    background-color: blue;
    border-radius: 20px;
    margin-top: 16px;

    &:hover {
      background-color: blue;
      opacity: 0.9;
    }
  }
`;

const LogoBox = styled.div`
  display: flex;
  justify-content: center;
  padding: 16px;
`;

const CreateAccountButton = styled.div`
  font-family: "Varela Round", sans-serif;
  font-weight: 600;
  cursor: pointer;
  margin-top: 16px;
  padding-left: 8px;
  &:hover {
    opacity: 0.7;
  }
`;

function Login() {
  const navigate = useNavigate();
  const [formInputs, setFormInputs] = useState({
    email: "",
    password: "",
  });

  // const handleSubmit = (e: any) => {
  //   e.preventDefault();
  //   localStorage.setItem("userName", userName);
  //   // socket.emit("newUser", {userName, socketID: socket.id})
  //   navigate("/game");
  // };

  return (
    <>
    <BoardBox>
      <LogoBox>
        <Logo color="#00008b" size="6vw" />
      </LogoBox>
      <Grid>
        <LoginBox>
          <TextField
            fullWidth
            id="outlined-name"
            label="Email"
            name="email"
            value={formInputs.email}
            onChange={handleChange}
          />
          <TextField
            type="password"
            fullWidth
            id="outlined-name"
            label="Password"
            name="password"
            value={formInputs.password}
            onChange={handleChange}
          />
   
   


          <Button
            onClick={() => {
              singIn();
            }}
            fullWidth
            variant="contained"
          >
            Login
          </Button>

          <CreateAccountButton
            onClick={() => {
              navigate("create-account");
            }}
          >
            Create account
          </CreateAccountButton>
        </LoginBox>
      </Grid>
    </BoardBox>
  </>
  );
}

export default Login;
