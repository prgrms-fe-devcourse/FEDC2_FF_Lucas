import PropTypes from "prop-types";
import styled from "@emotion/styled";
import Image from "../Image/Image";
import DEFAULT_PROFILE_IMAGE_URL from "../../utils/constants";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #d9d9d9;
  width: 45%;
  height: 100px;
  margin: 10px;
  padding: 10px;
  border-radius: 5px;
`;
const InnerWrapper = styled.div`
  text-align: center;
  width: 100%;
`;
const StyledImage = styled(Image)`
  width: 100px;
  height: 100px;
  border-radius: 100%;
`;
export default function UserSearch({
  userName = "루카스",
  profileImg = DEFAULT_PROFILE_IMAGE_URL,
  onClick,
}) {
  return (
    <Wrapper onClick={onClick}>
      <StyledImage src={profileImg} />
      <InnerWrapper>{userName}</InnerWrapper>
    </Wrapper>
  );
}

UserSearch.propTypes = {
  userName: PropTypes.string,
  profileImg: PropTypes.string,
  onClick: PropTypes.func,
};
