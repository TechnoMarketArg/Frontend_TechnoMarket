import PropTypes from "prop-types";
import ProductImages from "../productImages/ProductImages";
import ProductInformation from "../productInformation/ProductInformation";
import ProductBuyBox from "../productBuyBox/ProductBuyBox";
import { useLocation } from "react-router-dom";
import { useContext, useEffect } from "react";
import { NavBarContext } from "../navBarContext/NavBarContext";
import NavBar from "../navBar/NavBar";
import { useGET } from "../customHook/CustomHook";
import Loading from "../loading/Loading";
import ProductCommentWithAvatarAndRating from "../productCommentWithAvatarAndRating/ProductCommentWithAvatarAndRating";
import { useDarkMode } from "../../services/DarkMode/DarkModeContext";

const ProductDetails = () => {
  const { darkMode } = useDarkMode();
  const { ShoppingCart, searchHandler, toggleOpen } = useContext(NavBarContext);

  const location = useLocation();

  const { id } = location.state.product;

  const [product, l, e] = useGET(`http://localhost:3000/products/${id}`);

  if (l) {
    return <Loading />;
  }
  if (e) {
    return <>Error...</>;
  }

  return (
    <div>
      <NavBar
        searchHandler={searchHandler}
        ShoppingCart={ShoppingCart}
        toggleOpen={toggleOpen}
      />
      <div
        className={`flex flex-col sm:flex-row gap-2 sm:gap-10 flex-wrap m-8 p-4 rounded-xl border-2 ${
          darkMode ? "bg-gray-700 border-gray-900" : "bg-gray-200 border-white"
        }`}>
        <div>
          <ProductImages product={product} />
        </div>
        <ProductInformation product={product} />
        <ProductBuyBox product={product} />
      </div>
      <div className="flex flex-col items-center">
        <div className="ml-2 mb-4 w-[55vw]">
          <h1 className="text-3xl font-bold bg-gradient-to-l from-[rgba(15,69,113,1)] via-[rgba(56,109,189,1)] to-[rgba(0,157,221,1)] bg-clip-text text-transparent">
            Comments
          </h1>
        </div>
        <div className="w-[60vw] bg-gray-200 mb-4 rounded-md">
          {product.comments &&
            product.comments.map((comment) => {
              return (
                <ProductCommentWithAvatarAndRating
                  key={comment.name}
                  name={comment.name}
                  rating={comment.rating}
                  comment={comment.comments}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

ProductDetails.propTypes = {
  product: PropTypes.object,
};

export default ProductDetails;
