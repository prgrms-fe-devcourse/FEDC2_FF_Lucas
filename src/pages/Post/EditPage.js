import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Camera } from "react-feather";
import Modal from "../../components/Modal/Modal";
import Button from "../../components/Button/Button";
import UpperHeader from "../../components/Header/UpperHeader";
import ImageUpload from "../../components/ImageUpload/ImageUpload";
import Input from "../../components/Input/Input";
import useForm from "../../hooks/useForm";
import { useGlobalContext } from "../../store/GlobalProvider";
import Select from "../../components/Select/Select";
import Footer from "../../components/Footer/Footer";
import { updatePost } from "../../utils/apis/posts";

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
`;

const ImageUploadWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
  padding-left: 40px;
  background-color: #d9d9d9;
  width: 100%;
  height: 245px;
  border-radius: 15px;
  box-sizing: border-box;
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

const EditPage = () => {
  const { state, storedToken } = useGlobalContext();
  const navigate = useNavigate();
  const goMainPage = ({ replace = false }) => navigate("/", { replace });
  const { state: locationState } = useLocation();

  const post = locationState && locationState.post;
  const defaultTitle = (post && post.title) || "";
  const defaultContent = (post && post.content) || "";
  const defaultImage = (post && post.image) || "";
  const defaultChaanelId = (post && post.channel) || "";

  const { errors, handleChange, handleSubmit } = useForm({
    initialValues: {
      title: defaultTitle,
      content: defaultContent,
      image: defaultImage,
      channelId: defaultChaanelId,
    },
    onSubmit: async ({ title, content, event }) => {
      const changedImgae =
        event.target.image.files && event.target.image.files[0];

      try {
        await updatePost({
          postId: post._id,
          title: JSON.stringify({
            title,
            content,
          }),
          image: changedImgae || post.image,
          imageToDeletePublicId: null,
          channelId: post.channel._id,
          token: storedToken,
        });
        goMainPage({ replace: true });
      } catch (e) {
        alert(`글 수정 실패 ${e}`);
      }
    },
    validate: ({ title, content, channelId }) => {
      const error = {};
      if (!title) {
        error.title = "제목을 입력해주세요!";
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

  useEffect(() => {
    if (!post) {
      navigate("/", { replace: true });
    }
  }, [post]);

  return (
    <div>
      {post ? (
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
              defaultValue={defaultChaanelId}
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
              defaultValue={defaultTitle}
              name="title"
              onChange={handleChange}
            />
            <Label>사진</Label>
            <ImageUploadWrapper>
              <ImageUpload
                name="image"
                prevImageUrl={post.image}
                wrapperStyles={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: "100%",
                  height: "100%",
                }}
                previewImageStyles={{ height: "80%" }}
                previewImageWrapperStyles={{
                  backgroundColor: "transparent",
                  width: "100%",
                  aspectRatio: "4 / 5",
                }}
                style={{ height: "80%", aspectRatio: "1 / 1" }}
                onChange={handleChange}
              >
                <Button width="100%" height="100%" borderRadius="100%">
                  <Camera size={100} />
                </Button>
              </ImageUpload>
            </ImageUploadWrapper>
            <Label>피드백 받고 싶은 내용을 적어주세요.</Label>
            <StyledTextArea
              name="content"
              defaultValue={defaultContent}
              onChange={handleChange}
            />
            <SubmitWrapper>
              <Button width="25%" onClick={goMainPage}>
                취소
              </Button>
              <Button type="submit" width="25%">
                수정 완료
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
      ) : null}
    </div>
  );
};

export default EditPage;
