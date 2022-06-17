import styled from "@emotion/styled";
import PropTypes from "prop-types";
import Button from "../Button/Button";
import Image from "../Image/Image";
import Text from "../Text/Text";

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
  userName = "홍길동",
  postNum = 10,
  follower = 20,
  following = 5,
  src = "https://picsum.photos/200",
  ...props
}) {
  return (
    <Content className="tooltip" {...props}>
      <Wrapper>
        <Image
          src={src}
          width="50px"
          height="50px"
          style={{ borderRadius: "100%" }}
        />
      </Wrapper>
      <Wrapper>
        <Text block>{userName}</Text>
      </Wrapper>
      <Wrapper>
        <Text>게시물: &ensp;</Text>
        {postNum}&ensp;
        <Text>팔로워: &ensp;</Text>
        {follower}&ensp;
        <Text>팔로잉: &ensp;</Text>
        {following}&ensp;
      </Wrapper>
      <Wrapper>
        <Button width="50%" height="35px" fontSize="1rem">
          로그아웃
        </Button>
      </Wrapper>
    </Content>
  );
}

UserTooltip.propTypes = {
  userName: PropTypes.string,
  postNum: PropTypes.number,
  follower: PropTypes.number,
  following: PropTypes.number,
  src: PropTypes.string,
};
