import styled from "@emotion/styled";
import PropTypes from "prop-types";

const Wrapper = styled.div`
  display: ${({ block }) => (block ? "block" : "inline-block")};
  width: 100%;
  height: 100%;
`;

const Label = styled.label`
  display: block;
  font-size: 36px;
  font-weight: 700;
  line-height: 32px;
`;

const StyledInput = styled.input`
  width: 100%;
  height: 100%;
  padding: ${({ label }) => (label ? `4px 8px 4px 40px` : `4px 8px 4px 4px`)};
  border: 1px solid ${({ invalid }) => (invalid ? "red" : "gray")};
  border-radius: 15px;
  box-sizing: border-box;
  background-color: #d9d9d9;
  font-size: 30px;
  font-weight: 700;
  line-height: 32px;
  letter-spacing: -0.017em;
  &::placeholder {
    display: flex;
    align-items: center;
    color: rgba(0, 0, 0, 0.42);
  }
`;

const Input = ({
  label,
  type = "text",
  block = false,
  invalid = false,
  required = false,
  disabled = false,
  readonly = false,
  placeholder = "",
  maxLength,
  wrapperProps = {},
  wrapperStyles = {},
  labelStyles = {},
  inputStyles = {},
  ...props
}) => (
  <Wrapper block={block} {...wrapperProps} style={wrapperStyles}>
    <Label style={labelStyles}>{label}</Label>
    <StyledInput
      type={type}
      invalid={invalid}
      required={required}
      disabled={disabled}
      readOnly={readonly}
      maxLength={maxLength}
      placeholder={placeholder}
      style={inputStyles}
      {...props}
    />
  </Wrapper>
);

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.oneOf(["text", "checkbox", "email", "password", "submit"]),
  block: PropTypes.bool,
  invalid: PropTypes.bool,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  readonly: PropTypes.bool,
  placeholder: PropTypes.string,
  maxLength: PropTypes.number,
  labelStyles: PropTypes.objectOf(PropTypes.string),
  inputStyles: PropTypes.objectOf(PropTypes.string),
  wrapperStyles: PropTypes.objectOf(PropTypes.string),
  wrapperProps: PropTypes.objectOf(PropTypes.string),
};

export default Input;
