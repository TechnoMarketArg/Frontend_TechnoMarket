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
    MDBModalBody
} from "mdb-react-ui-kit";
import PropTypes from "prop-types" 

import CardCartChekout from "../cardCartCheckout/CardCartCheckout";
import { CartItem } from "../cartItems/CartItem";





const Cart = ({optSmModal, setOptSmModal, toggleOpen, ShoppingCart, removeCart}) => {
    

    return (
        <>
            
            <MDBModal open={optSmModal} tabIndex='-1' setOpen={setOptSmModal}>
                <MDBModalDialog size='xl'>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Cart</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>


                            <section className="h-100 gradient-custom">
                                <MDBContainer className="py-5 h-100">
                                    <MDBRow className="justify-content-center my-4">
                                        <MDBCol md="8">
                                            <MDBCard className="mb-4">
                                                <MDBCardHeader className="py-3">
                                                    <MDBTypography tag="h5" className="mb-0">
                                                        {ShoppingCart.length} Games
                                                    </MDBTypography>
                                                </MDBCardHeader>
                                                <MDBCardBody>

                                                    {/*Componente propio*/}
                                                    {ShoppingCart.length ? ShoppingCart.map(game => (
                                                        <CartItem
                                                        
                                                            key={game.id}
                                                            game={game}
                                                            removeCart={removeCart}
                                                        />  
                                                    )) : 'Shopping Cart empty'}
                                                    
                                                    
                                                </MDBCardBody>
                                            </MDBCard>


                                            
                                        </MDBCol>
                                        <MDBCol md="4">

                                            {ShoppingCart.length ? <CardCartChekout ShoppingCart={ShoppingCart}/> : ''} {/*Componente propio*/}

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
}

Cart.propTypes = {
    toggleOpen : PropTypes.func,
    optSmModal :PropTypes.bool,
    setOptSmModal: PropTypes.func,
    ShoppingCart: PropTypes.array,
    removeCart: PropTypes.func,

}

export default Cart