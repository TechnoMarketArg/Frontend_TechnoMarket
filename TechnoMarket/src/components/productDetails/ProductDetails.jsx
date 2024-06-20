import PropTypes from "prop-types";
import ProductImages from "../productImages/ProductImages";
import ProductInformation from "../productInformation/ProductInformation";
import ProductBuyBox from "../productBuyBox/ProductBuyBox";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const ProductDetails = () => {
  const location = useLocation();

  const { id, title, price, images, description } = location.state.product;

  useEffect(() => {
    if (!title) {
      // Redirige a una página de error o a la página principal si el producto no está disponible
      // navigate("/error"); Asegúrate de tener una ruta de error configurada
      console.log("Error");
    }
  }, [title]);

  if (!title) {
    return <div>Loading...</div>; // Muestra un mensaje de carga mientras redirige
  }

  const product = {
    id: id,
    title: title,
    price: price,
    images: images,
    description: description,
    quantity: 1,
  };
  return (
    <>
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-10 flex-wrap m-8 p-4 rounded-xl bg-gray-100 border-white border-2">
        <div>
          <ProductImages product={product} />
        </div>
        <ProductInformation product={product} />
        <ProductBuyBox product={product} />
      </div>
    </>
  );
};

ProductDetails.propTypes = {
  product: PropTypes.object,
};

export default ProductDetails;