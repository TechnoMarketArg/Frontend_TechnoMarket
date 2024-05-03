import PropTypes from 'prop-types';
import ProductDetails from '../productDetails/ProductDetails';
import ProductDescription from '../productDescription/ProductDescription';
import { ProductCardSlider } from '../productCardSlider/ProductCardSlider';


const ProductPage = ({product, Data}) => {
    return (
        <div className='flex flex-col items-center'>
            <ProductDetails product={product} />
            <ProductCardSlider Title={'More products of the trader'} Data={Data}/>
            <ProductDescription description={product.description}/>
            <ProductCardSlider Title={'Similar products'} Data={Data}/>
        </div>
    );
};


ProductPage.propTypes = {
 product: PropTypes.object,
 Data: PropTypes.array,
};


export default ProductPage;
