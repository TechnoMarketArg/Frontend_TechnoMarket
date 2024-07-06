import { useState, useEffect } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import PropTypes from 'prop-types';
import Filter from '../filter/Filter';
import FilterGroups from '../filterGroups/FilterGroups';
import { MDBBtn } from 'mdb-react-ui-kit';
//import { NavBarContext } from "../navBarContext/NavBarContext";

const FilterSearch = ({ FiltersObject }) => {
    const [show, setShow] = useState(false);
    const [isCheckedList, setIsCheckedList] = useState({});

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCheckboxChange = (filter) => {
        setIsCheckedList(prevState => ({
            ...prevState,
            [filter]: !prevState[filter]
        }));
    };

    //const { optionSelected } = useContext(NavBarContext);
    //const optFilter = isCheckedList;

    //useEffect(() => {
    //    optionSelected(optFilter);
    //}, [optFilter, optionSelected]);

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
};

FilterSearch.propTypes = {
    FiltersObject: PropTypes.array,
};

export { FilterSearch, FilterGroups, Filter };
