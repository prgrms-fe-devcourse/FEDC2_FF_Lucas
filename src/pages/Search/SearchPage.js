import styled from "@emotion/styled";
import { useLocation } from "react-router-dom";
import UpperHeader from "../../components/Header/UpperHeader";
import Card from "../../components/Card/Card";
import UserSearch from "../../components/UserSearch/UserSearch";
import Text from "../../components/Text/Text";
import Footer from "../../components/Footer/Footer";
import useSearch from "../../utils/apis/search";

const Wrapper = styled.div`
  margin: 50px 15%;
`;
const UserWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 10px;
`;
const PostWrapper = styled.div`
  display: grid;
  margin-top: 10px;
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;
  grid-column-gap: 20px;
  gap: 20px;
`;
const StyledText = styled(Text)`
  margin-left: 20px;
  margin: 50px 0;
`;
export default function SearchPage() {
  let query = "";
  const location = useLocation();
  query = location.state.resultlist;
  const { data = [] } = useSearch(query);

  return (
    <>
      <UpperHeader />
      <Wrapper>
        <StyledText block size="25px" strong>
          &quot;{query}&quot; 검색 결과입니다.
        </StyledText>
        <StyledText block size="25px" strong>
          사용자
        </StyledText>
        <UserWrapper>
          {data.map(e =>
            e !== undefined && e.role ? (
              <UserSearch userName={e.fullName} key={e._id} />
            ) : null,
          )}
        </UserWrapper>
      </Wrapper>
      <Wrapper>
        <StyledText block size="25px" strong>
          스타일
        </StyledText>
        <PostWrapper>
          {data.map(e =>
            e !== undefined && e.role === undefined ? (
              <Card
                width="300"
                commentCount={e.comments.length}
                date={e.createdAt.slice(0, 10)}
                likeCount={e.likes.length}
                src={e.image}
                title={e.title}
                key={e._id}
                profileImg
                userName
              />
            ) : null,
          )}
        </PostWrapper>
      </Wrapper>
      <Footer />
    </>
  );
}
