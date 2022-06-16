import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import Modal from "../../components/Modal/Modal";
import Button from "../../components/Button/Button";
import UpperHeader from "../../components/Header/UpperHeader";
import ImageUpload from "../../components/ImageUpload/ImageUpload";
import Input from "../../components/Input/Input";
import useForm from "../../hooks/useForm";

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
  border: 1px solid;
  resize: none;
  box-sizing: border-box;
`;

const SubmitWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 24px;
  width: 100%;
`;

// TODO: 취소시 뒤로가기
const handleCancleClick = () => {
  // 뒤로가기 구현
  alert("글 작성 취소");
};

const WritingPostPage = () => {
  const { errors, handleChange, handleSubmit } = useForm({
    initialValues: {
      title: "",
      content: "",
      image: "",
    },
    onSubmit: async ({ title, content, event }) => {
      // TODO: api.post
      console.log(`글 작성 등록\n제목: ${title}, 내용: ${content}\n ${event.target.image.dataset.binaryImage}`);
    },
    validate: ({ title, image, content }) => {
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
      return error;
    },
  });
  const [modalVisible, setModalVisible] = useState(false);

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
        <Input
          label="제목"
          wrapperStyles={{ display: "flex", "flex-direction": "column", gap: "24px" }}
          name="title"
          onChange={handleChange}
        />
        <ImageUpload name="image" previewImageStyles={{ width: "160px", height: "200px" }} onChange={handleChange}>
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
          <Button onClick={handleCancleClick} width="25%">
            취소
          </Button>
          <Button type="submit" width="25%">
            작성 완료
          </Button>
        </SubmitWrapper>
      </Form>
      <Modal width="50%" visible={modalVisible} onClose={() => setModalVisible(false)}>
        {Object.values(errors)[0]}
      </Modal>
    </>
  );
};

export default WritingPostPage;
