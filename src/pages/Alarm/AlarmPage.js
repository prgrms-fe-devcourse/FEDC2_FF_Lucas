import styled from "@emotion/styled";
import Alarm from "../../components/Alarm/Alarm";
import UpperHeader from "../../components/Header/UpperHeader";

const Wrapper = styled.div`
  margin: 0 20%;
`;
export default function AlarmPage() {
  return (
    <>
      <UpperHeader />
      <Wrapper>
        <Alarm type="MESSAGE" alarm="루카스" date="4시간 전" />
        <Alarm type="LIKE" alarm="루카스" date="4시간 전" />
        <Alarm type="COMMENT" alarm="루카스" date="4시간 전" />
        <Alarm type="FOLLOW" alarm="루카스" date="4시간 전" />
      </Wrapper>
    </>
  );
}
