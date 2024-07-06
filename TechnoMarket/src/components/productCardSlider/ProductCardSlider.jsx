import PropTypes from "prop-types";
import Slider from "react-slick";
import { ProductCard } from "../productCard/ProductCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";
import { useNavigate } from "react-router-dom";

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <IoIosArrowDroprightCircle
      className={className}
      style={{
        ...style,
        display: "block",
        size: "32px",
        color: "rgba(145, 179, 225, 0.7)",
        height: "100px",
        width: "40px",
      }}
      onClick={onClick}
    />
  );
};

NextArrow.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
};

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <IoIosArrowDropleftCircle
      className={className}
      style={{
        ...style,
        display: "block",
        fontSize: "32px",
        color: "rgba(145, 179, 225, 0.7)",
        height: "100px",
        width: "40px",
        zIndex: "100",
      }}
      onClick={onClick}
    />
  );
};

PrevArrow.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
};

const ProductCardSlider = ({ Title, Data, addCart }) => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 639,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 783,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1524,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  };

  const navigate = useNavigate()

  const navigateCategory = (name) => {
    navigate(`/categories/${name}`, {
      state: {
        category: {
          name,
        },
      },
    });
  };

  return (
    <div className="slider-container my-4 lg:ml-2 w-[380px] sm:w-[500px] md:w-[735px] lg:w-[984px] xl:w-[1240px] 2xl:w-[1524px]">
      <button onClick={() => navigateCategory(Title)} className=" ml-2 mb-4">
        <h1 className="text-3xl font-bold hover:bg-gradient-to-r hover:text-shadow-sm bg-gradient-to-l from-[rgba(15,69,113,1)] via-[rgba(56,109,189,1)] to-[rgba(0,157,221,1)] bg-clip-text text-transparent">
          {Title}
        </h1>
      </button>
      <Slider {...settings}>
        {Data.slice(0, 8).map((filteredProduct) => (
          <ProductCard
            key={filteredProduct.id}
            id={filteredProduct.id}
            offer={filteredProduct.offer}
            title={filteredProduct.title}
            price={filteredProduct.price}
            description={filteredProduct.description}
            images={filteredProduct.images}
            variants={filteredProduct.variants}
            discount={filteredProduct.discount}
            addCart={addCart}
          />
        ))}
      </Slider>
    </div>
  );
};

ProductCardSlider.propTypes = {
  Title: PropTypes.string,
  Data: PropTypes.array,
  addCart: PropTypes.func,
};

export { ProductCardSlider };