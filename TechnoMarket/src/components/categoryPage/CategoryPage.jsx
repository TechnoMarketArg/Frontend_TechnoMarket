import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import { NavBarContext } from "../navBarContext/NavBarContext";
import Loading from "../loading/Loading";
import { ProductCard } from "../productCard/ProductCard";
import NavBar from "../navBar/NavBar";

const CategoryPage = () => {
  const location = useLocation();

  const { id, name } = location.state.category;

  const {
    ProductsData,
    ProductsLoading,
    ProductsError,
    addCart,
    searchHandler,
    ShoppingCart,
    toggleOpen,
  } = useContext(NavBarContext);

  if (ProductsLoading) {
    return <Loading />;
  }

  const getProductsByCategory = (products, categoryID) => {
    return products.filter(
      (product) =>
        product.category && product.category.some((c) => c.id === categoryID)
    );
  };

  const filteredProducts = getProductsByCategory(ProductsData, id);

  return (
    <>
      <NavBar
        searchHandler={searchHandler}
        ShoppingCart={ShoppingCart}
        toggleOpen={toggleOpen}
      />
      <div className="bg-gray-100 ml-2 m-4">
        <h1 className="text-3xl font-bold bg-gradient-to-l from-[rgba(15,69,113,1)] via-[rgba(56,109,189,1)] to-[rgba(0,157,221,1)] bg-clip-text text-transparent">
          {name}
        </h1>
      </div>
      <div className="flex flex-wrap gap-2 w-full justify-center my-6">
        {filteredProducts.map((product) => {
          return (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              description={product.description}
              price={product.price}
              images={product.images}
              variants={product.variants}
              offer={product.offer}
              discount={product.discount}
              addCart={addCart}
            />
          );
        })}
      </div>
    </>
  );
};

CategoryPage.propTypes = {};

export default CategoryPage;
