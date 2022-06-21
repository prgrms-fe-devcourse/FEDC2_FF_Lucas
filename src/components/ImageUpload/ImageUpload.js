import styled from "@emotion/styled";
import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import PreviewImage from "./PreviewImage";
import Image from "../Image/Image";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
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
  wrapperStyles,
  previewImageWrapperStyles,
  previewImageStyles,
  name,
  prevImageUrl,
  ...props
}) => {
  const [previewItem, setPreviewItem] = useState(null);
  const [binaryImage, setBinaryImage] = useState(null);
  const inputRef = useRef(null);

  const handleLoad = () => {
    setBinaryImage(reader.result);
    const image = (
      <Image alt="사진 미리보기" src={reader.result} {...previewImageStyles} />
    );

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

  useEffect(() => {
    if (!prevImageUrl) {
      return;
    }
    const prevImage = (
      <Image alt="사진 미리보기" src={prevImageUrl} {...previewImageStyles} />
    );
    setPreviewItem(prevImage);
  }, [prevImageUrl]);

  return (
    <Wrapper style={wrapperStyles}>
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
          <PreviewImage
            previewImageWrapperStyles={previewImageWrapperStyles}
            previewItem={previewItem}
          >
            {children}
          </PreviewImage>
        ) : (
          children
        )}
      </UploadContainer>
      {!isInnerPreview && (
        <PreviewImage
          previewImageWrapperStyles={previewImageWrapperStyles}
          previewItem={previewItem}
        />
      )}
    </Wrapper>
  );
};

ImageUpload.propTypes = {
  isInnerPreview: PropTypes.bool,
  children: PropTypes.node,
  wrapperStyles: PropTypes.objectOf(PropTypes.string),
  previewImageWrapperStyles: PropTypes.objectOf(PropTypes.string),
  previewImageStyles: PropTypes.objectOf(PropTypes.string),
  name: PropTypes.string,
  prevImageUrl: PropTypes.string,
};

export default React.memo(ImageUpload);
