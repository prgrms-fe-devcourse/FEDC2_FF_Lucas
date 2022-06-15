import { useState } from "react";
import DetailPage from "../../components/DetailPage/DetailPage";
import Modal from "../../components/Modal/Modal";
import Button from "../../components/Button/Button";

export default {
  title: "component/DetailPage",
  component: DetailPage,
  argTypes: {},
};

export const Default = args => {
  const [visible, setVisible] = useState(false);
  const DUMMY_DATA = {
    likes: ["123", "456", "789"],
    comments: ["asdf", "hello", "world"],
    _id: "123",
    title: "Title Test",
    author: {
      nickname: "author",
    },
    createdAt: "2022-06-14",
    updatedAt: "2022-06-22",
    content: "소개팅으로 이런 룩은 어떤가요..?? 피드백 부탁드립니다",
  };
  return (
    <div style={{ height: "2000px" }}>
      <Button onClick={() => setVisible(true)}>Show</Button>
      <Modal width="80%" visible={visible} onClose={() => setVisible(false)}>
        <DetailPage {...args} post={DUMMY_DATA} />
      </Modal>
    </div>
  );
};
