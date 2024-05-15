import PropTypes from 'prop-types';
import ProductDetails from '../productDetails/ProductDetails';
import ProductDescription from '../productDescription/ProductDescription';
import { ProductCardSlider } from '../productCardSlider/ProductCardSlider';
import ProductReviews from '../productReviews/ProductReviews';


const ProductPage = ({product, Data}) => {
    return (
        <div className='flex flex-col items-center animate-blurred-fade-in'>
            <ProductDetails product={product} />
            <ProductCardSlider Title={'More products of the trader'} Data={Data}/>
            <ProductDescription description={product.description}/>
            <ProductCardSlider Title={'Similar products'} Data={Data}/>
            <div className='w-full flex justify-center'>
            <ProductReviews/>
      </div>
        </div>
    );
};


ProductPage.propTypes = {
 product: PropTypes.object,
 Data: PropTypes.array,
};


export default ProductPage;
