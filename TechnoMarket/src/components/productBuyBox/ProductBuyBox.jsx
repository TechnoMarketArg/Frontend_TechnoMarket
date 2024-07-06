import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { MDBBtn } from 'mdb-react-ui-kit';
import { NavBarContext } from '../navBarContext/NavBarContext';
import { useDarkMode } from '../../services/DarkMode/DarkModeContext';


const ProductBuyBox = ({ product }) => {
    const { darkMode } = useDarkMode();
    const [quantity, setQuantity] = useState(1);

    const {
        addCart
      } = useContext(NavBarContext);

    const handleChange = (event) => {
        setQuantity(event.target.value);
    };

    
    const date = '12/05/2024'

    return (
        <div className={`flex flex-col p-6 justify-between rounded-xl ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-50 text-sm'} w-[380px] h-[380px]`}>
          <div className={`text-3xl font-semibold ${!product.quantity && 'text-gray-400'}`}>
            ${(product.price * quantity).toFixed(1)}
          </div>
          <div>
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>approximate delivery dates: <span className='font-semibold'>{product.quantity ? date : '-'}</span></p>
            <p className={`${darkMode ? 'text-gray-400' : 'text-[10px] text-gray-400'}`}>Know the shipping times and methods.</p>
            <a href='https://www.whatsapp.com/?lang=es_LA' target='_blank' rel='noopener noreferrer' className={`text-blue-400 cursor-pointer hover:text-blue-500 ${darkMode ? 'text-gray-300' : 'text-xs'}`}>Contact the seller to coordinate shipment</a>
          </div>
      
          <div>
            <p className={`${product.quantity ? 'font-semibold text-green-600' : 'font-semibold text-red-700'}`}>{product.quantity ? "Available Stock" : "out of Stock"}</p>
            <span className={`${!product.quantity && 'text-gray-400'}`}>
              <p>quantity: <input
                type="number"
                value={product.quantity ? quantity : '0'}
                onChange={handleChange}
                min="1"
                max={product.quantity}
                disabled={!product.quantity}
                className='w-10 mx-2 pl-1 py-1 text-black'
              /><span className='font-semibold'>unidad</span> <span className='text-gray-400'>({product.quantity} disponibles)</span></p>
            </span>
          </div>
      
          <div className='flex flex-col gap-3'>
            <MDBBtn rounded disabled={!product.quantity}>BUY NOW</MDBBtn>
            <MDBBtn rounded color='warning' disabled={!product.quantity} onClick={() => addCart(product)}>ADD TO CART</MDBBtn>
          </div>
        </div>
      );
      
};


ProductBuyBox.propTypes = {
    product: PropTypes.object,
};


export default ProductBuyBox;
