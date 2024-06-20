import React, { useState, createContext } from "react";
import PropTypes from "prop-types";
import { toast } from "sonner";
import { useGET } from "../customHook/CustomHook";

const NavBarContext = createContext();

const NavBarProvider = ({ children }) => {
  const [ProductsData, ProductsLoading, ProductsError] = useGET(
    "http://localhost:3000/products"
  );

  const [ShoppingCart, setShoppingCart] = useState([]);

  const [filteredProduct, setFilteredProduct] = useState();

  // Funcion que va a Buscar el Contenido del Buscador en la API
  const searchHandler = (searchTerm) => {
    const filtered = ProductsData.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProduct(filtered);
    console.log(filteredProduct);
  };

  //agregar productos al carrito
  const addCart = (product) => {
    if (ShoppingCart.some((p) => p.id == product.id)) {
      toast.warning(`${product.title} already included in the cart`);
    } else {
      toast.success(`${product.title} added to shopping cart successfully`);
      setShoppingCart([...ShoppingCart, product]);
    }
  };

  //aumentar la cantidad de un producto en el carrito
  const increaseQuantity = (productId) => {
    setShoppingCart(
      ShoppingCart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  //disminuir la cantidad de un producto en el carrito
  const decreaseQuantity = (productId) => {
    setShoppingCart(
      ShoppingCart.map((item) =>
        item.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  //FALTA LOGICA
  //eliminar priductos del carrito
  const removeCart = (gameTitle) => {
    setShoppingCart(ShoppingCart.filter((game) => game.title !== gameTitle));
  };

  const [optSmModal, setOptSmModal] = useState(false);

  const toggleOpen = () => setOptSmModal(!optSmModal);

  return (
    <NavBarContext.Provider
      value={{
        ProductsData,
        ProductsLoading,
        ProductsError,
        ShoppingCart,
        setShoppingCart,
        searchHandler,
        addCart,
        increaseQuantity,
        decreaseQuantity,
        removeCart,
        optSmModal,
        setOptSmModal,
        toggleOpen,
        filteredProduct,
        setFilteredProduct,
      }}>
      {children}
    </NavBarContext.Provider>
  );
};

NavBarProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { NavBarContext, NavBarProvider };
