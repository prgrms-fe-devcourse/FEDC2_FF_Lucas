import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/Modal/Modal";
import Button from "../../components/Button/Button";
import UpperHeader from "../../components/Header/UpperHeader";
import ImageUpload from "../../components/ImageUpload/ImageUpload";
import Input from "../../components/Input/Input";
import useForm from "../../hooks/useForm";
import { useGlobalContext } from "../../store/GlobalProvider";
import Select from "../../components/Select/Select";
import { createPost } from "../../utils/apis/posts";
import Footer from "../../components/Footer/Footer";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin: 32px 15%;
`;

const Label = styled.label`
  display: block;
  flex-shrink: 0;
  font-size: 36px;
  font-weight: 700;
  line-height: 32px;
  cursor: pointer;
`;

const AddWrapper = styled.label`
  display: inline-flex;
  align-items: flex-end;
  gap: 24px;
`;

const StyledTextArea = styled.textarea`
  width: 100%;
  height: 240px;
  font-size: 36px;
  font-weight: 700;
  line-height: 32px;
  background-color: #d9d9d9;
  border-radius: 15px;
  border: none;
  resize: none;
  box-sizing: border-box;
`;

const SubmitWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 24px;
  width: 100%;
`;

const WritingPostPage = () => {
  const { state } = useGlobalContext();
  const navigate = useNavigate();
  const goMainPage = ({ replace = false }) => navigate("/", { replace });

  const { errors, handleChange, handleSubmit } = useForm({
    initialValues: {
      title: "",
      content: "",
      image: "",
      channelId: "",
    },
    onSubmit: async ({ title, content, channelId, event }) => {
      // TODO: content 칼럼도 전송하기
      console.log(`글 작성 등록\n제목: ${title}, 내용: ${content}\n `);
      const image = event.target.image.dataset.binaryImage;
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYyYWFiZDE3NTg0ZTcyNzU1YTc5ZmNjYiIsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSJ9LCJpYXQiOjE2NTU0NzkzODN9.Wmaor7H0SZ0Uu_Mm5tW7xDUwd9XHWHn1Qu8NniER0ew";

      // TODO: 전역상태의 token 사용하기
      // createPost({ title, image, channelId, token: state.userInfo.token });
      createPost({ title, image, channelId, token });
      goMainPage({ replace: true });
    },
    validate: ({ title, image, content, channelId }) => {
      const error = {};
      if (!title) {
        error.title = "제목을 입력해주세요!";
      }
      if (!image) {
        error.image = "사진을 등록해주세요!";
      }
      if (!content) {
        error.content = "내용을 입력해주세요!";
      }
      if (!channelId) {
        error.content = "카테고리를 선택해주세요";
      }
      return error;
    },
  });
  const [modalVisible, setModalVisible] = useState(false);
  const getSelectData = channels =>
    channels.map(({ name, _id }) => ({ label: name, value: _id }));

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      setModalVisible(true);

      return;
    }

    setModalVisible(false);
  }, [errors]);

  return (
    <>
      <UpperHeader />
      <Form onSubmit={handleSubmit}>
        <Select
          label="카테고리"
          name="channelId"
          data={
            state.channels && state.channels.length > 0
              ? getSelectData(state.channels)
              : []
          }
          placeholder="카테고리를 선택해주세요"
          onChange={handleChange}
          style={{
            backgroundColor: "#d9d9d9",
            border: "none",
            borderRadius: "15px",
          }}
        />
        <Input
          label="제목"
          wrapperStyles={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
          inputStyles={{
            border: "none",
          }}
          name="title"
          onChange={handleChange}
        />
        <ImageUpload
          name="image"
          previewImageStyles={{ width: "160px", height: "200px" }}
          onChange={handleChange}
        >
          <AddWrapper>
            <Label>사진</Label>
            <Button height="32px" backgroundColor="transparent" color="black">
              +
            </Button>
          </AddWrapper>
        </ImageUpload>
        <Label>피드백 받고 싶은 내용을 적어주세요.</Label>
        <StyledTextArea name="content" onChange={handleChange} />
        <SubmitWrapper>
          <Button width="25%" onClick={goMainPage}>
            취소
          </Button>
          <Button type="submit" width="25%">
            작성 완료
          </Button>
        </SubmitWrapper>
      </Form>
      <Footer />
      <Modal
        width="50%"
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      >
        {Object.values(errors)[0]}
      </Modal>
    </>
  );
};

export default WritingPostPage;
