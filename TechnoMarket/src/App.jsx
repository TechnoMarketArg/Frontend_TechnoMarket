import './App.css';
import NavBar from "./components/navBar/NavBar";
import Spinner from 'react-bootstrap/Spinner';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import ProductPage from './components/productPage/ProductPage'; import Footer from './components/footer/Footer';
import { useGET } from './components/customHook/CustomHook';
import InventoryItem from './components/inventoryItem/InventoryItem';
import Inventory from './components/inventory/Inventory';
import StoreProfile from './components/storeProfile/StoreProfile';


function App() {

  const [ProductsData, ProductsLoading, ProductsError]  = useGET('https://api.escuelajs.co/api/v1/products');

  console.log(ProductsData)

  return (
      <div>
        {ProductsLoading ? (
          <div className='w-[100vw] h-[80vh] flex justify-center items-center'>
            <Spinner animation="grow" variant="dark" />
          </div>
          ): (
            <>
              <NavBar/>
              <StoreProfile ProductsData={ProductsData}/>
            </>
          )}
      </div>
  )

}

export default App
