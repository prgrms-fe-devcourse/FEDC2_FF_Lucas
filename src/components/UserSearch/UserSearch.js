import PropTypes from "prop-types";
import styled from "@emotion/styled";
import Image from "../Image/Image";

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
export default function UserSearch({ userName = "루카스" }) {
  return (
    <Wrapper>
      <StyledImage src="https://picsum.photos/200" />
      <InnerWrapper>{userName}</InnerWrapper>
    </Wrapper>
  );
}

UserSearch.propTypes = {
  userName: PropTypes.string,
};
