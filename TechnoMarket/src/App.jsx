import './App.css';
import NavBar from "./components/navBar/NavBar";
import Spinner from 'react-bootstrap/Spinner';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import ProductPage from './components/productPage/ProductPage'; import Footer from './components/footer/Footer';
import { useGET } from './components/customHook/CustomHook';
import InventoryItem from './components/inventoryItem/InventoryItem';
import Inventory from './components/inventory/Inventory';


function App() {

  const [ProductsData, ProductsLoading, ProductsError]  = useGET('https://api.escuelajs.co/api/v1/products');

  // const FiltersObject = [
  //   { Brand: ["Apple", "Dell", "HP", "Lenovo", "Acer", "Asus", "Microsoft", "MSI", "Samsung", "Sony", "Toshiba", "Huawei"] },
  //   { colors: ["rojo", "azul", "verde", "amarillo", "naranja", "morado", "rosa", "blanco", "negro", "gris", "marrón", "turquesa"] }
  // ];

  // Funcion que va a Buscar el Contenido del Buscador en la API
  // const searchHandler = (searchTerm) => {
  //   console.log("hola");
  //   const filteredProduct = Data.filter((product) =>
  //     product.title.toLowerCase().includes(searchTerm.toLowerCase())
  //   );

  // }

  return (
    <div className=' min-h-[100vh]'>
      <div className='flex justify-center '>
        {ProductsLoading ? (
          <div className='w-[100vw] h-[80vh] flex justify-center items-center'>
            <Spinner animation="grow" variant="dark" />
          </div>
          ): (
            <>
              <Inventory products={ProductsData}/>
            </>
          )}
      </div>
    </div>
  )

}

export default App
