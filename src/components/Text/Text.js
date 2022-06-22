import PropTypes from "prop-types";

const Text = ({
  children,
  block,
  size,
  strong,
  underline,
  color,
  ...props
}) => {
  const Tag = block ? "div" : "span";
  const fontStyle = {
    fontWeight: strong ? "bold" : undefined,
    fontSize: typeof size === "number" ? `${size}px` : size,
    textDecoration: underline ? "underline" : undefined,
    color,
  };

  return (
    <Tag {...props} style={{ ...props.style, ...fontStyle }}>
      {children}
    </Tag>
  );
};

Text.propTypes = {
  children: PropTypes.node.isRequired,
  block: PropTypes.bool,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  strong: PropTypes.bool,
  underline: PropTypes.bool,
  color: PropTypes.string,
  style: PropTypes.objectOf(PropTypes.string),
};

export default Text;
