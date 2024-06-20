import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { MDBBtn } from 'mdb-react-ui-kit';
import { NavBarContext } from '../navBarContext/NavBarContext';


const ProductBuyBox = ({ product }) => {
    const [quantity, setQuantity] = useState(1);

    const {
        addCart
      } = useContext(NavBarContext);

    const handleChange = (event) => {
        setQuantity(event.target.value);
    };

    const stock = 10
    const distance = 500
    const weight = 1.1
    const priceDistance = 0.01
    const date = '12/05/2024'

    return (
        <div className='flex flex-col p-6 justify-between rounded-xl bg-gray-50  text-sm w-[380px] h-[380px] '>
            <div className={stock ? 'text-3xl font-semibold' : 'text-3xl font-semibold text-gray-400'}>
                ${(((product.price * quantity) * weight) + (distance * priceDistance)).toFixed(1)}
            </div>
            <div>
                <p className='text-gray-500'>approximate delivery dates: <span className='font-semibold'>{stock ? date: '-'}</span></p>
                <p className='text-[10px] text-gray-400'>Know the shipping times and methods.</p>
                <p className='text-blue-400 cursor-pointer hover:text-blue-500 text-xs'>Calculate when it arrives</p>
            </div>


            <div>
                <p className={stock ? 'font-semibold text-green-600' : 'font-semibold text-red-700'}>{stock ? "Available Stock" : "out of Stock"}</p>
                <span className={stock ? '' : 'text-gray-400'}>
                    <p>quantity: <input
                        type="number"
                        value={stock ? quantity : '0'}
                        onChange={handleChange}
                        min="1"
                        max={stock}
                        disabled={stock ? false : true}
                        className='w-10 mx-2 pl-1 py-1'
                    /><span className='font-semibold'>unidad</span> <span className='text-gray-400'>({stock} disponibles)</span></p>
                </span>
            </div>

            <div className='flex flex-col gap-3'>
                <MDBBtn rounded disabled={stock ? false : true}>BUY NOW</MDBBtn>
                <MDBBtn rounded color='warning' disabled={stock ? false : true} onClick={() => addCart(product)}>ADD TO CART</MDBBtn>
            </div>

        </div>
    );
};


ProductBuyBox.propTypes = {
    product: PropTypes.object,
};


export default ProductBuyBox;
