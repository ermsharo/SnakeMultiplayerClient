import styled from "styled-components";
import {
  getIsLogged,
  getUserInfo,
  logout,
} from "./../../utils/storageManegement";
import { useNavigate } from "react-router-dom"
;
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
  font-size: 18px;
`;

const UserInfo = styled.div`
  padding: 30px;
  height: 20px;
`;

const LogoutInfo = styled.div`
  padding: 30px;
  color: white;
  font-weight: bolder;
  font-size: 18px;
  cursor: pointer;
`;

function Header() {
  const navigate = useNavigate();

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
            Logout
          </LogoutInfo>
        </HeaderBox>
      </>
    );
  }
  return (
    <>
      <>
        <HeaderBox>
          <UserInfo> </UserInfo>
        </HeaderBox>
      </>
    </>
  );
}

export default Header;
