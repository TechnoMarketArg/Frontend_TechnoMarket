import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MDBBtn, MDBCheckbox } from 'mdb-react-ui-kit';


const InventoryItem = ({product}) => {

    const [Active, setActive] = useState(true)

    const hanleClickActive = () => {
        setActive(!Active)
    }

    const stock = 10

    return (
        <div className='flex gap-8 items-center w-full'>
            <MDBCheckbox name={product.title} id={product.id} value={product.title} aria-label={product.title}/>
            <img src={product.images[0]} alt="" className='w-20'/>
            <h4>{product.title}</h4>
            <MDBBtn rounded color={Active ? 'success' : 'danger'} onClick={hanleClickActive}>{Active ? 'Active' : 'Disabled'}</MDBBtn>
            <h5>{stock}</h5>
            <h5>${product.price}</h5>
        </div>
    );
};


InventoryItem.propTypes = {
    product: PropTypes.object
};


export default InventoryItem;
