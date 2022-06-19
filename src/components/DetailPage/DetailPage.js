import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { Heart } from "react-feather";
import Image from "../Image/Image";
import Text from "../Text/Text";
import Input from "../Input/Input";
import Likes from "../Likes/Likes";

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
  flex-grow: 2;
  color: #333;
  font-size: 14px;
`;

const CommentContainer = styled.div``;

const DetailPage = ({ post }) => {
  const imageProps = {
    src: "https://picsum.photos/500",
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
        <Likes likes={post.likes} />
        <hr style={{ color: "#bbb", width: "100%", margin: "15px 0" }} />
        <CommentContainer>
          <Text size={18} strong>
            댓글 ({post.comments.length})
          </Text>
          {post.comments.map(comment => (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                margin: "5px 0",
              }}
            >
              <Image
                src="https://picsum.photos/100"
                width={30}
                height={30}
                style={{ borderRadius: "50%", marginRight: "10px" }}
              />
              <Text block key={comment}>
                {comment}
              </Text>
            </div>
          ))}
          <Input
            type="text"
            wrapperStyles={{ height: "32px", marginTop: "10px" }}
            inputStyles={{
              backgroundColor: "transparent",
              padding: "5px 10px",
              fontSize: "16px",
              fontWeight: "normal",
            }}
          />
        </CommentContainer>
      </ContentContainer>
    </PageContainer>
  );
};

DetailPage.propTypes = {
  post: PropTypes.shape({
    likes: PropTypes.arrayOf(PropTypes.string),
    comments: PropTypes.arrayOf(PropTypes.string),
    _id: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
    author: PropTypes.shape({
      fullName: PropTypes.string,
    }),
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
  }),
};

export default DetailPage;
