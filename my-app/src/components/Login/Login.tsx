import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import { Grid } from "../../Styles/GridSystem";
import Button from "@mui/material/Button";
// import Logo from "../logo/logo";
import axios from "axios";

const BoardBox = styled.div`
  width: 100%;
  font-family: "Varela Round", sans-serif;
  font-weight: 400;
  height: 100%;
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

    await axios
      .post(
        "http://localhost:4000/auth/singin",
        {
          formInputs,
        },
        {
          headers: headers,
        }
      )
      .then((response) => {
        // setRequestErrorAwnser(false);
        // saveUserInfo(response.data.id, response.data.token, response.data.name);
        // navigate("/");
      })
      .catch((error) => {
        // setRequestErrorAwnser(error.response.data);
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
