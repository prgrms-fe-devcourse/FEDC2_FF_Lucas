import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import axios from "axios";
import PropTypes from "prop-types";
import Button from "../Button/Button";
import Image from "../Image/Image";
import Text from "../Text/Text";
import { useGlobalContext } from "../../store/GlobalProvider";

const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  position: absolute;
  margin-top: 20px;
  background-color: #e9e9e9;
  border-radius: 10%;
  width: 250px;
  height: 200px;
  right: -110px;
  z-index: 200;
  justify-content: center;
`;

const Wrapper = styled.div`
  margin-bottom: 15px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export default function UserTooltip({
  src = "https://picsum.photos/200",
  ...props
}) {
  const { setUser } = useGlobalContext();

  const handleLogout = async () => {
    await axios({
      method: "POST",
      url: "/logout",
    });
    setUser(null);
  };

  const { state } = useGlobalContext();

  return (
    <div>
      {state.userInfo ? (
        <Content className="tooltip" {...props}>
          {/* {state.userInfo?} */}
          <Wrapper>
            <Image
              src={src}
              width="50px"
              height="50px"
              style={{ borderRadius: "100%" }}
            />
          </Wrapper>
          <Wrapper>
            <Text block>{state.userInfo.user.fullName}</Text>
          </Wrapper>
          <Wrapper>
            <Text>게시물: &ensp;</Text>
            {state.userInfo.user.posts.length}&ensp;
            <Text>팔로워: &ensp;</Text>
            {state.userInfo.user.followers.length}&ensp;
            <Text>팔로잉: &ensp;</Text>
            {state.userInfo.user.following.length}&ensp;
          </Wrapper>
          <Wrapper style={{ marginTop: "30px" }}>
            <Link to="/">
              <Button
                width="200px"
                height="35px"
                fontSize="1rem"
                onClick={handleLogout}
              >
                로그아웃
              </Button>
            </Link>
          </Wrapper>
        </Content>
      ) : null}
    </div>
  );
}

UserTooltip.propTypes = {
  userName: PropTypes.string,
  postNum: PropTypes.number,
  follower: PropTypes.number,
  following: PropTypes.number,
  src: PropTypes.string,
};
