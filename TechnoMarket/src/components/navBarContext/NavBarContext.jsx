import { useState, createContext, useContext } from "react";
import PropTypes from "prop-types";
import { toast } from "sonner";
import { useGET } from "../customHook/CustomHook";
import { AuthenticationContext } from "../../services/authentication/Authentication.context";

const NavBarContext = createContext();

const NavBarProvider = ({ children }) => {
  const [ProductsData, ProductsLoading, ProductsError] = useGET("https://cvrdqj9p-3000.brs.devtunnels.ms/products");

  const {user} = useContext(AuthenticationContext)

  const [ShoppingCart, setShoppingCart] = useState([]);

  const [filteredProduct, setFilteredProduct] = useState();

  // Funcion que va a Buscar el Contenido del Buscador en la API
  const searchHandler = (searchTerm) => {
    const filtered = ProductsData.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProduct(filtered);
  };

  //agregar productos al carrito
  const addCart = (product) => {
    if(user){
      if (ShoppingCart.some((p) => p.id == product.id)) {
        toast.warning(`${product.title} already included in the cart`);
      } else {
        toast.success(`${product.title} added to shopping cart successfully`);
        setShoppingCart([...ShoppingCart, product]);
      }
    }else{
      toast.error(`Sign in to add ${product.title} to cart`);
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
