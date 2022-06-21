import styled from "@emotion/styled";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Search, Smile, Bell, User } from "react-feather";
import Button from "../Button/Button";
import Common from "../../styles/common";
import UserTooltip from "../UserTooltip/UserTooltip";
import { useGlobalContext } from "../../store/GlobalProvider";

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
  const { state, setUser } = useGlobalContext();
  const [query, setQuery] = useState("");
  const handleLogout = async () => {
    await axios({
      method: "POST",
      url: "/logout",
    });
    setUser(null);
  };

  const toggle = () => {
    setShow(!show);
  };

  return (
    <Header>
      <Wrapper>
        <Link to="/">
          <Smile style={{ color: "black" }} />
        </Link>
      </Wrapper>
      <Wrapper>
        <form>
          <Link to="/search" state={{ resultlist: query }}>
            <Button
              type="submit"
              height="40px"
              width="40px"
              style={{ marginTop: "5px" }}
            >
              <Search style={{ paddingTop: "5px" }} />
            </Button>
          </Link>
          <Input
            name="query"
            placeholder="검색어를 입력해주세요."
            onChange={e => setQuery(e.target.value)}
          />
        </form>
      </Wrapper>
      <Wrapper style={{ display: "flex", gap: "20px" }}>
        {state.userInfo ? (
          <>
            <Link to="/alarm">
              <IconButton>
                <Bell style={{ cursor: "pointer", color: "black" }} />
              </IconButton>
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
                  <User
                    style={{
                      position: "relative",
                      cursor: "pointer",
                      textDecoration: "none",
                    }}
                  />
                </IconButton>
              </Link>
              <UserTooltip
                onMouseLeave={toggle}
                style={{ display: show ? "block" : "none" }}
              />
            </span>
          </>
        ) : null}
        {!state.userInfo ? (
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
        ) : (
          <Link to="/">
            <Button
              width="80px"
              height="100%"
              fontSize="15px"
              backgroundColor="white"
              color="black"
              style={{ padding: "7px" }}
              onClick={handleLogout}
            >
              로그아웃
            </Button>
          </Link>
        )}
      </Wrapper>
    </Header>
  );
}

export default UpperHeader;
