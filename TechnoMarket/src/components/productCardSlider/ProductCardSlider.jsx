import PropTypes from 'prop-types';
import Slider from "react-slick";
import { ProductCard } from '../productCard/ProductCard';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IoIosArrowDropleftCircle , IoIosArrowDroprightCircle } from "react-icons/io";

const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <IoIosArrowDroprightCircle
            className={className}
            style={{ ...style, display: "block", size: "32px", color: "rgba(0, 115, 255, 0.7)", height: "100px", width: "40px" }} 
            onClick={onClick}
        />
    );
};

NextArrow.propTypes = {
    className: PropTypes.string,
    style: PropTypes.string,
    onClick: PropTypes.string,
};

const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <IoIosArrowDropleftCircle
            className={className}
            style={{ ...style, display: "block", fontSize: "32px", color: "rgba(0, 115, 255, 0.7)", height: "100px", width: "40px", zIndex: "100" }}
            onClick={onClick}
        />
    );
};

PrevArrow.propTypes = {
    className: PropTypes.string,
    style: PropTypes.string,
    onClick: PropTypes.string,
};

const ProductCardSlider = ({ Title, Data }) => {
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
              breakpoint: 550,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
                dots: false
              }
            },
            {
              breakpoint: 660,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 820,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 1020,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
                infinite: true,
                dots: true
              }
            },
        ]
    };

    return (
        <div className="slider-container p-1">
            <h2 className='text-white text-2xl font-bold mb-2'>{Title}</h2>
            <Slider {...settings}>
                {Data.slice(10, 18).map(product => (
                    <ProductCard
                        key={product.id}
                        offer={true}
                        title={product.title}
                        price={product.price}
                        description={product.description}
                        images={product.images}
                    />
                ))}
            </Slider>
        </div>
    );
};


ProductCardSlider.propTypes = {
    Title: PropTypes.string,
    Data: PropTypes.array,
};


export { ProductCardSlider };
