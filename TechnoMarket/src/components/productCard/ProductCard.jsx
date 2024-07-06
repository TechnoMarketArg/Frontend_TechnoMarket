import PropTypes from "prop-types";
import { MDBBtn, MDBRipple } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../../services/DarkMode/DarkModeContext";

const ProductCard = ({
  id,
  title,
  description,
  price,
  images,
  variants,
  offer,
  discount,
  addCart,
}) => {
  const product = {
    id: id,
    title: title,
    price: price,
    images: images,
    description: description,
    variants,
    quantity: 1,
  };

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/products/${id}`, {
      state: {
        product: {
          id,
        },
      },
    });
  };

  const { darkMode } = useDarkMode();
  return (
    <div
      className={`flex bg-image rounded hover-zoom hover-overlay h-[380px]  sm:min-w-[180px] sm:max-w-[200px] w-full cursor-pointer flex-col justify-between  overflow-hidden ${
        darkMode ? "bg-dark" : "bg-white"
      }`}>
      <button onClick={handleClick}>
        <div className="relative w-full">
          {offer && (
            <div className="absolute right-0 rounded-s-xl bg-green-500 p-2 font-medium z-20">
              {discount * 100}% OFF
            </div>
          )}
          <div className="relative">
            <MDBRipple
              rippleTag="div"
              rippleColor="light"
              className="bg-image rounded hover-zoom hover-overlay object-cover h-[250px] flex justify-center items-center bg-white"
              onClick={handleClick}>
              <img src={images[0]} alt={title} className="relative z-0" />
              {darkMode && <div className="absolute inset-0 bg-dark opacity-30 pointer-events-none z-10"></div>}
            </MDBRipple>
          </div>
        </div>
      </button>
      <div className="w-full">
        <div className="p-2">
          {!offer && (
            <h4 className=" text-2xl font-bold text-green-700">
              ${price.toFixed(1)}
            </h4>
          )}
          {offer && (
            <h4 className=" text-2xl font-bold text-green-700">
              ${(price - price * discount).toFixed(1)}
              {offer && (
                <span className="text-base font-medium text-red-500 line-through mx-2">
                  ${price.toFixed(1)}
                </span>
              )}
            </h4>
          )}

          <div className="h-[20px] my-2 sm:min-w-[180px] sm:max-w-[180px] w-full whitespace-nowrap text-center">
            <p className="overflow-hidden text-ellipsis text-xs font-bold">
              {title}
            </p>
          </div>

          {/*<div className="my-8 h-[50px] sm:min-w-[200px] sm:max-w-[220px] w-full overflow-hidden">
                            <p className="line-clamp-2">{description}</p>
                        </div>*/}

          {/*STAR DE MATERIAL UI*/}
        </div>
        <div className="w-full flex justify-center gap-1 mb-2">
          {/*<MDBBtn onClick={openModal} size='sm'  className=' text-xs w-[110px]'>Buy now</MDBBtn>*/}
          <MDBBtn
            onClick={() => addCart(product)}
            size="sm"
            color="warning"
            className="text-xs w-[110px] ">
            <span className="text-">Add to cart</span>
          </MDBBtn>
        </div>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  price: PropTypes.number,
  description: PropTypes.string,
  images: PropTypes.array,
  variants: PropTypes.object,
  offer: PropTypes.bool,
  discount: PropTypes.number,
  addCart: PropTypes.func,
  openModal: PropTypes.func,
};

export { ProductCard };
