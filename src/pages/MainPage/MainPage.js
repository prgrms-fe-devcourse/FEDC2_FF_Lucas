import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { Edit, ArrowUp } from "react-feather";
import UpperHeader from "../../components/Header/UpperHeader";
import LowerHeader from "../../components/Header/LowerHeader";
import Carousel from "../../components/Carousel/Carousel";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import Footer from "../../components/Footer/Footer";
import Modal from "../../components/Modal/Modal";
import DetailPage from "../../components/DetailPage/DetailPage";
import { useGetPosts } from "../../utils/apis/posts";

const ContentDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding-top: 50px;
  margin: 0 15%;
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
  margin-left: 30px;
  margin-bottom: 30px;
`;

export default function MainPage() {
  const moveToTop = () => {
    document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
  };

  const [channelId, setChannelId] = useState("");
  const [postArr, setPostArr] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSeletedPost] = useState(null);
  const { data } = useGetPosts({ chanelId: channelId });
  useEffect(() => {
    setPostArr(data);
  }, [data]);
  return (
    <>
      <Header>
        <UpperHeader />
        <LowerHeader setChannelId={setChannelId} />
      </Header>
      <Main>
        <Carousel second={5000} height={300} />
        <ContentDiv>
          {postArr
            ? postArr.map(e => (
                <StyledCard
                  width={250}
                  title={e.title}
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
              ))
            : null}
        </ContentDiv>
        <Button
          width="50px"
          height="50px"
          borderRadius="100%"
          style={{
            position: "fixed",
            top: "90%",
            right: "3%",
          }}
        >
          <Edit />
        </Button>
        <Button
          onClick={moveToTop}
          width="50px"
          height="50px"
          borderRadius="100%"
          style={{
            position: "fixed",
            top: "82%",
            right: "3%",
          }}
        >
          <ArrowUp />
        </Button>
      </Main>

      <Modal
        width="80%"
        visible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        {selectedPost ? <DetailPage post={selectedPost} /> : null}
      </Modal>
      <Footer />
    </>
  );
}
