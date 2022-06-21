import styled from "@emotion/styled";
import { useEffect } from "react";
import Alarm from "../../components/Alarm/Alarm";
import Button from "../../components/Button/Button";
import UpperHeader from "../../components/Header/UpperHeader";
import Text from "../../components/Text/Text";
import { useGlobalContext } from "../../store/GlobalProvider";
import { useGetAlarmList, useReadAlarm } from "../../utils/apis/notifications";

const Wrapper = styled.div`
  margin: 0 20%;
`;
export default function AlarmPage() {
  const { state, storedToken } = useGlobalContext();
  const { data, refetch: getAlarm } = useGetAlarmList({ token: storedToken });
  useEffect(() => {
    getAlarm();
  });

  function difference(date) {
    let statement = "";
    const today = new Date();
    const day = date;
    const newDate = new Date(day);
    let sub = today - newDate;
    sub /= 1000 * 60;
    if (sub < 60) {
      sub = Math.floor(sub);
      statement = `${sub} 분 전`;
    } else if (sub >= 60 && sub <= 1440) {
      sub = Math.floor(sub / 60);
      statement = `${sub} 시간 전`;
    } else {
      sub = Math.floor(sub);
      statement = `${sub} 일 전`;
    }
    return statement;
  }

  const { refetch } = useReadAlarm({ token: storedToken });
  const readAlarm = () => {
    refetch();
    getAlarm();
  };
  useEffect(() => {}, [data]);

  return (
    <>
      <UpperHeader />
      <Wrapper>
        {data && data.length !== 0 ? (
          data.map(e =>
            e.author.fullName !== state.userInfo.user.fullName ? (
              <Alarm
                type={e.comment || e.comment === null ? "COMMENT" : "LIKE"}
                alarm={e.author.fullName}
                date={difference(e.createdAt)}
                key={e.createdAt}
                style={e.seen ? { opacity: "60%" } : {}}
              />
            ) : null,
          )
        ) : (
          <div style={{ paddingTop: "100px", textAlign: "center" }}>
            <Text size="30px" strong>
              알람이 없습니다.
            </Text>
          </div>
        )}
        <Button
          height="50px"
          style={{ marginTop: "100px", justifyContent: "center" }}
          onClick={readAlarm}
        >
          모두 읽기
        </Button>
      </Wrapper>
    </>
  );
}
