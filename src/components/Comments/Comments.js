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
import { useCreateAlarm } from "../../utils/apis/notifications";
import DEFAULT_PROFILE_IMAGE_URL from "../../utils/constants";

const CommentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
  min-height: 200px;
`;

const CommentWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
  &:hover .comments-delete-icon {
    display: block;
  }

  .comments-delete-icon {
    display: none;
  }
`;

const InputContainer = styled.div`
  display: flex;
  margin-top: auto;
  align-items: center;
  height: 32px;
`;

const Comments = ({ comments, postId, onHandlePost, userId }) => {
  const [inputValue, setInputValue] = useState("");
  const [commentId, setCommentId] = useState("");
  const { state, storedToken } = useGlobalContext();

  const onSubmit = async () => {
    if (!inputValue) return;

    try {
      const { data } = await createComment(inputValue, postId, storedToken);
      setCommentId(data._id);
      onHandlePost({
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
      onHandlePost({
        changedTarget: {
          comments: comments.filter(comment => comment._id !== id),
        },
        postId,
      });
    } catch (e) {
      console.error(e);
    }
  };

  useCreateAlarm({
    token: storedToken,
    notificationType: "COMMENT",
    notificationTypeId: commentId,
    userId,
    postId,
  });

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
            src={comment.author.image || DEFAULT_PROFILE_IMAGE_URL}
            width={30}
            height={30}
            style={{ borderRadius: "50%", marginRight: "10px" }}
          />
          <Text block strong style={{ marginRight: "5px", flexShrink: 0 }}>
            {comment.author.fullName}
          </Text>
          <Text block style={{ flexGrow: "1", wordBreak: "break-word" }}>
            {comment.comment}
          </Text>
          {state.userInfo && state.userInfo.user._id === comment.author._id ? (
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
      {state.userInfo && (
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
      )}
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
  userId: PropTypes.string,
  onHandlePost: PropTypes.func,
};

export default React.memo(Comments);
