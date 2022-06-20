import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { Heart } from "react-feather";
import Image from "../Image/Image";
import Text from "../Text/Text";
import Likes from "../Likes/Likes";
import Comments from "../Comments/Comments";

const PageContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 50px 30px;
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

const DetailPage = ({ post, handlePosts }) => {
  const imageProps = {
    src: post.image ?? "https://via.placeholder.com/300",
    placeholder: "https://via.placeholder.com/300",
    lazy: true,
    width: "100%",
  };

  return (
    <PageContainer>
      <ContentContainer>
        <ProfileContainer>
          <Image
            src="https://picsum.photos/100"
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
            <Text size={12}>팔로우</Text>
          </button>
        </ProfileContainer>
        <Image {...imageProps} />
      </ContentContainer>
      <ContentContainer style={{ padding: "15px" }}>
        <Text size={32} strong block>
          {post.title}
        </Text>
        <hr style={{ color: "#bbb", width: "100%", margin: "15px 0" }} />
        <PostInfoContainer>{post.content}</PostInfoContainer>
        <Likes likes={post.likes} postId={post._id} handlePosts={handlePosts} />
        <hr style={{ color: "#bbb", width: "100%", margin: "15px 0" }} />
        <Comments
          comments={post.comments}
          postId={post._id}
          handlePosts={handlePosts}
        />
      </ContentContainer>
    </PageContainer>
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
    }),
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
    image: PropTypes.string,
  }),
  handlePosts: PropTypes.func,
};

export default DetailPage;
