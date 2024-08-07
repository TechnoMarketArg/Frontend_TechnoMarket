import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBTypography,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
} from "mdb-react-ui-kit";
import PropTypes from "prop-types";

import CardCartChekout from "../cardCartCheckout/CardCartCheckout";
import { CartItem } from "../cartItems/CartItem";
import { NavBarContext } from "../navBarContext/NavBarContext";
import { useContext } from "react";
import { useDarkMode } from "../../services/DarkMode/DarkModeContext";

const Cart = () => {
  const {
    ShoppingCart,
    increaseQuantity,
    decreaseQuantity,
    removeCart,
    optSmModal,
    setOptSmModal,
    toggleOpen,
    cleanCart
  } = useContext(NavBarContext);
  const { darkMode } = useDarkMode()
  return (
    <MDBModal open={optSmModal} tabIndex="-1" setOpen={setOptSmModal}>
    <MDBModalDialog size="xl">
      <MDBModalContent className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
        <MDBModalHeader className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
          <MDBModalTitle>Cart - TechnoMarket</MDBModalTitle>
          <MDBBtn
            className="btn-close"
            color="none"
            onClick={toggleOpen}
          ></MDBBtn>
        </MDBModalHeader>
        <MDBModalBody>
          <section className="h-100 gradient-custom">
            <MDBContainer className="pb-4 h-100">
              <MDBRow className="justify-content-center my-4">
                <MDBCol md="8">
                  <MDBCard className={`mb-4 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
                    <MDBCardHeader className={`py-3 flex items-center justify-between ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'}`}>
                      <MDBTypography tag="h5" className="mb-0">
                        {ShoppingCart.length} {ShoppingCart.length === 1 ? "Product" : "Products"}
                      </MDBTypography>
                      {ShoppingCart.length >= 1 &&
                        <MDBBtn outline color="danger" size='sm' onClick={cleanCart}>
                          Clean Cart
                        </MDBBtn>
                      }
                    </MDBCardHeader>
                    <MDBCardBody className="h-[350px] overflow-y-scroll">
                      {ShoppingCart.length
                        ? ShoppingCart.map((product) => (
                            <CartItem
                              key={product.id}
                              id={product.id}
                              title={product.title}
                              description={product.description}
                              price={product.price}
                              images={product.images}
                              removeCart={removeCart}
                              quantity={product.quantity}
                              decreaseQuantity={decreaseQuantity}
                              increaseQuantity={increaseQuantity}
                              cleanCart={cleanCart}
                            />
                          ))
                        : "Shopping Cart empty"}
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
                <MDBCol md="4">
                  {ShoppingCart.length ? (
                    <CardCartChekout ShoppingCart={ShoppingCart} />
                  ) : (
                    ""
                  )}
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </section>
        </MDBModalBody>
      </MDBModalContent>
    </MDBModalDialog>
  </MDBModal>
  );
};

Cart.propTypes = {};

export default Cart;
