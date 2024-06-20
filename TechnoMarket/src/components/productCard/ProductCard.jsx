import PropTypes from "prop-types";
import { MDBBtn, MDBRipple } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";

const ProductCard = ({
  id,
  title,
  description,
  price,
  images,
  variants,
  offer,
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
          title,
          price,
          images,
          description,
          variants
        },
      },
    });
  };

  return (
    <div className="flex bg-image rounded hover-zoom hover-overlay sm:min-w-[180px] sm:max-w-[200px] w-full cursor-pointer flex-col justify-between bg-white overflow-hidden">
      <button onClick={handleClick}>
        <div className="relative w-full">
          {offer && (
            <div className="absolute right-0 rounded-s-xl bg-green-500 p-2 font-medium z-20">
              30% OFF
            </div>
          )}
          <MDBRipple
            rippleTag="div"
            rippleColor="light"
            className="bg-image rounded hover-zoom hover-overlay object-cover min-h-60 flex justify-center items-center bg-white"
            onClick={handleClick}>
            <img src={images[0]} alt={title} />
            <div
              className="mask"
              style={{ backgroundColor: "rgba(251, 251, 251, 0.2)" }}></div>
          </MDBRipple>
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
              ${(price * 0.7).toFixed(1)}{" "}
              {offer && (
                <span className="text-base font-medium text-red-500 line-through">
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
  id: PropTypes.number,
  title: PropTypes.string,
  price: PropTypes.number,
  description: PropTypes.string,
  images: PropTypes.array,
  variants: PropTypes.object,
  offer: PropTypes.bool,
  addCart: PropTypes.func,
  openModal: PropTypes.func,
};

export { ProductCard };
