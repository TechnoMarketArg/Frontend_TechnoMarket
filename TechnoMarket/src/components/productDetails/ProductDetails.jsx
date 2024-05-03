import PropTypes from 'prop-types';
import ProductImages from '../productImages/ProductImages';
import ProductInformation from '../productInformation/ProductInformation';
import ProductBuyBox from '../productBuyBox/ProductBuyBox';


const ProductDetails = ({product}) => {
    return (
        <div className='flex flex-col sm:flex-row gap-2 sm:gap-10 flex-wrap m-8 p-4 rounded-xl bg-gray-100 border-white border-2'>
            <div>
                <ProductImages product={product}/>
            </div>
            <ProductInformation product={product}/>
            <ProductBuyBox product={product}/>
        </div>
    );
};


ProductDetails.propTypes = {
    product: PropTypes.object
};


export default ProductDetails;
