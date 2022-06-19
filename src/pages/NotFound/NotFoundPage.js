import styled from "@emotion/styled";
import Footer from "../../components/Footer/Footer";
import UpperHeader from "../../components/Header/UpperHeader";
import Image from "../../components/Image/Image";
import Text from "../../components/Text/Text";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
`;

const MainWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 48px;
`;

export default function NotFoundPage() {
  return (
    <Wrapper>
      <Header>
        <UpperHeader />
      </Header>
      <MainWrapper>
        <Image src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=http%3A%2F%2Fcfile9.uf.tistory.com%2Fimage%2F2724CF4458C8D454155BCB" />
        <Text style={{ fontWeight: "700", fontSize: "70px" }}>
          이 페이지를 찾을 수 없습니다!
        </Text>
      </MainWrapper>
      <Footer />
    </Wrapper>
  );
}
