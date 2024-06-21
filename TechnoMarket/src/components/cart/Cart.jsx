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

const Cart = ({
  optSmModal,
  setOptSmModal,
  toggleOpen,
  ShoppingCart,
  removeCart,
  decreaseQuantity,
  increaseQuantity
}) => {
    

  return (
    <>
      <MDBModal open={optSmModal} tabIndex="-1" setOpen={setOptSmModal}>
        <MDBModalDialog size="xl">
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Cart - TechnoMarket</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleOpen}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <section className="h-100 gradient-custom">
                <MDBContainer className="pb- h-100">
                  <MDBRow className="justify-content-center my-4">
                    <MDBCol md="8">
                      <MDBCard className="mb-4">
                        <MDBCardHeader className="py-3">
                          <MDBTypography tag="h5" className="mb-0">
                            {ShoppingCart.length}{" "}
                            {ShoppingCart.length == 1 ? "Product" : "Products"}
                          </MDBTypography>
                        </MDBCardHeader>
                        <MDBCardBody className="h-[350px] overflow-y-scroll">
                          {/*Componente propio*/}
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
                      )}{" "}
                      {/*Componente propio*/}
                    </MDBCol>
                  </MDBRow>
                </MDBContainer>
              </section>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

Cart.propTypes = {
  toggleOpen: PropTypes.func,
  optSmModal: PropTypes.bool,
  setOptSmModal: PropTypes.func,
  ShoppingCart: PropTypes.array,
  removeCart: PropTypes.func,
  decreaseQuantity: PropTypes.func,
  increaseQuantity: PropTypes.func,
};

export default Cart;