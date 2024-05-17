import PropTypes from 'prop-types';
import { MDBCheckbox } from 'mdb-react-ui-kit';
import InventoryItem from '../inventoryItem/InventoryItem';


const Inventory = ({products}) => {
    return (
        <div className='rounded-t-2xl'>
            <div className='flex gap-10'>
                <p>All</p>
                <p>Active</p>
                <p>Disabled</p>
                <p>Draft</p>
            </div>
            <div className='flex gap-8'>
                <MDBCheckbox/>
                <span className='w-20'></span>
                <h4>Product</h4>
                <h4>Status</h4>
                <h4>Stock</h4>
                <h4>Price</h4>
            </div>
            <div>
                {
                    products.map(product => (
                        <InventoryItem product={product} key={product.id}/>
                    ))
                }
            </div>
        </div>
    );
};


Inventory.propTypes = {
    products: PropTypes.array,
};


export default Inventory;
