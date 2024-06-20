import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Homepage from "./components/homepage/Homepage.jsx";
import StoreProfile from "./components/storeProfile/StoreProfile.jsx"
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ProductDetails from "./components/productDetails/ProductDetails.jsx";

function App() {
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
      element: <ProductDetails/>,
    },
    {
      path: "store/:id",
      element: <StoreProfile/>,
    }
  ]);

  return (
    <div className="bg-gray-100">
      {<RouterProvider router={router} />}
    </div>
  );
}

export default App;
