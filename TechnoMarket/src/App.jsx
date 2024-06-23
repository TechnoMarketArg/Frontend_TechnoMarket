import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Homepage from "./components/homepage/Homepage.jsx";
import StoreProfile from "./components/storeProfile/StoreProfile.jsx";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ProductDetails from "./components/productDetails/ProductDetails.jsx";
import NavBar from "./components/navBar/NavBar.jsx";
import { useContext, useState } from "react";
import { NavBarContext } from "./components/navBarContext/NavBarContext.jsx";
import SearchPage from "./components/searchPage/SearchPage.jsx";
import { CartItem } from "./components/cartItems/CartItem.jsx";
import Cart from "./components/cart/Cart.jsx";
import { Toaster } from "sonner";
import PublishProduct from "./components/publishProduct/PublishProduct.jsx";


function App() {
  const {
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
  } = useContext(NavBarContext);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        //proteger ruta
        <Homepage
          optSmModal={optSmModal}
          setOptSmModal={setOptSmModal}
          toggleOpen={toggleOpen}
          ShoppingCart={ShoppingCart}
          removeCart={removeCart}
          decreaseQuantity={decreaseQuantity}
          increaseQuantity={increaseQuantity}
          ProductsData={ProductsData}
          addCart={addCart}
          ProductsLoading={ProductsLoading}
          ProductsError={ProductsError}
        />
      ),
    },
    {
      path: "products/:id",
      element: <ProductDetails />,
    },
    {
      path: "store/:id",
      element: <StoreProfile />,
    },
  ]);

  const [publishModal, setPublishModal] = useState(false);

  const toggleOpenModal = () => setPublishModal(!publishModal);

  return (
    <div className="bg-gray-100">
      <Toaster richColors position="top-center" />

      <Cart
        optSmModal={optSmModal}
        setOptSmModal={setOptSmModal}
        toggleOpen={toggleOpen}
        ShoppingCart={ShoppingCart}
        removeCart={removeCart}
        decreaseQuantity={decreaseQuantity}
        increaseQuantity={increaseQuantity}
      />
      <NavBar
        searchHandler={searchHandler}
        ShoppingCart={ShoppingCart}
        toggleOpen={toggleOpen}
      />

      <button onClick={toggleOpenModal}>tade trolo</button>

      <PublishProduct toggleOpen={toggleOpenModal} setOptSmModal={setPublishModal} optSmModal={publishModal} />
      {filteredProduct ? <SearchPage filteredProduct={filteredProduct} /> : ""}
      {<RouterProvider router={router} />}
    </div>
  );
}

export default App;
