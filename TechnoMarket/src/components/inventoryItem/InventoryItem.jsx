import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { MDBBtn, MDBCheckbox } from 'mdb-react-ui-kit';

const InventoryItem = ({ product, IsChecked, handleClickCheckbox, handleClickActive }) => {
  const [Active, setActive] = useState(product.status);

  useEffect(() => {
    setActive(product.status);
  }, [product.status]);

  const handleCheckboxChange = () => {
    handleClickCheckbox(product.id, !IsChecked);
  };

  const handleButtonClick = () => {
    handleClickActive(product.id, !Active);
  };

  const stock = 10;

  return (
    <tr className={IsChecked ? "bg-blue-600/10 border-b-2" : "bg-gray-600/10 border-b-2"}>
      <td className="text-center">
        <MDBCheckbox 
          name={product.title} 
          id={product.id} 
          value={product.title} 
          aria-label={product.title} 
          checked={IsChecked} 
          onChange={handleCheckboxChange}
        />
      </td>
      <td className="flex justify-center items-center py-2 bg-white">
        <img src={product.images[0]} alt="" className="w-20 h-20 object-contain rounded-2xl" />
      </td>
      <td className="text-center text-xs py-4">
        <h4>{product.title}</h4>
      </td>
      <td className="text-center">
        <MDBBtn 
          rounded 
          onClick={handleButtonClick} 
          color={Active ? 'success' : 'danger'} 
          className={Active ? "px-8 mx-2" : "mx-2"}
        >
          {Active ? 'Active' : 'Disabled'}
        </MDBBtn>
      </td>
      <td className="text-center text-sm">
        <span className='mx-2 font-semibold'>
          {stock} in stock
        </span>
      </td>
      <td className="text-center text-sm">
        <span className='mx-2 font-semibold'>
          ${product.price}
        </span>
      </td>
    </tr>
  );
};

InventoryItem.propTypes = {
  product: PropTypes.object,
  IsChecked: PropTypes.bool,
  handleClickCheckbox: PropTypes.func,
  handleClickActive: PropTypes.func,
};

export default InventoryItem;
