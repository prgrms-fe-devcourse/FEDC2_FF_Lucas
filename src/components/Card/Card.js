import PropTypes from "prop-types";
import { Heart, MessageSquare } from "react-feather";
import styled from "@emotion/styled";
import Image from "../Image/Image";
import Text from "../Text/Text";
import DEFAULT_PROFILE_IMAGE_URL from "../../utils/constants";

const Wrapper = styled.div`
  border: 1px solid #d9d9d9;
  display: flex;
  flex-direction: column;
  height: fit-content;
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
  src = "https://picsum.photos/200",
  profileImg = DEFAULT_PROFILE_IMAGE_URL,
  date = "22.06.13",
  userName = "루카스팀",
  title = "fashion feedback",
  commentCount = 36,
  likeCount = 5,
  width = 300,
  ...props
}) {
  return (
    <Wrapper style={{ width: `${width}px` }} {...props}>
      <div
        style={{
          width: "100%",
          height: "300px",
          backgroundImage: `url(${src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <InfoWrapper>
        <UserWrapper>
          <Image
            src={profileImg}
            width="40px"
            height="40px"
            style={{ borderRadius: "100%" }}
          />
          <Text block strong style={{ flexGrow: "1" }}>
            {userName}
          </Text>
          <Text block size="13px">
            {date}
          </Text>
        </UserWrapper>
        <DescriptionWrapper>
          <Text
            block
            style={{
              lineHeight: "25px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
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
  profileImg: PropTypes.string,
  date: PropTypes.string,
  userName: PropTypes.string,
  title: PropTypes.string,
  commentCount: PropTypes.number,
  likeCount: PropTypes.number,
};
