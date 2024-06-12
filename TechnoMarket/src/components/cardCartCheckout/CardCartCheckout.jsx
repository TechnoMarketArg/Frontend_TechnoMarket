import PropTypes from 'prop-types';
import {
    MDBCard,
    MDBCardBody,
    MDBCardHeader,
    MDBListGroup,
    MDBListGroupItem,
    MDBTypography,
} from "mdb-react-ui-kit";
import { Button } from 'react-bootstrap';

const CardCartChekout = ({ShoppingCart}) => {
    const total = ShoppingCart.reduce((accumulator, game) => accumulator + game.id, 0)
    return (
        <MDBCard className="mb-4">
            <MDBCardHeader>
                <MDBTypography tag="h5" className="mb-0">
                    Summary
                </MDBTypography>
            </MDBCardHeader>
            <MDBCardBody>
                <MDBListGroup flush>
                    <MDBListGroupItem
                        className="d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                        Products
                        <span>${total}</span>
                    </MDBListGroupItem>
                    <MDBListGroupItem className="d-flex justify-content-between align-items-center px-0">
                        Shipping
                        <span>Gratis</span>
                    </MDBListGroupItem>
                    <MDBListGroupItem
                        className="d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                        <div>
                            <strong>Total amount</strong>
                            <strong>
                                <p className="mb-0">(including VAT)</p>
                            </strong>
                        </div>
                        <span>
                            <strong>${total}</strong>
                        </span>
                    </MDBListGroupItem>
                </MDBListGroup>

                <Button>Go to checkout</Button>
            </MDBCardBody>
        </MDBCard>
    );
};


CardCartChekout.propTypes = {
    ShoppingCart: PropTypes.array
};


export default CardCartChekout;
