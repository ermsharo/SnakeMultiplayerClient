import styled from "styled-components";
import {
  setUserInfo,
  setIsLogged,
  getIsLogged,
  getUserInfo,
  logout,
} from "./../../utils/storageManegement";
import { useState, useEffect } from "react";
const HeaderBox = styled.div`
  width: 100vw;

  text-align: right;
  background-color: blue;
  color: white;
  display: flex;
  justify-content: end;
`;

const UserInfo = styled.div`
  padding: 30px;
`;

const LogoutInfo = styled.div`
  padding: 30px;
  color: orange;
  cursor: pointer;
`;

function Header() {
  console.log("header get is logged", getIsLogged());
  if (getIsLogged() != null) {
    const { user } = getUserInfo();
    return (
      <>
        <HeaderBox>
          <UserInfo>{user}</UserInfo>
          <LogoutInfo
            onClick={() => {
              logout();
              window.location.reload();
            }}
          >
            LOGOUT
          </LogoutInfo>
        </HeaderBox>
      </>
    );
  }
  return (
    <>
      <>
        <HeaderBox>
          <UserInfo>Login</UserInfo>
        </HeaderBox>
      </>
    </>
  );
}

export default Header;
