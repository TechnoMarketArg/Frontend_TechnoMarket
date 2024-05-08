import {
    MDBCol,
    MDBInput,
    MDBRipple,
    MDBRow,

} from "mdb-react-ui-kit";
import PropTypes from 'prop-types';
import { Button } from "react-bootstrap";


const CardItem = ({game, removeCart}) => {
    return (
    <>
        <MDBRow>
            <MDBCol lg="3" md="12" className="mb-4 mb-lg-0">
                <MDBRipple rippleTag="div" rippleColor="light"
                    className="bg-image rounded hover-zoom hover-overlay">
                    <img
                        src={game.thumbnail}
                        className="w-100" />
                    <a href="#!">
                        <div className="mask" style={{ backgroundColor: "rgba(251, 251, 251, 0.2)", }}>
                        </div>
                    </a>
                </MDBRipple>
            </MDBCol>

            <MDBCol lg="5" md="6" className=" mb-4 mb-lg-0">
                <p>
                    <strong>{game.title}</strong>
                </p>
                <p>{game.short_description}</p>
                <Button variant="secondary" className="mr-2"
                    title="Remove item" onClick={() => removeCart(game.title)}>
                    <svg  xmlns="http://www.w3.org/2000/svg"  width="18"  height="18"  viewBox="0 0 24 24"  fill="none"  stroke="#000000"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round" ><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                </Button>

                <Button variant="danger"
                    title="Move to the wish list">
                    <svg  xmlns="http://www.w3.org/2000/svg"  width="18"  height="18"  viewBox="0 0 24 24"  fill="none"  stroke="#000000"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 20l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.96 6.053" /><path d="M16 19h6" /><path d="M19 16v6" /></svg>
                </Button>
            </MDBCol>
            <MDBCol lg="4" md="6" className="mb-4 mb-lg-0">
                <div className="d-flex mb-4" style={{ maxWidth: "300px" }}>
                    <Button className="px-3 me-2 max-h-10">
                        <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="#ffffff"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round" ><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l14 0" /></svg>
                    </Button>

                    <MDBInput defaultValue={1} min={0} type="number" label="Quantity" />

                    <Button className="px-3 ms-2 max-h-10">
                        <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="#ffffff"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round" ><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>
                    </Button>
                </div>

                <p className="text-start text-md-center">
                    <strong>${game.id}</strong>
                </p>
            </MDBCol>
        </MDBRow>
        <hr className="my-4" />

    </>
    );
};


CardItem.propTypes = {
    game: PropTypes.array,
    removeCart: PropTypes.func,
};


export default CardItem;
