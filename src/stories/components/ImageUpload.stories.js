import styled from "@emotion/styled";
import ImageUpload from "../../components/ImageUpload/ImageUpload";

export default {
  title: "Component/ImageUpload",
  component: ImageUpload,
  argTypes: {
    previewImageWrapperStyles: {
      defaultValue: {},
    },
    previewImageStyles: {
      defaultValue: {},
    },
  },
};

export const Default = () => (
  <ImageUpload>
    <button type="button">click me</button>
  </ImageUpload>
);
const Label = styled.label`
  display: block;
  font-size: 36px;
  font-weight: 700;
  line-height: 32px;
`;

export const ImageFile = args => (
  <ImageUpload {...args} previewImageStyles={{ width: "160px", height: "200px" }}>
    <Label>사진</Label>
    <button type="button">+</button>
  </ImageUpload>
);

const ProfileImage = styled.div`
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background-color: #d9d9d9;
  overflow: hidden;
`;

export const Profile = args => (
  <ImageUpload {...args} isInnerPreview previewImageStyles={{ width: "100%", height: "100%", mode: "cover" }}>
    <ProfileImage />
  </ImageUpload>
);
