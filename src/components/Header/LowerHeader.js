import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import Common from "../../styles/common";
import { useGetChannelList } from "../../utils/apis/channels";

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
  cursor: pointer;
`;

function LowerHeader({ onChangeChannel }) {
  const [categoryList, setCategoryList] = useState([]);
  const { data } = useGetChannelList();
  useEffect(() => {
    setCategoryList(data);
  }, [data]);
  return (
    <Header>
      <Wrapper key="defulat_channel" onClick={() => onChangeChannel()}>
        전체
      </Wrapper>
      {categoryList
        ? categoryList.map(e => (
            <Wrapper key={e._id} onClick={() => onChangeChannel(e._id)}>
              {e.name}
            </Wrapper>
          ))
        : null}
    </Header>
  );
}

LowerHeader.propTypes = {
  onChangeChannel: PropTypes.func,
};

export default LowerHeader;
