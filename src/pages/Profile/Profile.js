import { Link } from "react-router-dom";
// import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import Common from "../../styles/common";
import UpperHeader from "../../components/Header/UpperHeader";
import Image from "../../components/Image/Image";
import Text from "../../components/Text/Text";
import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";
import Footer from "../../components/Footer/Footer";
import Modal from "../../components/Modal/Modal";
import DetailPage from "../../components/DetailPage/DetailPage";
import { useGetPostsByAuthorId } from "../../utils/apis/posts";
import { useGlobalContext } from "../../store/GlobalProvider";
import parseJsonStringToObject from "../../utils/parseJsonString";

const Header = styled.header`
  position: sticky;
`;

const Main = styled.main`
  text-align: center;
`;

const FlexDiv = styled.div`
  display: flex;
  justify-content: center;
  padding: 1% 0;
`;

const GridDiv = styled.div`
  display: grid;
  padding: 0 5%;
`;

const ContentDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(auto-filt, minmax(300px, 4fr));
  justify-items: center;
  padding-top: 50px;
  margin: 0 15%;
  @media (max-width: 1400px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 780px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const StyledCard = styled(Card)`
  border-radius: 5px;
  gap: 10px;
  min-width: 100px;
  box-sizing: border-box;
  margin-left: 30px;
  margin-bottom: 30px;
`;

const Profile = () => {
  const { state } = useGlobalContext();
  const authorId = state.userInfo.user._id;
  const { data } = useGetPostsByAuthorId({ authorId });
  const userInfoObj =
    state.userInfo.user.username && JSON.parse(state.userInfo.user.username);

  const [postArr, setPostArr] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSeletedPost] = useState(null);

  useEffect(() => {
    if (!data) return;
    const parsed = data.map(post => {
      const { title, content } = parseJsonStringToObject({
        jsonString: post.title,
        defaultKey: "title",
        restKeys: ["content"],
      });

      return { ...post, title, content };
    });

    setPostArr(parsed);
  }, [data]);

  const onHandlePost = ({ changedTarget, postId }) => {
    const tempPost = postArr.map(post =>
      post._id === postId ? { ...post, ...changedTarget } : post,
    );
    setSeletedPost({ ...selectedPost, ...changedTarget });
    setPostArr(tempPost);
  };

  const onDeletePost = postId => {
    setSeletedPost(null);
    setIsModalOpen(false);
    setPostArr(postArr.filter(post => post._id !== postId));
  };

  return (
    <>
      <Header>
        <UpperHeader />
      </Header>
      <Main>
        <Image
          src="https://picsum.photos/200"
          style={{
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            overflow: "hidden",
            margin: "2% 0",
          }}
        />
        <FlexDiv>
          <GridDiv>
            <Text bold="true" size={`${Common.fontSize.fs16}`}>
              {state.userInfo.user.posts.length}
            </Text>
            <Text bold="true" size={`${Common.fontSize.fs16}`}>
              게시물
            </Text>
          </GridDiv>
          <GridDiv>
            <Text bold="true" size={`${Common.fontSize.fs16}`}>
              {state.userInfo.user.followers.length}
            </Text>
            <Text bold="true" size={`${Common.fontSize.fs16}`}>
              팔로워
            </Text>
          </GridDiv>
          <GridDiv>
            <Text bold="true" size={`${Common.fontSize.fs16}`}>
              {state.userInfo.user.following.length}
            </Text>
            <Text bold="true" size={`${Common.fontSize.fs16}`}>
              팔로잉
            </Text>
          </GridDiv>
        </FlexDiv>

        <FlexDiv>
          <Text
            bold="true"
            size={`${Common.fontSize.fs16}`}
            color="rgba(1,1,1,0.5)"
          >
            닉네임
          </Text>
          <span style={{ margin: "1%" }} />
          <Text bold="true" size={`${Common.fontSize.fs16}`}>
            {state.userInfo.user.fullName}
          </Text>

          {state.userInfo.user.username && (
            <>
              <span style={{ margin: "0 5%" }} />
              <Text
                bold="true"
                size={`${Common.fontSize.fs16}`}
                color="rgba(1,1,1,0.5)"
              >
                체형
              </Text>
              <span style={{ margin: "1%" }} />
              <Text bold="true" size={`${Common.fontSize.fs16}`}>
                {userInfoObj.height}cm, {userInfoObj.weight}kg
              </Text>
            </>
          )}
        </FlexDiv>

        {state.userInfo ? (
          <Link to="/update-profile">
            <Button width="50%" height="50px" margin="1% 0">
              프로필 편집
            </Button>
          </Link>
        ) : (
          <Button width="50%" height="50px" margin="1% 0">
            follow +
          </Button>
        )}

        <ContentDiv>
          {postArr && postArr.length > 0
            ? postArr.map(e => (
                <StyledCard
                  width={250}
                  title={e.title}
                  content={e.content}
                  likeCount={e.likes.length}
                  commentCount={e.comments.length}
                  src={e.image}
                  date={e.createdAt.slice(0, 10)}
                  key={e._id}
                  onClick={() => {
                    setIsModalOpen(true);
                    setSeletedPost(e);
                  }}
                />
              ))
            : null}
        </ContentDiv>
        {postArr && postArr.length === 0 && (
          <Text
            block
            style={{
              fontSize: `${Common.fontSize.fs16}`,
              margin: "30px auto",
            }}
          >
            🥲 게시물이 존재하지 않습니다!
          </Text>
        )}
      </Main>
      <Modal
        width="80%"
        visible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        {selectedPost ? (
          <DetailPage
            post={selectedPost}
            onHandlePost={onHandlePost}
            onDeletePost={onDeletePost}
          />
        ) : (
          <>No Post</>
        )}
      </Modal>
      <Footer />
    </>
  );
};

Profile.propTypes = {
  // authorId: PropTypes.string,
};

export default Profile;
