import styled from "@emotion/styled";
import { Search, Smile, Bell, User } from "react-feather";
import Button from "../Button/Button";
import Common from "../../styles/common";

const Header = styled.div`
  background-color: ${Common.colors.secondaryColor};
  justify-content: space-between;
  display: flex;
  align-items: center;
  width: 100%;
  height: 60px;
`;
const Input = styled.input`
  background-color: ${Common.colors.secondaryColor};
  border: none;
  height: 30px;
  width: 30rem;
  margin: 5px;
  font-size: 1.5rem;
  margin-left: 20px;
  &:focus {
    outline: none;
  }
  &:hover {
    border-bottom: 1px solid black;
  }
`;

const Wrapper = styled.div`
  display: inline;
  width: fit-content;
  align-items: center;
  margin: 20px;
`;

function UpperHeader() {
  return (
    <Header>
      <Wrapper>
        <Smile />
      </Wrapper>
      <Wrapper>
        <Search style={{ marginTop: "15px" }} />
        <Input placeholder="검색어를 입력해주세요." />
      </Wrapper>
      <Wrapper style={{ display: "flex", gap: "20px" }}>
        <Bell />
        <User />
        <Button
          width="80px"
          height="100%"
          fontSize="20px"
          backgroundColor="white"
          color="black"
        >
          로그인
        </Button>
      </Wrapper>
    </Header>
  );
}

export default UpperHeader;
