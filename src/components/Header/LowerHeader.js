import styled from "@emotion/styled";
import Common from "../../styles/common";

const Header = styled.div`
  background-color: ${Common.colors.secondaryColor};
  display: flex;
  justify-content: center;
  width: 100%;
  height: 60px;
`;

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  padding: 0 20px;
  color: white;
  &:hover {
    background-color: white;
    color: black;
  }
`;
function LowerHeader() {
  return (
    <Header>
      <Wrapper>실시간</Wrapper>
      <Wrapper>면접</Wrapper>
      <Wrapper>데이트</Wrapper>
      <Wrapper>출근</Wrapper>
      <Wrapper>일상</Wrapper>
      <Wrapper>운동</Wrapper>
      <Wrapper>기타</Wrapper>
      <Wrapper>자랑글</Wrapper>
    </Header>
  );
}

export default LowerHeader;
