import styled from "@emotion/styled";
import { useCallback, useEffect, useState } from "react";
import { Edit, ArrowUp } from "react-feather";
import { useNavigate } from "react-router-dom";
import UpperHeader from "../../components/Header/UpperHeader";
import LowerHeader from "../../components/Header/LowerHeader";
import Carousel from "../../components/Carousel/Carousel";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import Footer from "../../components/Footer/Footer";
import Modal from "../../components/Modal/Modal";
import DetailPage from "../../components/DetailPage/DetailPage";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import { useGetAllPost, useGetPosts } from "../../utils/apis/posts";
import { useGlobalContext } from "../../store/GlobalProvider";
import parseJsonStringToObject from "../../utils/parseJsonString";

const ContentDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-items: center;
  padding-top: 50px;
  margin: 0 15%;
  grid-auto-rows: 1fr;
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

const Header = styled.header`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
`;
const Main = styled.main``;

const StyledCard = styled(Card)`
  border-radius: 5px;
  gap: 10px;
  margin-bottom: 10px;
  min-width: 100px;
  box-sizing: border-box;
  margin-bottom: 30px;
  cursor: pointer;
`;

export default function MainPage() {
  const navigate = useNavigate();
  const moveToTop = () => {
    document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
  };

  const LIMIT = 8;
  const [channelId, setChannelId] = useState("");
  const [postArr, setPostArr] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSeletedPost] = useState(null);
  const [offset, setOffset] = useState(0);

  const { state } = useGlobalContext();

  const { data } = useGetPosts({ channelId, offset, limit: LIMIT });
  const { data: total } = useGetPosts({ channelId, key: "total" });
  const { data: allPost, isLoading, refetch, remove } = useGetAllPost();

  const onIntersecting = useCallback(() => {
    if (!channelId || postArr.length >= total.length) {
      return;
    }
    setOffset(prevOffset => prevOffset + LIMIT);
  }, [setOffset, postArr, total, channelId]);

  const { setLastIntersectingImage } = useInfiniteScroll({
    onIntersecting,
    options: { threshold: 0.3 },
  });

  useEffect(() => {
    if (!isLoading) {
      const parsed = allPost.map(post => {
        const { title, content } = parseJsonStringToObject({
          jsonString: post.title,
          defaultKey: "title",
          restKeys: ["content"],
        });

        return { ...post, title, content };
      });

      setPostArr(parsed);
    }
  }, [allPost]);

  useEffect(() => {
    // TODO : data??? ???????????? ?????? ???????????? ?????? ??????. ?????? ????????? ???????????? ?????? ???????????? ?????????
    if (!data || postArr.find(post => post._id === data[0]._id)) {
      return;
    }
    const parsed = data.map(post => {
      const { title, content } = parseJsonStringToObject({
        jsonString: post.title,
        defaultKey: "title",
        restKeys: ["content"],
      });

      return { ...post, title, content };
    });

    setPostArr([...postArr, ...parsed]);
  }, [data]);

  const onHandlePost = ({ changedTarget, postId }) => {
    const tempPost = postArr.map(post =>
      post._id === postId ? { ...post, ...changedTarget } : post,
    );
    setSeletedPost(tempPost.find(post => post._id === postId));
    setPostArr(tempPost);
  };

  const onDeletePost = postId => {
    setSeletedPost(null);
    setIsModalOpen(false);
    setPostArr(postArr.filter(post => post._id !== postId));
  };

  const onChangeChannel = id => {
    if (id === channelId) return;
    moveToTop();
    setPostArr([]);
    setOffset(0);
    if (!id) {
      remove();
      refetch();
    }
    setChannelId(id);
  };

  return (
    <>
      <Header>
        <UpperHeader />
        <LowerHeader onChangeChannel={onChangeChannel} />
      </Header>
      <Main>
        <Carousel second={5000} height={250} />
        <ContentDiv>
          {postArr.map((e, index) => {
            const isLast = index === postArr.length - 1;
            return (
              <div ref={isLast ? setLastIntersectingImage : null} key={e._id}>
                <StyledCard
                  width={250}
                  src={e.image}
                  profileImg={e.author.image}
                  title={e.title}
                  content={e.content}
                  userName={e.author.fullName}
                  likeCount={e.likes.length}
                  commentCount={e.comments.length}
                  date={e.createdAt.slice(0, 10)}
                  key={e._id}
                  onClick={() => {
                    setIsModalOpen(true);
                    setSeletedPost(e);
                  }}
                />
              </div>
            );
          })}
        </ContentDiv>
        {state.userInfo ? (
          <Button
            width="50px"
            height="50px"
            borderRadius="100%"
            style={{
              position: "fixed",
              top: "88%",
              right: "3%",
            }}
            onClick={() => navigate("/write", { replace: true })}
          >
            <Edit />
          </Button>
        ) : null}
        <Button
          onClick={moveToTop}
          width="50px"
          height="50px"
          borderRadius="100%"
          style={{
            position: "fixed",
            top: "80%",
            right: "3%",
          }}
        >
          <ArrowUp />
        </Button>
      </Main>

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
