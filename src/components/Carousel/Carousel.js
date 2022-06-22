import Proptype from "prop-types";
import styled from "@emotion/styled";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import banner1 from "../../images/banner1.jpg";
import banner2 from "../../images/banner2.jpg";
import banner3 from "../../images/banner3.jpg";
import banner4 from "../../images/banner4.jpg";
import main2 from "../../images/main2.png";

const StyledSlider = styled(Slider)`
  .slick-slide div {
    outline: none;
  }
  .slick-track div {
    display: flex;
    justify-content: center;
    // background-color: #d9d9d9;
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
    slidesToScroll: 1,
    arrows: false,
    centerMode: true,
    slidesToShow: 1,
  };
  return (
    <StyledSlider {...settings}>
      <ImageContainer>
        <Image height={height} src={main2} />
      </ImageContainer>
      <ImageContainer>
        <Image height={height} src={banner1} />
      </ImageContainer>
      <ImageContainer>
        <Image height={height} src={banner2} />
      </ImageContainer>
      <ImageContainer>
        <Image height={height} src={banner3} />
      </ImageContainer>
      <ImageContainer>
        <Image height={height} src={banner4} />
      </ImageContainer>
    </StyledSlider>
  );
}
Carousel.propTypes = {
  height: Proptype.number,
  second: Proptype.number,
};
