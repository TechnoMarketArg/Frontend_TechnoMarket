import PropTypes from 'prop-types';
import ProductImages from '../productImages/ProductImages';
import ProductInformation from '../productInformation/ProductInformation';
import ProductBuyBox from '../productBuyBox/ProductBuyBox';


const ProductDetails = ({product}) => {
    return (
        <div className='max-w-[1184px] flex flex-col sm:flex-row gap-2 sm:gap-10 flex-wrap'>
            <ProductImages product={product}/>
            <ProductInformation product={product}/>
            <ProductBuyBox product={product}/>
        </div>
    );
};


ProductDetails.propTypes = {
    product: PropTypes.object
};


export default ProductDetails;
