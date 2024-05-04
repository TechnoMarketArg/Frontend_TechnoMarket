import PropTypes from 'prop-types';
import { FaCircle } from "react-icons/fa";
import { MDBBtn, MDBBtnGroup } from 'mdb-react-ui-kit';
import { useState } from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

const ProductInformation = ({ product }) => {

    const features = [
        { brand: "ASUS" },
        { condition: "New" },
        { Color: "Black" },
        { Graphic: "NVIDIA GeForce GTX 1650" },

    ]

    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);

    const handleSizeSelection = (size) => {
        setSelectedSize(size);
    };

    const handleColorSelection = (color) => {
        setSelectedColor(color);
    };

    const rating = 3.5

    return (
        <div className='w-[380px] min-h-[380px] bg-gray-50 p-6 flex flex-col gap-2 rounded-xl'>
            <span className='text-sm text-blue-400 cursor-pointer hover:text-blue-500'>{product.category.name}</span>
            <h2 className='text-xl font-semibold'>{product.title}</h2>
            <div className="flex">
                <div className=' text-sm mr-2'>
                    {rating}
                </div>
                <Stack spacing={1}>
                    <Rating name="half-rating" readOnly size="small" precision={0.5} defaultValue={rating} />
                </Stack>
                <div className='text-sm ml-2'>
                    (10)
                </div>
            </div>
            <div className='text-2xl font-semibold'>${product.price}</div>
            <hr />
            <table className='min-w-[200px] overflow-y-scroll scrollbar-thumb-gray-500 scrollbar-track-gray-200 text-xs'>
                {features.map((feature, index) => (
                    <tbody key={index}>
                        {Object.entries(feature).map(([key, value], index) => (
                            <tr key={index}>
                                <td className='font-bold '>{key}:</td>
                                <td>{value}</td>
                            </tr>
                        ))}

                    </tbody>
                ))}
            </table>
            <div className='flex flex-col my-4'>
                <h5 className='text-sm font-bold'>CPU:</h5>
                <MDBBtnGroup shadow="10">
                    {['Intel Core  i3', 'Intel Core i5', 'Intel Core i7'].map(size => (
                        <MDBBtn
                            outline={!selectedSize || selectedSize !== size}
                            color={selectedSize === size ? 'primary' : 'secondary'}
                            onClick={() => handleSizeSelection(size)}
                            key={size}
                            className='text-[9.6px] font-bold'
                        >
                            {size}
                        </MDBBtn>
                    ))}
                </MDBBtnGroup>
            </div>
            <div className='flex flex-col my-4'>
                <h5 className='text-sm font-bold'>Computer memory size:</h5>
                <MDBBtnGroup shadow="10">
                    {['8 GB', '16 GB', '32 GB'].map(color => (
                        <MDBBtn
                            outline={!selectedColor || selectedColor !== color}
                            color={selectedColor === color ? 'primary' : 'secondary'}
                            onClick={() => handleColorSelection(color)}
                            key={color}
                        >
                            {color}
                        </MDBBtn>
                    ))}
                </MDBBtnGroup>
            </div>
            <div>
                <a href='#description' className='text-sm font-semibold text-blue-400 cursor-pointer hover:text-blue-500 underline'>General description</a>

                {/*<div className='max-h-[120px] overflow-y-scroll scrollbar-thumb-gray-500 scrollbar-track-gray-200 p-1'>
                    <p className='text-xs text-justify'>{product.description}</p>
                </div>*/}
            </div>

        </div>
    );
};


ProductInformation.propTypes = {
    product: PropTypes.object,
};


export default ProductInformation;
