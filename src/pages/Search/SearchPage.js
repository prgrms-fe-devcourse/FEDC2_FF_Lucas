import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UpperHeader from "../../components/Header/UpperHeader";
import Card from "../../components/Card/Card";
import UserSearch from "../../components/UserSearch/UserSearch";
import Text from "../../components/Text/Text";
import Footer from "../../components/Footer/Footer";
import Modal from "../../components/Modal/Modal";
import DetailPage from "../../components/DetailPage/DetailPage";
import useSearch from "../../utils/apis/search";
import { useGetPostByPostId } from "../../utils/apis/posts";
import parseJsonStringToObject from "../../utils/parseJsonString";

const Wrapper = styled.div`
  margin: 50px 15%;
`;
const UserWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 10px;
`;
const PostWrapper = styled.div`
  display: grid;
  margin-top: 10px;
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;
  grid-column-gap: 20px;
  gap: 20px;
`;
const StyledText = styled(Text)`
  margin-left: 20px;
  margin: 50px 0;
`;
export default function SearchPage() {
  let query = "";
  const navigate = useNavigate();
  const location = useLocation();
  query = location.state.resultlist;
  const { data = [] } = useSearch(query);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [selectedPost, setSeletedPost] = useState(null);
  const [postArr, setPostArr] = useState([]);
  const { data: postData } = useGetPostByPostId({ postId: selectedPostId });

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

  const onClickPost = postId => {
    setSelectedPostId(postId);
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (!postData) return;
    const { title, content } = parseJsonStringToObject({
      jsonString: postData.title,
      defaultKey: "title",
      restKeys: ["content"],
    });
    setSeletedPost({ ...postData, title, content });
  }, [postData]);

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

  return (
    <>
      <UpperHeader />
      <Wrapper>
        <StyledText block size="25px" strong>
          &quot;{query}&quot; ?????? ???????????????.
        </StyledText>
        <StyledText block size="25px" strong>
          ?????????
        </StyledText>
        <UserWrapper>
          {postArr.map(e =>
            e !== undefined && e.role ? (
              <UserSearch
                userName={e.fullName}
                key={e._id}
                profileImg={e.image}
                onClick={() =>
                  navigate("/profile", { state: { authorId: e._id } })
                }
              />
            ) : null,
          )}
        </UserWrapper>
      </Wrapper>
      <Wrapper>
        <StyledText block size="25px" strong>
          ?????????
        </StyledText>
        <PostWrapper>
          {postArr.map(e =>
            e !== undefined && e.role === undefined ? (
              <Card
                width={300}
                commentCount={e.comments.length}
                date={e.createdAt.slice(0, 10)}
                likeCount={e.likes.length}
                src={e.image}
                profileImg={e.author.image}
                title={e.title}
                key={e._id}
                userName
                onClick={() => onClickPost(e._id)}
              />
            ) : null,
          )}
        </PostWrapper>
      </Wrapper>
      <Modal
        width="80%"
        height="80%"
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
}
