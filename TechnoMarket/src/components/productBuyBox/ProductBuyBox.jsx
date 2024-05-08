import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { MDBBtn } from 'mdb-react-ui-kit';


const ProductBuyBox = () => {
    return (
        <div className='flex flex-col p-6 justify-between rounded-xl bg-gray-50  text-sm w-[320px] h-[320px]'>
            <div>
                <p><strong className='text-green-500'>Envío gratis</strong> a todo el país.</p>
                <p className='text-[10px] text-gray-400'>Conocé los tiempos y las formas de envío.</p>
                <p className='text-blue-400 cursor-pointer hover:text-blue-500 text-xs'>Calcular cuándo llega</p>
            </div>
            

            <div>
                <p className='font-semibold'>Stock disponible</p>
                <p>Cantidad: <span className='font-semibold'>1 unidad</span> <span className='text-gray-400'>(+50 disponibles)</span></p>
            </div>
            
            <div className='flex flex-col gap-3'>
                <MDBBtn>BUY NOW</MDBBtn>
                <MDBBtn color='warning'>ADD TO CART</MDBBtn>
            </div>
            
        </div>
    );
};


ProductBuyBox.propTypes = {

};


export default ProductBuyBox;
