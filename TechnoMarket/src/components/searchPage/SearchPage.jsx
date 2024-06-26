import PropTypes from "prop-types";
import { ProductCard } from "../productCard/ProductCard";
import Footer from "../footer/Footer";
import NavFilter from "../navFilter/NavFilter";
import { NavBarContext } from "../navBarContext/NavBarContext";
import { useContext } from "react";

function SearchPage() {
  const { filteredProduct, setFilteredProduct } = useContext(NavBarContext);

  return (
    <>
   {filteredProduct == [] ? <div>
      <NavFilter />
      <div className="flex flex-wrap gap-2 mt-8">
        {filteredProduct.map((product) => (
          <ProductCard
            key={product.id}
            offer={false}
            title={product.title}
            price={product.price}
            description={product.description}
            images={product.images}
          />
        ))}
      </div>
    </div> : ''}
    </>
  );
}

SearchPage.propTypes = {
  filteredProduct: PropTypes.func,
};

export default SearchPage;
