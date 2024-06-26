import { useState, createContext, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { toast } from "sonner";
import { useGET } from "../customHook/CustomHook";
import { AuthenticationContext } from "../../services/authentication/Authentication.context";

const NavBarContext = createContext();

const NavBarProvider = ({ children }) => {
  const [ProductsData, ProductsLoading, ProductsError] = useGET("http://localhost:3000/products");
  const { user } = useContext(AuthenticationContext);

  // Inicializar el carrito desde localStorage
  const [ShoppingCart, setShoppingCart] = useState(() => {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  });

  const [filteredProduct, setFilteredProduct] = useState([]);

  // Guardar el carrito en localStorage cada vez que se actualice
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(ShoppingCart));
  }, [ShoppingCart]);

  // Función que busca el contenido del buscador en la API
  const searchHandler = (searchTerm) => {
    const filtered = ProductsData.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProduct(filtered);
  };

  // Agregar productos al carrito
  const addCart = (product) => {
    if (user) {
      if (ShoppingCart.some((p) => p.id === product.id)) {
        toast.warning(`${product.title} already included in the cart`);
      } else {
        toast.success(`${product.title} added to shopping cart successfully`);
        setShoppingCart([...ShoppingCart, { ...product, quantity: 1 }]);
      }
    } else {
      toast.error(`Sign in to add ${product.title} to cart`);
    }
  };

  // Aumentar la cantidad de un producto en el carrito
  const increaseQuantity = (productId) => {
    setShoppingCart(
      ShoppingCart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Disminuir la cantidad de un producto en el carrito
  const decreaseQuantity = (productId) => {
    setShoppingCart(
      ShoppingCart.map((item) =>
        item.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Eliminar productos del carrito
  const removeCart = (productId) => {
    const updatedCart = ShoppingCart.filter((item) => item.id !== productId);
    setShoppingCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const cleanCart = () => {
    setShoppingCart([]);
    localStorage.removeItem('cart')
    toast.success("All items have been removed from the cart");
  }

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
        cleanCart
      }}>
      {children}
    </NavBarContext.Provider>
  );
};

NavBarProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { NavBarContext, NavBarProvider };
