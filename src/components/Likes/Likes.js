import PropTypes from "prop-types";
import { useState, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { Heart } from "react-feather";
import Text from "../Text/Text";
import { useGlobalContext } from "../../store/GlobalProvider";
import { createLike, deleteLike } from "../../utils/apis/likes";

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

const Likes = ({ likes, postId, handleLikes }) => {
  const [currentUserLike, setCurrentUserLike] = useState(null);
  const { state, storedToken } = useGlobalContext();
  const likeCount = useRef(likes.length);

  useEffect(() => {
    if (!state.userInfo || !state.userInfo.user) return;

    const currentLike = likes.find(
      like => like.user === state.userInfo.user._id,
    );
    likeCount.current = likes.length;

    setCurrentUserLike(currentLike);
  }, [state, likes]);

  const toggleLike = async () => {
    if (currentUserLike) {
      try {
        await deleteLike(currentUserLike._id, storedToken);

        setCurrentUserLike(null);
        handleLikes(
          likes.filter(like => like._id !== currentUserLike._id),
          postId,
        );
        likeCount.current -= 1;
      } catch (e) {
        console.error(e);
      }
    } else {
      try {
        const { data } = await createLike(postId, storedToken);
        setCurrentUserLike(data);
        handleLikes(likes.concat(data), postId);
        likeCount.current += 1;
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <LikesContainer onClick={toggleLike}>
      <Heart size={30} color="red" fill={currentUserLike ? "red" : "white"} />
      <Text size={15} color="#333" strong>
        {likeCount.current}
      </Text>
    </LikesContainer>
  );
};

Likes.propTypes = {
  likes: PropTypes.arrayOf(
    PropTypes.shape({
      createdAt: PropTypes.string,
      post: PropTypes.string,
      updatedAt: PropTypes.string,
      user: PropTypes.string,
      __v: PropTypes.number,
      _id: PropTypes.string,
    }),
  ),
  postId: PropTypes.string,
  handleLikes: PropTypes.func,
};

export default Likes;
