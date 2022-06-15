import styled from "@emotion/styled";
import Button from "../../components/Button/Button";
import UpperHeader from "../../components/Header/UpperHeader";
import ImageUpload from "../../components/ImageUpload/ImageUpload";
import Input from "../../components/Input/Input";

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

const handleSubmit = e => {
  e.preventDefault();

  const { binaryImage } = e.target.imageUpload.dataset;
  console.log(binaryImage);

  // TODO: api.post
  alert(`글 작성 등록\n제목: ${e.target.titleInput.value}, 내용: ${e.target.content.value}\n ${binaryImage}`);
};

// TODO: 취소시 뒤로가기
const handleCancleClick = () => {
  // 뒤로가기 구현
  alert("글 작성 취소");
};

const WritingPostPage = () => (
  <>
    <UpperHeader />
    <Form onSubmit={handleSubmit}>
      <Input
        label="제목"
        name="titleInput"
        wrapperStyles={{ display: "flex", "flex-direction": "column", gap: "24px" }}
        required
      />
      <ImageUpload name="imageUpload" previewImageStyles={{ width: "160px", height: "200px" }} required>
        <AddWrapper>
          <Label>사진</Label>
          <Button height="32px" backgroundColor="transparent" color="black">
            +
          </Button>
        </AddWrapper>
      </ImageUpload>
      <Label>피드백 받고 싶은 내용을 적어주세요.</Label>
      <StyledTextArea name="content" required />
      <SubmitWrapper>
        <Button onClick={handleCancleClick} width="25%">
          취소
        </Button>
        <Button type="submit" width="25%">
          작성 완료
        </Button>
      </SubmitWrapper>
    </Form>
  </>
);

export default WritingPostPage;
