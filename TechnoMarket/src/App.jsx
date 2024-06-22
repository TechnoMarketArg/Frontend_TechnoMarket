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
import Login from "./components/login/Login.jsx";
import { AuthenticationContextProvider } from "./services/authentication/Authentication.context.jsx";
import SignUp from "./components/signUp/SignUp.jsx";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';


function App() {
  const { filteredProduct } = useContext(NavBarContext);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        //proteger ruta
        <Homepage />
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
    {
      path: "SignIn",
      element: (
          <Login />
      ),
    },
    {
      path: "SignUp",
      element: (
          <SignUp />
      ),
    },
  ]);

  return (
    <div className="bg-gray-100">
      <Toaster richColors position="top-center" />

      <Cart />

      {filteredProduct ? <SearchPage filteredProduct={filteredProduct} /> : ""}

      {<RouterProvider router={router} />}
    </div>
  );
}

export default App;
