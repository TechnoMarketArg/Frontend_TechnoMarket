import React from 'react';
import PropTypes from 'prop-types';
import { MDBCheckbox } from 'mdb-react-ui-kit';


const InventoryItem = (ProductsData) => {
    console.log(ProductsData[10])
    return (
        <div>
            <MDBCheckbox name={ProductsData.title} id={ProductsData.id} value={ProductsData.title} aria-label={ProductsData.title}/>
            <img src={ProductsData.images[0]} alt="" />
        </div>
    );
};


InventoryItem.propTypes = {
    ProductsData: PropTypes.array
};


export default InventoryItem;
