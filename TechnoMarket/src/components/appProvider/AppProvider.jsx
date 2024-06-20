import React, { createContext, useContext, useState } from "react";
import { propTypes } from "react-bootstrap/esm/Image";
import { toast } from "sonner";
import PropTypes from "prop-types";

const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppProvider = ({ children }) => {
  const [ProductsData, setProductsData] = useState([]);
  const [filteredProduct, setFilteredProduct] = useState();
  const [optSmModal, setOptSmModal] = useState(false);
  const [ShoppingCart, setShoppingCart] = useState([]);

  const toggleOpen = () => setOptSmModal(!optSmModal);

  const addCart = (product) => {
    if (ShoppingCart.some((p) => p.id === product.id)) {
      toast.warning(`${product.title} already included in the cart`);
    } else {
      toast.success(`${product.title} added to shopping cart successfully`);
      setShoppingCart([...ShoppingCart, product]);
    }
  };

  const increaseQuantity = (productId) => {
    setShoppingCart(
      ShoppingCart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (productId) => {
    setShoppingCart(
      ShoppingCart.map((item) =>
        item.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  };

  const removeCart = (gameTitle) => {
    setShoppingCart(ShoppingCart.filter((game) => game.title !== gameTitle));
  };

  const searchHandler = (searchTerm) => {
    const filtered = ProductsData.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProduct(filtered);
  };

  return (
    <AppContext.Provider
      value={{
        ProductsData,
        setProductsData,
        filteredProduct,
        optSmModal,
        setOptSmModal,
        toggleOpen,
        ShoppingCart,
        addCart,
        increaseQuantity,
        decreaseQuantity,
        removeCart,
        searchHandler,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };