import { useContext } from "react";
import Carousel from "../carousel/Carousel";
import { ProductCardSlider } from "../productCardSlider/ProductCardSlider";
import Loading from "../loading/Loading";
import NavBar from "../navBar/NavBar";
import { NavBarContext } from "../navBarContext/NavBarContext.jsx";
import { useGET } from "../customHook/CustomHook.jsx";

const Homepage = () => {
  const {
    ProductsData,
    ProductsLoading,
    ProductsError,
    ShoppingCart,
    searchHandler,
    addCart,
    toggleOpen,
  } = useContext(NavBarContext);

  const [categories, Loanding, Error] = useGET(
    "http://localhost:3000/categories"
  );


  if (ProductsLoading || Loanding) {
    return <Loading />;
  }

  if (ProductsError) {
    return <h1>Error... </h1>;
  }
  

  const getProductsByDiscount = (products, minDiscount) => {
    return products.filter(product => product.offer && product.discount >= minDiscount && product.status);
  };

  const getProductsByCategory = (products, categoryName) => {
    return products.filter(
      product => product.category && product.status && product.category.some(c => c.name === categoryName)
    );
  };
  
  const offersAbove10 = getProductsByDiscount(ProductsData, 0.10);
  const computingProducts = getProductsByCategory(ProductsData, "Computing");
  const gamingProduct = getProductsByCategory(ProductsData, "Gaming");

  return (
    <>
      <NavBar/>

      <div className="animate-fade-in">
        <Carousel />
        <div className="flex flex-col gap-16 mb-10">
          <div className="w-full flex justify-center">
            <div className="max-w-[100px] flex justify-center ">
              <ProductCardSlider
                Title={"Best Offers"}
                Data={offersAbove10}
                addCart={addCart}
              />
            </div>
          </div>
          <div className="w-full flex justify-center">
            <div className="max-w-[100px] flex justify-center">
              <ProductCardSlider
                Title={"Computing"}
                Data={computingProducts}
                addCart={addCart}
              />
            </div>
          </div>
          <div className="w-full flex justify-center">
            <div className="max-w-[100px] flex justify-center">
              <ProductCardSlider
                Title={"Gaming"}
                Data={gamingProduct}
                addCart={addCart}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Homepage.propTypes = {};

export default Homepage;