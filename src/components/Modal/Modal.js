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
  display: flex;
  justify-content: center;
  align-items: flex-start;
  overflow: auto;
  width: 100vw;
  height: 100vh;
`;

const ModalContent = styled.div`
  position: relative;
  padding: 8px 8px 20px; // CloseIcon 높이만큼 padding-bottom 적용
  border-radius: 5px;
  background-color: white;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 90%;
  margin-top: 3.75em;
  margin-bottom: 3.75em;
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

  useEffect(() => {
    if (visible) document.body.classList.add("modal-open");
    else document.body.classList.remove("modal-open");
  }, [visible]);

  return ReactDOM.createPortal(
    <ModalBackground style={{ display: visible ? "block" : "none" }}>
      <ModalContainer>
        <FocusTrap active={visible}>
          <ModalContent
            {...props}
            style={{ ...props.style, ...modalStyle }}
            ref={modalRef}
          >
            <CloseIcon
              size={20}
              onClick={onClose}
              style={{ alignSelf: "flex-end", cursor: "pointer" }}
              tabIndex={0}
            />
            {children}
          </ModalContent>
        </FocusTrap>
      </ModalContainer>
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
