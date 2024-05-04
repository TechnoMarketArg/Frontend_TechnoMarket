import './App.css';
import NavBar from "./components/navBar/NavBar";
import Spinner from 'react-bootstrap/Spinner';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import ProductPage from './components/productPage/ProductPage'; import Footer from './components/footer/Footer';
import { useGET } from './components/customHook/CustomHook';


function App() {

  const [ProductsData, ProductsLoading, ProductsError]  = useGET('https://api.escuelajs.co/api/v1/products');

  /*const FiltersObject = [
    { Brand: ["Apple", "Dell", "HP", "Lenovo", "Acer", "Asus", "Microsoft", "MSI", "Samsung", "Sony", "Toshiba", "Huawei"] },
    { colors: ["rojo", "azul", "verde", "amarillo", "naranja", "morado", "rosa", "blanco", "negro", "gris", "marrón", "turquesa"] }
  ];*/

  // Funcion que va a Buscar el Contenido del Buscador en la API
  const searchHandler = (searchTerm) => {
    console.log("hola");
    const filteredProduct = Data.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  }

  return (
    <div className=' min-h-[100vh]'>
      <NavBar searchHandler={searchHandler} />
        {/*<Stack spacing={1}>
          <Rating name="half-rating" readOnly size="large" precision={0.5} defaultValue={2.5}/>
  </Stack>*/}
      <div className='flex justify-center'>
        {ProductsLoading ? <Spinner animation="grow" variant="light" /> : <ProductPage product={ProductsData[0]} Data={ProductsData} />}
      </div>
      
    <Footer />
    </div>
  )

}

export default App
