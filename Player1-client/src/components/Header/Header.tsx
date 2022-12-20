import styled from "styled-components";
import {
  getIsLogged,
  getUserInfo,
  logout,
} from "./../../utils/storageManegement";
const HeaderBox = styled.div`
  width: 100%;
  position: fixed;
  top: 0px;
  text-align: right;
  background-color: #1976d2;
  color: white;
  display: flex;
  justify-content: end;
  font-weight: bolder;
  font-size: 16px;
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
    console.log("get user indo ->", getUserInfo());
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
