import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import Common from "../../styles/common";
import UpperHeader from "../../components/Header/UpperHeader";
import Image from "../../components/Image/Image";
import Text from "../../components/Text/Text";
import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";
import Footer from "../../components/Footer/Footer";
import { useGlobalContext } from "../../store/GlobalProvider";

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
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding-top: 3%;
  margin: 0 15%;
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
              5
            </Text>
            <Text bold="true" size={`${Common.fontSize.fs16}`}>
              게시물
            </Text>
          </GridDiv>
          <GridDiv>
            <Text bold="true" size={`${Common.fontSize.fs16}`}>
              5
            </Text>
            <Text bold="true" size={`${Common.fontSize.fs16}`}>
              팔로워
            </Text>
          </GridDiv>
          <GridDiv>
            <Text bold="true" size={`${Common.fontSize.fs16}`}>
              5
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
            월드스타
          </Text>
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
            170cm, 70kg
          </Text>
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
          <StyledCard title="0" width={250} />
          <StyledCard title="1" width={250} />
          <StyledCard title="2" width={250} />
          <StyledCard title="3" width={250} />
          <StyledCard title="4" width={250} />
          <StyledCard title="5" width={250} />
          <StyledCard title="6" width={250} />
        </ContentDiv>
      </Main>
      <Footer />
    </>
  );
};

export default Profile;
