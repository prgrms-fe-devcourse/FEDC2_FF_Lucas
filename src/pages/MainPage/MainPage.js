// import PropTypes from "prop-types";
import styled from "@emotion/styled";
import UpperHeader from "../../components/Header/UpperHeader";
import LowerHeader from "../../components/Header/LowerHeader";
import Carousel from "../../components/Carousel/Carousel";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import Footer from "../../components/Footer/Footer";

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

  return (
    <>
      <Header>
        <UpperHeader />
        <LowerHeader />
      </Header>
      <Main>
        <Carousel second={5000} height={300} />
        <ContentDiv>
          {/* {postArr.map(e => (
            <Card
              width={250}
              title={e.title}
              likeCount={e.likes}
              commentCount={e.comments.length}
              date={e.createdAt}
            />
          ))} */}
          <StyledCard title="0" width={250} />
          <StyledCard title="1" width={250} />
          <StyledCard title="2" width={250} />
          <StyledCard title="3" width={250} />
          <StyledCard title="4" width={250} />
          <StyledCard title="5" width={250} />
          <StyledCard title="6" width={250} />
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
          +
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
          🠕
        </Button>
      </Main>
      <Footer />
    </>
  );
}

// MainPage.propTypes = {
//   postArr: PropTypes.arrayOf(PropTypes.string),
// };
