import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Search, Smile, Bell, User } from "react-feather";
import Button from "../Button/Button";
import Common from "../../styles/common";
import UserTooltip from "../UserTooltip/UserTooltip";

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
const IconButton = styled.button`
  background-color: ${Common.colors.secondaryColor};
  border: none;
  border-radius: 50%;
  &:hover {
    background-color: ${Common.colors.mainColor};
  }
`;

function UpperHeader() {
  const [show, setShow] = useState(false);

  const toggle = () => {
    setShow(!show);
  };
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
        <Link to="/alarm">
          <Bell stlye={{ cursor: "pointer" }} />
        </Link>
        <span style={{ position: "relative" }}>
          <Link to="/profile">
            <IconButton
              type="button"
              onMouseEnter={toggle}
              style={{
                backgroundColor: show
                  ? Common.colors.mainColor
                  : Common.colors.secondaryColor,
              }}
            >
              <User style={{ position: "relative", cursor: "pointer" }} />
            </IconButton>
          </Link>
          <UserTooltip
            onMouseLeave={toggle}
            style={{ display: show ? "block" : "none" }}
          />
        </span>
        <Link to="/login">
          <Button
            width="80px"
            height="100%"
            fontSize="15px"
            backgroundColor="white"
            color="black"
            style={{ padding: "7px" }}
          >
            로그인
          </Button>
        </Link>
      </Wrapper>
    </Header>
  );
}

export default UpperHeader;
