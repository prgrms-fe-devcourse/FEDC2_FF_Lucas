import React from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { Heart, Edit2 as EditIcon, Trash2 as DeleteIcon } from "react-feather";
import { useGlobalContext } from "../../store/GlobalProvider";
import Image from "../Image/Image";
import Text from "../Text/Text";
import Button from "../Button/Button";
import Likes from "../Likes/Likes";
import Comments from "../Comments/Comments";
import { deletePost } from "../../utils/apis/posts";
import DEFAULT_PROFILE_IMAGE_URL from "../../utils/constants";

const PageContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 50px 30px 20px;
  overflow: auto;
`;

const ContentContainer = styled.div`
  width: 45%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  border: 1px solid #ddd;

  & > div {
    padding-left: 10px;
    padding-right: 10px;
  }
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 7px 0;
`;

const PostInfoContainer = styled.div`
  height: 70%;
  flex-grow: 2;
  color: #333;
  font-size: 14px;
`;

const ButtonContainer = styled.div`
  display: flex;
  height: 40px;

  & button {
    width: 80px;
    height: 100%;
    font-size: 16px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;

    &:hover {
      background-color: transparent;
      color: black;
      border: 1px solid black;
    }
  }
  button + button {
    margin-left: 10px;
  }
`;

const DetailPage = ({ post, onHandlePost, onDeletePost }) => {
  const { state, storedToken } = useGlobalContext();
  const navigate = useNavigate();

  const imageProps = {
    src: post.image ?? "https://via.placeholder.com/300",
    placeholder: "https://via.placeholder.com/300",
    lazy: true,
    width: "100%",
    height: "calc(100% - 54px)",
  };

  const onDelete = async () => {
    try {
      await deletePost({ id: post._id, token: storedToken });
      alert("?????????????????????");
      onDeletePost(post._id);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <PageContainer>
        <ContentContainer>
          <ProfileContainer>
            <Image
              src={post.author.image || DEFAULT_PROFILE_IMAGE_URL}
              width={40}
              height={40}
              style={{ borderRadius: "50%", marginRight: "5px" }}
            />
            <Text strong color="#333">
              {post.author.fullName}
            </Text>
            <button
              type="button"
              style={{
                backgroundColor: "transparent",
                border: "1px solid #aaa",
                borderRadius: "10px",
                display: "flex",
                padding: "5px",
                width: "70px",
                height: "30px",
                justifyContent: "space-around",
                alignItems: "center",
                cursor: "pointer",
                marginLeft: "10px",
              }}
            >
              <Heart size={14} color="red" />
              <Text size={12}>?????????</Text>
            </button>
          </ProfileContainer>
          <Image {...imageProps} />
        </ContentContainer>
        <ContentContainer style={{ padding: "15px" }}>
          <Text size={32} strong style={{ lineHeight: "2.5rem" }}>
            {post.title}
          </Text>
          <hr style={{ color: "#bbb", width: "100%", margin: "15px 0" }} />
          <PostInfoContainer
            style={{ lineHeight: "1.5rem", overflowWrap: "break-word" }}
          >
            {post.content.split("\n").map(line => (
              <>
                {line}
                <br />
              </>
            ))}
          </PostInfoContainer>
          <Likes
            likes={post.likes}
            postId={post._id}
            onHandlePost={onHandlePost}
            userId={post.author._id}
          />
          <hr style={{ color: "#bbb", width: "100%", margin: "15px 0" }} />
          <Comments
            comments={post.comments}
            postId={post._id}
            onHandlePost={onHandlePost}
            userId={post.author._id}
          />
        </ContentContainer>
      </PageContainer>
      {state.userInfo && state.userInfo.user._id === post.author._id ? (
        <ButtonContainer>
          <Button
            backgroundColor="#5bc0de"
            color="white"
            onClick={() => navigate("/edit", { state: { post } })}
          >
            <EditIcon size={16} />
            ??????
          </Button>
          <Button backgroundColor="red" color="white" onClick={onDelete}>
            <DeleteIcon size={16} />
            ??????
          </Button>
        </ButtonContainer>
      ) : null}
    </>
  );
};

DetailPage.propTypes = {
  post: PropTypes.shape({
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
    _id: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
    author: PropTypes.shape({
      fullName: PropTypes.string,
      image: PropTypes.string,
      _id: PropTypes.string,
    }),
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
    image: PropTypes.string,
  }),
  onHandlePost: PropTypes.func,
  onDeletePost: PropTypes.func,
};

export default React.memo(DetailPage);
