import PropTypes from "prop-types";
import {
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBListGroup,
  MDBListGroupItem,
  MDBTypography,
} from "mdb-react-ui-kit";
import { Button } from "react-bootstrap";
import Payment from "../payment/Payment";
import { useMemo } from "react";
import { useDarkMode } from "../../services/DarkMode/DarkModeContext";

const CardCartChekout = ({ ShoppingCart }) => {
  const ShoppingCartForTotal = ShoppingCart.map((p) => {
    return {
      id: p.id,
      name: p.name,
      price: p.price * p.quantity,
      quantity: p.quantity,
    };
  });

  const total = useMemo(() => {
    return ShoppingCartForTotal.reduce(
      (accumulator, product) => accumulator + product.price,
      0
    );
  }, [ShoppingCartForTotal]);

  const { darkMode } = useDarkMode();
  
  return (
    <MDBCard className={`mb-4 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <MDBCardHeader className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'}`}>
        <MDBTypography tag="h5" className="mb-0">
          Summary
        </MDBTypography>
      </MDBCardHeader>
      <MDBCardBody>
        <MDBListGroup>
          <MDBListGroupItem className={`d-flex justify-content-between align-items-center border-0 px-0 pb-0 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
            Products
            <span>${total.toFixed(2)}</span>
          </MDBListGroupItem>
          <MDBListGroupItem className={`d-flex justify-content-between align-items-center px-0 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
            Shipping
            <span>Gratis</span>
          </MDBListGroupItem>
          <MDBListGroupItem className={`d-flex justify-content-between align-items-center border-0 px-0 mb-3 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
            <div>
              <strong>Total amount</strong>
              <strong>
                <p className="mb-0">(including VAT)</p>
              </strong>
            </div>
            <span>
              <strong>${total.toFixed(2)}</strong>
            </span>
          </MDBListGroupItem>
        </MDBListGroup>

        <Button className={`${darkMode ? 'btn-dark' : 'btn-light'}`}>Go to checkout</Button>
      </MDBCardBody>
    </MDBCard>
  );
};

CardCartChekout.propTypes = {
  ShoppingCart: PropTypes.array,
};

export default CardCartChekout;
