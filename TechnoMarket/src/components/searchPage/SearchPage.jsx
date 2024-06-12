import PropTypes from 'prop-types'
import { ProductCard } from '../productCard/ProductCard'
import Footer from '../footer/Footer';
import NavFilter from '../navFilter/NavFilter';

function SearchPage({ filteredProduct }) {
  const FiltersObject = [
    { Brand: ["Apple", "Dell", "HP", "Lenovo", "Acer", "Asus", "Microsoft", "MSI", "Samsung", "Sony", "Toshiba", "Huawei"] },
     { colors: ["rojo", "azul", "verde", "amarillo", "naranja", "morado", "rosa", "blanco", "negro", "gris", "marrón", "turquesa"] }
  ];

  return (
    <div>
      <NavFilter/>
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
            </div>
    </div>
  )
}

SearchPage.propTypes = {
    filteredProduct: PropTypes.func
}

export default SearchPage

