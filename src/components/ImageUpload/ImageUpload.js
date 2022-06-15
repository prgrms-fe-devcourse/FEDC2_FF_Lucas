import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";
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

const reader = new FileReader();

const ImageUpload = ({
  isInnerPreview = false,
  children,
  previewImageWrapperStyles,
  previewImageStyles,
  name,
  ...props
}) => {
  const [previewItem, setPreviewItem] = useState(null);
  const [binaryImage, setBinaryImage] = useState(null);
  const inputRef = useRef(null);

  const handleLoad = () => {
    setBinaryImage(reader.result);
    const image = <Image alt="사진 미리보기" src={reader.result} {...previewImageStyles} />;

    setPreviewItem(image);
  };

  useEffect(() => {
    reader.addEventListener("load", handleLoad);

    return () => reader.removeEventListener("loader", handleLoad);
  }, []);

  const handleFileChange = e => {
    const {
      target: { files },
    } = e;

    if (files.length === 0) {
      return;
    }

    const [changedFile] = files;

    reader.readAsDataURL(changedFile);
  };

  const handleChooseFile = () => {
    inputRef.current.click();
  };

  return (
    <>
      <UploadContainer onClick={handleChooseFile} {...props}>
        <Input
          ref={inputRef}
          type="file"
          name={name}
          accept="image/*"
          onChange={handleFileChange}
          data-binary-image={binaryImage}
        />
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
