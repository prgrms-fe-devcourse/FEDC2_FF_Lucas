import PropTypes from "prop-types";
import { useState, useRef, useEffect } from "react";

let observer = null;
const LOAD_IMG_EVENT_TYPE = "Load_Image";

const onIntersection = (entries, ob) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      ob.unobserve(entry.target);
      entry.target.dispatchEvent(new CustomEvent(LOAD_IMG_EVENT_TYPE));
    }
  });
};

const Image = ({
  src,
  width,
  height,
  alt,
  block,
  mode,
  placeholder,
  lazy,
  threshold = 0.5,
  ...props
}) => {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef(null);

  const imageStyle = {
    display: block ? "block" : "inline-block",
    width,
    height,
    objectFit: mode,
  };

  useEffect(() => {
    if (!lazy) {
      setLoaded(true);
      return undefined;
    }

    const handleLoadImage = () => setLoaded(true);

    const imgElement = imgRef.current;

    if (imgElement)
      imgElement.addEventListener(LOAD_IMG_EVENT_TYPE, handleLoadImage);

    return () => {
      if (imgElement)
        imgElement.removeEventListener(LOAD_IMG_EVENT_TYPE, handleLoadImage);
    };
  }, [lazy]);

  useEffect(() => {
    if (!lazy) return;

    observer = new IntersectionObserver(onIntersection, { threshold });
    if (imgRef) observer.observe(imgRef.current);
  }, [lazy, threshold]);

  return (
    <img
      src={loaded ? src : placeholder}
      alt={alt}
      ref={imgRef}
      {...props}
      style={{ ...props.style, ...imageStyle }}
    />
  );
};

Image.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  mode: PropTypes.oneOf(["contain", "fill", "cover"]),
  block: PropTypes.bool,
  placeholder: PropTypes.string,
  lazy: PropTypes.bool,
  threshold: PropTypes.number,
  style: PropTypes.objectOf(PropTypes.string),
};

export default Image;
