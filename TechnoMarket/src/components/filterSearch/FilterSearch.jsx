import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import PropTypes from 'prop-types';
import Filter from '../filter/Filter';
import FilterGroups from '../filterGroups/FilterGroups';
import { MDBBtn } from 'mdb-react-ui-kit';

//const FiltersObject = [
//    { Brand: ["Apple", "Dell", "HP", "Lenovo", "Acer", "Asus", "Microsoft", "MSI", "Samsung", "Sony", "Toshiba", "Huawei"] },
//    { colors: ["rojo", "azul", "verde", "amarillo", "naranja", "morado", "rosa", "blanco", "negro", "gris", "marrón", "turquesa"] }
//];

const FilterSearch = ({FiltersObject}) => {

    const [show, setShow] = useState(false);
    const [isCheckedList, setIsCheckedList] = useState({});

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCheckboxChange = (filter) => {
        setIsCheckedList(prevState => ({
            ...prevState,
            [filter]: !prevState[filter]
        }));
    }

    return (
        <>
            <MDBBtn onClick={handleShow} color='info'>
                Filter
            </MDBBtn>

            <Offcanvas show={show} onHide={handleClose} color='info'>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title className='text-2xl font-mono text-blue-700'>TechnoMarket</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <FilterGroups 
                        filters={FiltersObject} 
                        isCheckedList={isCheckedList} 
                        handleCheckboxChange={handleCheckboxChange} 
                    />
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}


FilterSearch.propTypes = {
    FiltersObject: PropTypes.array,
};


export { FilterSearch, FilterGroups, Filter };
