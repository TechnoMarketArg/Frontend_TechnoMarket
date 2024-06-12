import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { MDBBtn, MDBCheckbox } from 'mdb-react-ui-kit';

/*
<tr className="bg-gray-600/5 border-b-2">
    <td className="text-center">
        <MDBCheckbox />
    </td>
    <td className="flex justify-center items-center py-2">
        <img src="https://i.imgur.com/ZANVnHE.jpeg" className="w-16 rounded-2xl" />
    </td>
    <td className="text-center text-xs">
        Sleek White & Orange Wireless Gaming Controller
    </td>
    <td className="text-center">
        <button className="bg-green-400 px-3 py-1 rounded-3xl hover:bg-green-500 font-semibold">Active</button>
    </td>
    <td className="text-center text-sm">
        <span>1000</span> in stock
    </td>
    <td className="text-center text-sm">
        $<span>999</span>
    </td>
</tr>
*/
const InventoryItem = ({ product, AllChecked, AllActive }) => {
    const [IsChecked, setIsChecked] = useState(AllChecked);
    const [Active, setActive] = useState(AllActive);
  
    // Effect de actualizar la casilla de verificación individual cuando cambia AllChecked
    useEffect(() => {
      setIsChecked(AllChecked);
    }, [AllChecked]);
  
    // Effect de actualizar el estado activo individual cuando cambia AllActive
    useEffect(() => {
      setActive(AllActive);
    }, [AllActive]);
  
    const handleCheckboxChange = () => {
      setIsChecked(!IsChecked);
    };
  
    const handleClickActive = () => {
      setActive(!Active);
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
        <td className="flex justify-center items-center py-2">
          <img src={product.images[0]} alt="" className="w-20 rounded-2xl" />
        </td>
        <td className="text-center text-xs py-4">
          <h4>{product.title}</h4>
        </td>
        <td className="text-center">
          <MDBBtn 
            rounded 
            onClick={handleClickActive} 
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
    AllChecked: PropTypes.bool,
    AllActive: PropTypes.bool,
};


export default InventoryItem;
