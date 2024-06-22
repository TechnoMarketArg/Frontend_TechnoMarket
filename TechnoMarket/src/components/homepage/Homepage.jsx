import { useContext, useState } from "react";
import PropTypes from "prop-types";
import Carousel from "../carousel/Carousel";
import { ProductCardSlider } from "../productCardSlider/ProductCardSlider";
import { ProductCard } from "../productCard/ProductCard";
import { FilterSearch } from "../filterSearch/FilterSearch";
import Footer from "../footer/Footer";
import SearchPage from "../searchPage/SearchPage";
import { useGET } from "../customHook/CustomHook";
import Cart from "../cart/Cart.jsx";
import { Toaster, toast } from "sonner";
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

  return (
    <>
      <NavBar
        searchHandler={searchHandler}
        ShoppingCart={ShoppingCart}
        toggleOpen={toggleOpen}
      />

      <div className="animate-fade-in">
        <Carousel />
        <div className="flex flex-col gap-16">
          <div className="w-full flex justify-center">
            <div className="max-w-[100px] flex justify-center">
              <ProductCardSlider
                Title={"Ofertas"}
                Data={ProductsData}
                addCart={addCart}
              />
            </div>
          </div>
          <div className="w-full flex justify-center">
            <div className="max-w-[100px] flex justify-center">
              <ProductCardSlider
                Title={"Computing"}
                Data={ProductsData}
                addCart={addCart}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-8">
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
          <Footer />
        </div>
      </div>
    </>
  );
};

Homepage.propTypes = {};

export default Homepage;
