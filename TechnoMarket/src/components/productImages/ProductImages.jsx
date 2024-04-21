import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';


const ProductImages = ({product}) => {
    const [image, setImage] = useState(product.images[0]);

    useEffect(() => {
        setImage(product.images[0]);
    }, [product]);

    const handleImage = (img) => {
        setImage(img)
    }


    return (
        <div className='flex flex-col-reverse sm:flex-row gap-2'>
            
            <div className='flex xs:flex-row  sm:flex-col gap-2'>
                { 
                    product.images.map((img, i) => (
                        <div key={i} className='w-[50px] h-[50px] cursor-pointer rounded-sm overflow-hidden' onClick={() => handleImage(img)}>
                            <img src={img} alt="" />
                        </div>
                    ))
                }
                
            </div>

            <div className='w-[320px] h-[320px] rounded-xl overflow-hidden'>
                {image && <img src={image} key={image} alt="" className='animate-fade-in object-cover'/>}
            </div>
        </div>
    );
};


ProductImages.propTypes = {
    product: PropTypes.object,
};


export default ProductImages;
