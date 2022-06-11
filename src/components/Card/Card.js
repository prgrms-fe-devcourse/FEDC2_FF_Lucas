import PropTypes from "prop-types";
import { Heart, MessageSquare } from "react-feather";
import styled from "@emotion/styled";
import Image from "../Image/Image";
import Text from "../Text/Text";

const Wrapper = styled.div`
  border: 1px solid #d9d9d9;
  display: flex;
  flex-direction: column;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const UserWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  float: right;
  margin: 10px;
  gap: 10px;
`;
const DescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
`;
const SocialWrapper = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
  align-content: flex-end;
  gap: 5px;
`;

export default function Card({
  src,
  date,
  userName,
  title,
  commentCount,
  likeCount,
  width = 300,
}) {
  return (
    <Wrapper style={{ width: `${width}px` }}>
      <Image src={src} style={{ height: "auto" }} />
      <InfoWrapper>
        <UserWrapper>
          <Image src={src} width="40px" style={{ borderRadius: "100%" }} />
          <Text block="true" strong="bold" style={{ flexGrow: "1" }}>
            {userName}
          </Text>
          <Text block="true" size="13px">
            {date}
          </Text>
        </UserWrapper>
        <DescriptionWrapper>
          <Text block="true" style={{ lineHeight: "25px" }}>
            {title}
          </Text>
          <SocialWrapper>
            <MessageSquare />
            <Text style={{ paddingTop: "3px" }}>{commentCount}</Text>
            <Heart />
            <Text style={{ paddingTop: "3px" }}>{likeCount}</Text>
          </SocialWrapper>
        </DescriptionWrapper>
      </InfoWrapper>
    </Wrapper>
  );
}

Card.propTypes = {
  width: PropTypes.number,
  src: PropTypes.string,
  date: PropTypes.string,
  userName: PropTypes.string,
  title: PropTypes.string,
  commentCount: PropTypes.number,
  likeCount: PropTypes.number,
};