import styled from "@emotion/styled";
import PropTypes from "prop-types";
import React from "react";

const PreviewImage = ({ children, previewImageWrapperStyles, previewItem }) => {
  const PreviewImageWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 40px;
    padding-left: 40px;
    background-color: #d9d9d9;
    width: 1130px;
    height: 245px;
    border-radius: 15px;
  `;

  return children ? (
    React.cloneElement(children, null, [previewItem])
  ) : (
    <PreviewImageWrapper style={previewImageWrapperStyles}>{previewItem}</PreviewImageWrapper>
  );
};

PreviewImage.propTypes = {
  children: PropTypes.node,
  previewImageWrapperStyles: PropTypes.shape(),
  previewItem: PropTypes.node,
};

export default PreviewImage;
