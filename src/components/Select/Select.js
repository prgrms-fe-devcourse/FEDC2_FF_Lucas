/* eslint-disable react/prop-types */
import styled from "@emotion/styled";
import PropTypes from "prop-types";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Label = styled.label`
  display: block;
  flex-shrink: 0;
  font-size: 36px;
  font-weight: 700;
  line-height: 34px;
`;

const StyledSelect = styled.select`
  width: 100%;
  height: 40px;
  padding: 4px 8px;
  border: 1px solid ${({ invalid }) => (invalid ? "red" : "gray")};
  border-radius: 15px;
  box-sizing: border-box;
  font-size: 32px;
`;

const Select = ({
  data,
  label,
  placeholder,
  name,
  invalid = false,
  required = false,
  disabled = false,
  wrapperProps,
  ...props
}) => {
  const formattedData = data.map(item =>
    typeof item === "string" ? { label: item, value: item } : item,
  );

  const options = formattedData.map(item => (
    <option key={item.value} value={item.value}>
      {item.label}
    </option>
  ));

  if (placeholder) {
    options.unshift(
      <option key="placeholder" value="" hidden>
        {placeholder}
      </option>,
    );
  }

  return (
    <Wrapper {...wrapperProps}>
      <Label>{label}</Label>
      <StyledSelect
        invalid={invalid}
        required={required}
        disabled={disabled}
        name={name}
        {...props}
      >
        {options}
      </StyledSelect>
    </Wrapper>
  );
};

Select.propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.arrayOf(PropTypes.string),
  ]),
  label: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  invalid: PropTypes.bool,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  wrapperProps: PropTypes.objectOf(PropTypes.string),
};

export default Select;
