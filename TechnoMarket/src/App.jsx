import { useState } from "react";
import { useGET } from "./components/customHook/CustomHook.jsx";
import Homepage from "./components/homepage/Homepage.jsx";
import Cart from "./components/cart/Cart.jsx";
import { Toaster, toast } from "sonner";

import "mdb-react-ui-kit/dist/css/mdb.min.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Loading from "./components/loading/Loading.jsx";

function App() {
  const [ProductsData, ProductsLoading, ProductsError] = useGET(
    "http://localhost:3000/products"
  );

  const [optSmModal, setOptSmModal] = useState(false);

  const toggleOpen = () => setOptSmModal(!optSmModal);

  //cerrar el modal de mas informacion

  const [ShoppingCart, setShoppingCart] = useState([]);


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
    setShoppingCart(ShoppingCart.map((item) =>
      item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  //disminuir la cantidad de un producto en el carrito
  const decreaseQuantity = (productId) => {
    setShoppingCart(ShoppingCart.map((item) =>
      item.id === productId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    ));
  };

  //FALTA LOGICA
  //eliminar priductos del carrito
  const removeCart = (gameTitle) => {
    setShoppingCart(ShoppingCart.filter((game) => game.title !== gameTitle));
  };

  if (ProductsLoading) {
    return <Loading/>;
  }

  if (ProductsError) {
    return <h1>Error... </h1>;
  }


  return (
    <div className="bg-gray-200">
      <Toaster richColors position="top-center" />
      <Homepage
        Data={ProductsData}
        addCart={addCart}
        toggleOpen={toggleOpen}
        ShoppingCart={ShoppingCart}
      />
      <Cart
        optSmModal={optSmModal}
        setOptSmModal={setOptSmModal}
        toggleOpen={toggleOpen}
        ShoppingCart={ShoppingCart}
        removeCart={removeCart}
        decreaseQuantity={decreaseQuantity}
        increaseQuantity={increaseQuantity}
      />
    </div>
  );
}

export default App;
