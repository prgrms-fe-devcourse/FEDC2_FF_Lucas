import styled from "@emotion/styled";
import { useRef, useState } from "react";
import PropTypes from "prop-types";
import PreviewImage from "./PreviewImage";
import Image from "../Image/Image";

const UploadContainer = styled.div`
  display: inline-flex;
  cursor: pointer;
`;

const Input = styled.input`
  display: none;
`;

const ImageUpload = ({
  isInnerPreview = false,
  children,
  previewImageWrapperStyles,
  previewImageStyles,
  name,
  ...props
}) => {
  const [previewItem, setPreviewItem] = useState(null);
  const inputRef = useRef(null);

  const handleFileChange = e => {
    const {
      target: { files },
    } = e;

    if (files.length === 0) {
      return;
    }

    const [changedFile] = files;

    const src = URL.createObjectURL(changedFile);
    const image = <Image alt="사진 미리보기" src={src} {...previewImageStyles} />;

    setPreviewItem(image);
  };

  const handleChooseFile = () => {
    inputRef.current.click();
  };

  return (
    <>
      <UploadContainer onClick={handleChooseFile} {...props}>
        <Input ref={inputRef} type="file" name={name} accept="image/*" onChange={handleFileChange} />
        {isInnerPreview ? (
          <PreviewImage previewImageWrapperStyles={previewImageWrapperStyles} previewItem={previewItem}>
            {children}
          </PreviewImage>
        ) : (
          children
        )}
      </UploadContainer>
      {!isInnerPreview && (
        <PreviewImage previewImageWrapperStyles={previewImageWrapperStyles} previewItem={previewItem} />
      )}
    </>
  );
};

ImageUpload.propTypes = {
  isInnerPreview: PropTypes.bool,
  children: PropTypes.node,
  previewImageWrapperStyles: PropTypes.shape(),
  previewImageStyles: PropTypes.shape(),
  name: PropTypes.string,
};

export default ImageUpload;
