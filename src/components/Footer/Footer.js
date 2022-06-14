import styled from "@emotion/styled";
import Text from "../Text/Text";

const FooterWrapper = styled.footer`
  margin-top: 50px;
  background-color: #f0f1f4;
  padding: 50px;
  padding-left: 100px;
`;

export default function Footer() {
  return (
    <FooterWrapper>
      <Text block="true" size="15px" strong="true">
        주식회사 루카스 팀(Lucas Team)
      </Text>
      <br />
      <Text block="true" size="11px">
        대표자: 루카스 | 사업자 등록: 123-45-6789 | 사업자 등록 확인
      </Text>
      <br />
      <Text block="true" size="10px">
        주소: 서울 서초구 강남대로 327 2층 프로그래머스
      </Text>
      <br />
      <Text size="10px">개인정보 처리 방침 </Text>&ensp;
      <Text size="10px"> 서비스 이용 약관</Text>
    </FooterWrapper>
  );
}
