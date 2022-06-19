import PropTypes from "prop-types";
import { useState } from "react";
import styled from "@emotion/styled";
import { Heart } from "react-feather";
import Text from "../Text/Text";

const LikesContainer = styled.div`
  width: 40px;
  height: 40px;
  align-self: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  border: 1px solid #ddd;
  padding: 5px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    border: 1px solid red;
  }
`;

const Likes = ({ likes }) => {
  const [likeState, setLikeState] = useState(false);
  return (
    <LikesContainer onClick={() => setLikeState(!likeState)}>
      <Heart size={30} color="red" fill={likeState ? "red" : "white"} />
      <Text size={15} color="#333" strong>
        {likes.length}
      </Text>
    </LikesContainer>
  );
};

Likes.propTypes = {
  likes: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
};

export default Likes;
