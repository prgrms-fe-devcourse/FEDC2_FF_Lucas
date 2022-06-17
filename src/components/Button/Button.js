import PropTypes from "prop-types";
import styled from "@emotion/styled";
import Common from "../../styles/common";

const StyledButton = styled.button`
  ${({
    width,
    height,
    backgroundColor,
    color,
    fontSize,
    borderWidth,
    borderColor,
    cursor,
    style,
    transitionDuration,
    hover,
    active,
  }) => ({
    width,
    height,
    backgroundColor,
    color,
    fontSize,
    borderWidth,
    borderColor,
    cursor,
    transitionDuration,
    "&:hover": hover,
    "&:active": active,
    ...style,
  })}
  border: ${({ borderWidth, borderColor }) =>
    borderWidth ? `${borderWidth} solid ${borderColor}` : "none"};
  border-radius: ${({ borderRadius }) => borderRadius || "15px"};
`;

const Button = ({
  width = "100%",
  height = "70px",
  backgroundColor = `${Common.colors.mainColor}`,
  color = "#dddfeb",
  fontSize = `${Common.fontSize.fs16}`,
  borderWidth = 0,
  borderRadius = "15px",
  borderColor = "none",
  cursor = "pointer",
  transitionDuration = "0.2s",
  hover = { backgroundColor: "#4f508f" },
  active = { backgroundColor: "#434379" },
  children,
  onClick,
  ...props
}) => (
  <StyledButton
    type="button"
    width={width}
    height={height}
    backgroundColor={backgroundColor}
    color={color}
    fontSize={fontSize}
    borderWidth={borderWidth}
    borderRadius={borderRadius}
    borderColor={borderColor}
    cursor={cursor}
    transitionDuration={transitionDuration}
    hover={hover}
    active={active}
    onClick={onClick}
    {...props}
  >
    {children}
  </StyledButton>
);

Button.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  backgroundColor: PropTypes.string,
  color: PropTypes.string,
  fontSize: PropTypes.string,
  borderWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  borderRadius: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  borderColor: PropTypes.string,
  cursor: PropTypes.string,
  transitionDuration: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  hover: PropTypes.objectOf(PropTypes.string),
  active: PropTypes.objectOf(PropTypes.string),
  onClick: PropTypes.func,
  children: PropTypes.string,
};

export default Button;
