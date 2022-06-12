import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { useMemo, useEffect } from "react";
import ReactDOM from "react-dom";
import useclickAway from "../../hooks/useClickAway";

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 100;
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  padding: 8px;
  background-color: white;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  transform: translate(-50%, -50%);
`;

const Modal = ({
  children,
  width = 500,
  height,
  visible,
  onClose,
  ...props
}) => {
  const modalRef = useclickAway(() => {
    visible && onClose && onClose();
  });

  const modalStyle = useMemo(
    () => ({
      width,
      height,
    }),
    [width, height],
  );

  const el = useMemo(() => document.createElement("div"), []);

  useEffect(() => {
    document.body.appendChild(el);
    return () => {
      document.body.removeChild(el);
    };
  });

  useEffect(() => {
    console.log("visible", visible);
  }, [visible]);

  return ReactDOM.createPortal(
    <ModalBackground style={{ display: visible ? "block" : "none" }}>
      <ModalContainer
        {...props}
        style={{ ...props.style, ...modalStyle }}
        ref={modalRef}
      >
        {children}
      </ModalContainer>
    </ModalBackground>,
    el,
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  visible: PropTypes.bool,
  onClose: PropTypes.func,
};

export default Modal;
