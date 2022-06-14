import Proptype from "prop-types";
import styled from "@emotion/styled";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const StyledSlider = styled(Slider)`
  .slick-slide div {
    outline: none;
  }
  .slick-track div {
    display: flex;
    justify-content: center;
    background-color: #d9d9d9;
  }
`;

const ImageContainer = styled.div`
  margin: 0 16px;
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  width: auto;
`;
export default function Carousel({ height, second }) {
  const settings = {
    dots: true,
    autoplay: true,
    autoplaySpeed: second,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  return (
    <StyledSlider {...settings}>
      <ImageContainer>
        <Image height={height} src="https://picsum.photos/200" />
      </ImageContainer>
      <ImageContainer>
        <Image height={height} src="https://picsum.photos/200" />
      </ImageContainer>
      <ImageContainer>
        <Image height={height} src="https://picsum.photos/200" />
      </ImageContainer>
      <ImageContainer>
        <Image height={height} src="https://picsum.photos/200" />
      </ImageContainer>
      <ImageContainer>
        <Image height={height} src="https://picsum.photos/200" />
      </ImageContainer>
    </StyledSlider>
  );
}
Carousel.propTypes = {
  height: Proptype.number,
  second: Proptype.number,
};
