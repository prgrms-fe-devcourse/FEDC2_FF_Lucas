import PropTypes from "prop-types";
import styled from "@emotion/styled";
import Text from "../Text/Text";
import Image from "../Image/Image";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 30px 0;
`;

const StyledImage = styled(Image)`
  border-radius: 100%;
  width: 50px;
  heigth: 50px;
  margin-right: 50px;
`;

const StyledText = styled(Text)`
  margin-right: 50px;
`;

export default function Alarm({ type, alarm, date = "4시간 전" }) {
  switch (type) {
    case "COMMENT":
      return (
        <Wrapper>
          <StyledImage src="https://picsum.photos/200" />
          <StyledText>{alarm} 님이 댓글을 남겼습니다.</StyledText>
          <StyledText style={{ color: "#d9d9d9" }}>{date}</StyledText>
        </Wrapper>
      );
    case "LIKE":
      return (
        <Wrapper>
          <StyledImage src="https://picsum.photos/200" />
          <StyledText>{alarm} 님이 좋아요를 눌렀습니다.</StyledText>
          <StyledText style={{ color: "#d9d9d9" }}>{date}</StyledText>
        </Wrapper>
      );
    case "FOLLOW":
      return (
        <Wrapper>
          <StyledImage src="https://picsum.photos/200" />
          <StyledText>{alarm} 님이 당신을 팔로우 했습니다.</StyledText>
          <StyledText style={{ color: "#d9d9d9" }}>{date}</StyledText>
        </Wrapper>
      );
    case "MESSAGE":
      return (
        <Wrapper>
          <StyledImage src="https://picsum.photos/200" />
          <StyledText>{alarm} 님이 메시지를 보냈습니다.</StyledText>
          <StyledText style={{ color: "#d9d9d9" }}>{date}</StyledText>
        </Wrapper>
      );
    default:
      return <Wrapper />;
  }
}

Alarm.propTypes = {
  alarm: PropTypes.string,
  date: PropTypes.string,
  type: PropTypes.oneOf(["COMMENT", "LIKE", "FOLLOW", "MESSAGE"]),
};
