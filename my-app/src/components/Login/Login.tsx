import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import { Grid } from "../../Styles/GridSystem";
import Button from "@mui/material/Button";
// import Logo from "../logo/logo";
import { setUserInfo, setIsLogged } from "./../../utils/storageManegement";
import axios from "axios";

const BoardBox = styled.div`
  width: 100%;
  font-family: "Varela Round", sans-serif;
  font-weight: 400;
  height: 100%;
  padding-top: 64px;
`;

const LoginBox = styled.div`
  padding-top: 32px;
  grid-column: 3/7;
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

function Login() {
  const navigate = useNavigate();

  const [formInputs, setFormInputs] = useState({
    email: "",
    password: "",
  });

  function handleChange(evt: any) {
    const value = evt.target.value;
    setFormInputs({
      ...formInputs,
      [evt.target.name]: value,
    });
  }

  const singIn = async () => {
    const headers = {
      "Content-Type": "text/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
    };

    console.log("form inputs", formInputs);
    await axios
      .post("http://localhost:4000/auth/singin", {
        headers: headers,
        body: { formInputs },
      })
      .then((response) => {
        console.log("response ->", response.data);
        setUserInfo(response.data.id, response.data.name, response.data.token);
        setIsLogged();
        navigate("/game");
      })
      .catch(() => {
        alert("login invalido");
      });
  };

  return (
    <>
      <BoardBox>
        <LogoBox>{/* <Logo color="#00008b" size="6vw" /> */}</LogoBox>
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
          </LoginBox>
        </Grid>
      </BoardBox>
    </>
  );
}

export default Login;
