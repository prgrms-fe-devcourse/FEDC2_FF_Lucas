import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { useMemo, useEffect } from "react";
import ReactDOM from "react-dom";
import { X as CloseIcon } from "react-feather";
import FocusTrap from "focus-trap-react";
import useClickAway from "../../hooks/useClickAway";

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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Modal = ({
  children,
  width = 500,
  height,
  visible,
  onClose,
  ...props
}) => {
  const modalRef = useClickAway(() => {
    onClose && onClose();
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

  return ReactDOM.createPortal(
    <ModalBackground style={{ display: visible ? "block" : "none" }}>
      <FocusTrap active={visible}>
        <ModalContainer
          {...props}
          style={{ ...props.style, ...modalStyle }}
          ref={modalRef}
        >
          <CloseIcon
            onClick={onClose}
            style={{ alignSelf: "flex-end", cursor: "pointer" }}
            tabIndex={0}
          />
          {children}
        </ModalContainer>
      </FocusTrap>
    </ModalBackground>,
    el,
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
