import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Homepage from "./components/homepage/Homepage.jsx";
import StoreProfile from "./components/storeProfile/StoreProfile.jsx";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import ProductDetails from "./components/productDetails/ProductDetails.jsx";
import { useContext } from "react";
import { NavBarContext } from "./components/navBarContext/NavBarContext.jsx";
import Cart from "./components/cart/Cart.jsx";
import { Toaster } from "sonner";
import Login from "./components/login/Login.jsx";
import SignUp from "./components/signUp/SignUp.jsx";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import CategoryPage from "./components/categoryPage/CategoryPage.jsx";
import Footer from "./components/footer/Footer.jsx";
import ProtectedSession from "./components/protectedSession/ProtectedSession.jsx";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute.jsx";
import ProtectedRouteAdmin from "./components/protectedRouteAdmin/ProtectedRouteAdmin.jsx";
import AdminProfile from "./components/adminProfile/AdminProfile.jsx";
import SearchPage from "./components/searchPage/SearchPage.jsx";

import NotFoundPage from "./components/notFoundPage/NotFoundPage.jsx";
import ProtectedRouteSuperAdmin from "./components/protectedRouteSuperAdmin/ProtectedRouteSuperAdmin.jsx";
import SuperAdminProfile from "./components/superAdminProfile/SuperAdminProfile.jsx";
import { useDarkMode } from "./services/DarkMode/DarkModeContext.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';

import UserProfile from "./components/userProfile/UserProfile.jsx";

function App() {
  const { filteredProduct } = useContext(NavBarContext);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Homepage />
      ),
    },
    {
      path: "products/:id",
      element: <ProductDetails />,
    },
    {
      path: "searchProducts/:name",
      element: 
      <SearchPage />,
    }
    ,
    {
      path: "stores/:id",
      element: (
        <ProtectedRoute>
          <StoreProfile />
        </ProtectedRoute>
      ),
    },
    {
      path: "SignIn",
      element: (
        <ProtectedSession>
          <Login />
        </ProtectedSession>
      ),
    },
    {
      path: "SignUp",
      element: (
        <ProtectedSession>
          <SignUp />
        </ProtectedSession>
      ),
    },
    {
      path: "users/:id",
      element: (
        <ProtectedRoute>
          <UserProfile/>
        </ProtectedRoute>
      ),
    },
    {
      path: "categories/:name",
      element: <CategoryPage />,
    },
    {
      path: "admin/:id",
      element: (
        <ProtectedRoute>
          <ProtectedRouteAdmin>
            <AdminProfile/>
          </ProtectedRouteAdmin>
        </ProtectedRoute>
      ),
    },
    {
      path: "super-admin/:id",
      element: (
        <ProtectedRoute>
          <ProtectedRouteSuperAdmin>
            <SuperAdminProfile/>
          </ProtectedRouteSuperAdmin>
        </ProtectedRoute>
      ),
    },
    {
      path: "*",
      element: <NotFoundPage/>,
    },
  ]);
  const { darkMode } = useDarkMode()
  return (
    <div className={darkMode ? "bg-gray-800":"bg-gray-100"}>
      <Toaster richColors position="top-center" />
      <Cart />

      
      
      {<RouterProvider router={router} />}

      <Footer />
    </div>
  );
}

export default App;
