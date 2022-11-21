import styled from "styled-components";

const HeaderBox = styled.div`
  width: 100vw;

  text-align: right;
  background-color: blue;
  color: white;
`;

const UserInfo = styled.div`
padding: 30px;
`;

function Header() {
  return (
    <>
      <HeaderBox><UserInfo>User here</UserInfo></HeaderBox>
    </>
  );
}

export default Header;
