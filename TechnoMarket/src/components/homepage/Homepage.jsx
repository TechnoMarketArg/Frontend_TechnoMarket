import { useContext } from "react";
import Carousel from "../carousel/Carousel";
import { ProductCardSlider } from "../productCardSlider/ProductCardSlider";
import Loading from "../loading/Loading";
import NavBar from "../navBar/NavBar";
import { NavBarContext } from "../navBarContext/NavBarContext.jsx";

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

  if (ProductsLoading) {
    return <Loading />;
  }

  if (ProductsError) {
    return <h1>Error... </h1>;
  }
  

  const getProductsByDiscount = (products, minDiscount) => {
    return products.filter(product => product.offer && product.discount >= minDiscount);
  };

  const getProductsByCategory = (products, categoryName) => {
    return products.filter(
      product => product.category && product.category.some(c => c.name === categoryName)
    );
  };
  
  const offersAbove10 = getProductsByDiscount(ProductsData, 0.10);
  const computingProducts = getProductsByCategory(ProductsData, "Computing");
  const gamingProduct = getProductsByCategory(ProductsData, "Gaming");

  return (
    <>
      <NavBar
        searchHandler={searchHandler}
        ShoppingCart={ShoppingCart}
        toggleOpen={toggleOpen}
      />

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

        {/*<div className="flex flex-wrap gap-2 mt-8">
          {ProductsData.map((product) => (
            <ProductCard
              key={product.id}
              offer={product.offer}
              id={product.id}
              title={product.title}
              price={product.price}
              description={product.description}
              images={product.images}
              variants={product.variants}
              discount={product.discount}
              addCart={addCart}
            />
          ))}
        </div>*/}
      </div>
    </>
  );
};

Homepage.propTypes = {};

export default Homepage;
