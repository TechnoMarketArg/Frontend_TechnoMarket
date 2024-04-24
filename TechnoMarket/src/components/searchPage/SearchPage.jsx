import PropTypes from 'prop-types'
import { ProductCard } from '../productCard/ProductCard'
import Footer from '../footer/Footer';

function SearchPage({ filteredProduct }) {


  return (
    <div>
      <div className='flex flex-wrap gap-2 mt-8'>
                {
                    filteredProduct.map(product => (
                        <ProductCard
                            key={product.id}
                            offer={false}
                            title={product.title}
                            price={product.price}
                            description={product.description}
                            images={product.images}
                        />
                    ))
                }
            <Footer/>
            </div>
    </div>
  )
}

SearchPage.propTypes = {
    filteredProduct: PropTypes.func
}

export default SearchPage

