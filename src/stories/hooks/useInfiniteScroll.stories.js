import styled from "@emotion/styled";
import { useCallback, useEffect, useState } from "react";
import { useGetPosts } from "../../utils/apis/posts";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";

export default {
  title: "Hook/useInfiniteScroll",
  component: useInfiniteScroll,
  argTypes: {},
};

const Card = styled.div`
  width: 300px;
  height: 300px;
  border: solid 2px;
`;

export const Default = () => {
  const [offset, setOffset] = useState(0);
  const [result, setResult] = useState([]);
  const limit = 4;
  const channelId = "62aac619584e72755a79fcfc";
  const onIntersecting = useCallback(
    () => setOffset(offset + limit),
    [setOffset, offset],
  );
  const { setLastIntersectingImage } = useInfiniteScroll({
    onIntersecting,
    options: { threshold: 0.3 },
  });

  const { data } = useGetPosts({
    channelId,
    offset,
    limit,
  });

  useEffect(() => {
    if (!data) {
      return;
    }

    setResult([...result, ...data]);
  }, [data]);

  return (
    <>
      <div style={{ height: "400px", backgroundColor: "red" }}>박스</div>
      <ul>
        {result.length > 0 &&
          result.map(({ title, _id }, index) =>
            index === result.length - 1 ? (
              <li ref={setLastIntersectingImage} key={_id}>
                <Card>{title}</Card>
              </li>
            ) : (
              <li key={_id}>
                <Card>{title}</Card>
              </li>
            ),
          )}
      </ul>
    </>
  );
};
