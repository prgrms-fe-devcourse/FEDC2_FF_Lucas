import PropTypes from "prop-types";
import React, { useState } from "react";
import { Trash2 as DeleteIcon } from "react-feather";
import styled from "@emotion/styled";
import Input from "../Input/Input";
import Image from "../Image/Image";
import Text from "../Text/Text";
import Button from "../Button/Button";
import { useGlobalContext } from "../../store/GlobalProvider";
import { createComment, deleteComment } from "../../utils/apis/comments";

const CommentsContainer = styled.div`
  overflow: auto;
  min-height: 70px;
`;

const CommentWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 5px 0;
  &:hover .comments-delete-icon {
    display: block;
  }

  .comments-delete-icon {
    display: none;
  }
`;

const InputContainer = styled.div`
  display: flex;
  margin-top: 10px;
  align-items: center;
  height: 32px;
`;

const Comments = ({ comments, postId, handlePosts }) => {
  const [inputValue, setInputValue] = useState("");
  const { state, storedToken } = useGlobalContext();

  const onSubmit = async () => {
    if (!inputValue) return;

    try {
      const { data } = await createComment(inputValue, postId, storedToken);
      handlePosts({
        changedTarget: { comments: comments.concat(data) },
        postId,
      });
      setInputValue("");
    } catch (e) {
      console.error(e);
    }
  };

  const onDelete = async id => {
    try {
      await deleteComment(id, storedToken);
      handlePosts({
        changedTarget: {
          comments: comments.filter(comment => comment._id !== id),
        },
        postId,
      });
    } catch (e) {
      console.error(e);
    }
  };

  const onKeyPress = e => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  return (
    <CommentsContainer>
      <Text size={18} strong block>
        댓글 ({comments.length})
      </Text>
      {comments.map(comment => (
        <CommentWrapper key={comment._id}>
          <Image
            src="https://picsum.photos/100"
            width={30}
            height={30}
            style={{ borderRadius: "50%", marginRight: "10px" }}
          />
          <Text block style={{ flexGrow: "1" }}>
            {comment.comment}
          </Text>
          {state.userInfo.user._id === comment.author._id ? (
            <DeleteIcon
              className="comments-delete-icon"
              style={{
                justifySelf: "flex-end",
                flexShrink: "0",
                cursor: "pointer",
              }}
              color="red"
              size={18}
              onClick={() => onDelete(comment._id)}
            />
          ) : null}
        </CommentWrapper>
      ))}
      <InputContainer>
        <Input
          type="text"
          name="comment"
          wrapperStyles={{
            flexGrow: "1",
            marginRight: "10px",
          }}
          inputStyles={{
            backgroundColor: "transparent",
            padding: "5px 10px",
            fontSize: "16px",
            fontWeight: "normal",
          }}
          onChange={e => setInputValue(e.target.value)}
          onKeyPress={onKeyPress}
          onSubmit={onSubmit}
          value={inputValue}
        />
        <Button
          fontSize="14px"
          height="100%"
          width="inherit"
          style={{ padding: "5px 10px", flexShrink: "0" }}
          onClick={onSubmit}
        >
          등록
        </Button>
      </InputContainer>
    </CommentsContainer>
  );
};

Comments.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      comment: PropTypes.string,
      author: PropTypes.shape({
        fullName: PropTypes.string,
      }),
      post: PropTypes.string,
      createdAt: PropTypes.string,
      updatedAt: PropTypes.string,
    }),
  ),
  postId: PropTypes.string,
  handlePosts: PropTypes.func,
};

export default React.memo(Comments);
