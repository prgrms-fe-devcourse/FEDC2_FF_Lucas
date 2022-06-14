// import PropTypes from "prop-types";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import UpperHeader from "../../components/Header/UpperHeader";
import LowerHeader from "../../components/Header/LowerHeader";
import Carousel from "../../components/Carousel/Carousel";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";

// const ContentDiv = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   //   justify-content: flex-start;
//   // justify-content: center;
//   //   align-content: space-around;
//   flex-direction: row;
//   border: 1px solid;
//   margin-top: 20px;
//   padding-top: 30px;
//   margin: 0 15%;
//   // gap: 10px;
// `;
const ContentDiv = styled.div`
  display: grid;
  margin-top: 20px;
  padding-top: 30px;
  margin: 0 15%;
  grid-template-columns: repeat(1fr, 4);
`;

const Footer = styled.footer`
  border: 1px solid black;
  margin-top: 50px;
  background-color: #f0f1f4;
  width: 100%;
`;

const StyledCard = styled(Card)`
  border: 1px solid red;
  margin: 20px;
`;
export default function MainPage({ postArr }) {
  return (
    <>
      <header>
        <UpperHeader />
        <LowerHeader />
      </header>
      <main>
        <Carousel second={5000} height={300} />
        <ContentDiv>
          {/* {postArr.map(e => (
            <Card
              title={e.title}
              likeCount={e.likes}
              commentCount={e.comments.length}
              date={e.createdAt}
            />
          ))} */}
          <StyledCard title="0" width={200} />
          <StyledCard title="1" width={200} />
          <StyledCard title="2" width={200} />
          <StyledCard title="3" width={200} />
          <StyledCard title="4" width={200} />
          <StyledCard title="5" width={200} />
          <StyledCard title="6" width={200} />
        </ContentDiv>
        <a href="#header">
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
        </a>
        <Button
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
      </main>
      <Footer>footer</Footer>
    </>
  );
}

MainPage.propTypes = {
  postArr: PropTypes.arrayOf(PropTypes.string),
};
