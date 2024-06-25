import PropTypes from "prop-types";
import ProductImages from "../productImages/ProductImages";
import ProductInformation from "../productInformation/ProductInformation";
import ProductBuyBox from "../productBuyBox/ProductBuyBox";
import { useLocation } from "react-router-dom";
import { useContext, useEffect } from "react";
import { NavBarContext } from "../navBarContext/NavBarContext";
import NavBar from "../navBar/NavBar";

const ProductDetails = () => {

  const {
    ShoppingCart,
    searchHandler,
    toggleOpen,
  } = useContext(NavBarContext);

  const location = useLocation();

  const { id, title, price, images, description, variants } = location.state.product;

  const product = {
    id: id,
    title: title,
    price: price,
    images: images,
    description: description,
    variants,
    quantity: 1,
  };
  return (
    <>
    <NavBar
        searchHandler={searchHandler}
        ShoppingCart={ShoppingCart}
        toggleOpen={toggleOpen}

        
      />
       
        

      <div className="flex flex-col sm:flex-row gap-2 sm:gap-10 flex-wrap m-8 p-4 rounded-xl bg-gray-100 border-white border-2">
        <div>
          <ProductImages product={product} />
        </div>
        <ProductInformation product={product}  />
        <ProductBuyBox product={product} />
      </div>
    </>
  );
};

ProductDetails.propTypes = {
  product: PropTypes.object,
};

export default ProductDetails;
