import { useState, useEffect } from 'react'
import axios from 'axios';
import './App.css'
import ProductDetails from './components/productDetails/ProductDetails';
import Spinner from 'react-bootstrap/Spinner';
import { ProductCard } from './components/productCard/ProductCard'
import { ProductCardSlider } from './components/productCardSlider/ProductCardSlider'
import { FilterSearch } from './components/filterSearch/FilterSearch';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import {Avatar} from "@nextui-org/react";
import ProductPage from './components/productPage/ProductPage';

function App() {
  // URL de la API externa que queremos consultar
  const URL = 'https://api.escuelajs.co/api/v1/products';

  // Estado para almacenar los datos obtenidos de la API
  const [Data, setData] = useState([]);

  // Estado para indicar si la solicitud está en curso
  const [Loading, setLoading] = useState(true);

  // Estado para almacenar cualquier error que ocurra durante la solicitud
  const [Error, setError] = useState(null);

  // useEffect se utiliza para realizar la solicitud a la API cuando el componente se monta
  useEffect(() => {
    // Función asincrónica para realizar la solicitud a la API
    const fetchData = async () => {
      try {
        // Realizar la solicitud a la URL especificada
        const response = await axios.get(URL);

        // Verificar si la respuesta es exitosa (código de estado 200-299)
        if (response.status < 200 || response.status >= 300) {
          throw new Error('Error en la red: ' + response.statusText);
        }

        // Actualizar el estado con los datos obtenidos de la API
        setData(response.data);

        // Indicar que la solicitud ha finalizado
        setLoading(false);
      } catch (error) {
        // Capturar cualquier error que ocurra durante la solicitud y actualizar el estado de error
        setError(error);

        // Indicar que la solicitud ha finalizado (incluso si hubo un error)
        setLoading(false);
      }
    };

    // Llamar a la función fetchData para realizar la solicitud a la API
    fetchData();

  }, []);

  const FiltersObject = [
    { Brand: ["Apple", "Dell", "HP", "Lenovo", "Acer", "Asus", "Microsoft", "MSI", "Samsung", "Sony", "Toshiba", "Huawei"] },
    { colors: ["rojo", "azul", "verde", "amarillo", "naranja", "morado", "rosa", "blanco", "negro", "gris", "marrón", "turquesa"] }
  ];



  return (
    <div className='bg-[#333]'>

      <div className='flex justify-center'>
        {Loading ? <Spinner animation="grow" variant="light" /> : <ProductPage product={Data[0]} Data={Data}/>}

      </div>

    </div>
  )

}

export default App
