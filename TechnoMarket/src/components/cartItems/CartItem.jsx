import { MDBCol, MDBInput, MDBRipple, MDBRow } from "mdb-react-ui-kit";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";

const CartItem = ({
  id,
  title,
  description,
  price,
  images,
  quantity,
  removeCart,
  decreaseQuantity,
  increaseQuantity,
}) => {
  return (
    <>
      <MDBRow>
        <MDBCol lg="3" md="12" className="mb-4 mb-lg-0">
          <MDBRipple
            rippleTag="div"
            rippleColor="light"
            className="bg-image rounded hover-zoom hover-overlay">
            <img src={images} className="w-100" />
            <div
              className="mask"
              style={{ backgroundColor: "rgba(251, 251, 251, 0.2)" }}></div>
          </MDBRipple>
        </MDBCol>

        <MDBCol lg="5" md="6" className=" mb-4 mb-lg-0">
          <h5 className="font-bold text-lg">{title}</h5>
          <div className="my-2 h-11 sm:max-w-[220px] w-full overflow-hidden">
            <p className="line-clamp-2">{description}</p>
          </div>
          <Button
            variant="secondary"
            className="mr-2"
            title="Remove item"
            onClick={() => removeCart(id)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M4 7l16 0" />
              <path d="M10 11l0 6" />
              <path d="M14 11l0 6" />
              <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
              <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
            </svg>
          </Button>
        </MDBCol>
        <MDBCol lg="4" md="6" className="mb-4 mb-lg-0">
          <div className="d-flex mb-4" style={{ maxWidth: "300px" }}>
            <Button
              className="px-3 me-2 max-h-10"
              onClick={() => decreaseQuantity(id)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ffffff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M5 12l14 0" />
              </svg>
            </Button>

            <MDBInput
              min={1}
              value={quantity}
              readOnly
              className="text-center "
              label="Quantity"
            />

            <Button
              className="px-3 ms-2 max-h-10"
              onClick={() => increaseQuantity(id)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ffffff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12 5l0 14" />
                <path d="M5 12l14 0" />
              </svg>
            </Button>
          </div>

          <p className="text-start text-md-center">
            <strong>${(price * quantity).toFixed(1)}</strong>
          </p>
        </MDBCol>
      </MDBRow>
      <hr className="my-4" />
    </>
  );
};

CartItem.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  price: PropTypes.number,
  images: PropTypes.array,
  quantity: PropTypes.number,
  QuantityValue: PropTypes.number,
  setQuantityValue: PropTypes.func,
  decreaseQuantity: PropTypes.func,
  increaseQuantity: PropTypes.func,
  removeCart: PropTypes.func,
};

export { CartItem };
