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

  const cards = [
    // Aquí puedes pasar tus componentes de tarjeta (card)
    <div className="bg-gray-200 p-4">Card 1</div>,
    <div className="bg-gray-300 p-4">Card 2</div>,
    <div className="bg-gray-400 p-4">Card 3</div>,
    <div className="bg-gray-200 p-4">Card 4</div>,
    <div className="bg-gray-300 p-4">Card 5</div>,
    <div className="bg-gray-400 p-4">Card 6</div>,
    <div className="bg-gray-200 p-4">Card 7</div>,
    <div className="bg-gray-300 p-4">Card 8</div>,
    <div className="bg-gray-400 p-4">Card 9</div>,
    <div className="bg-gray-400 p-4">Card 10</div>,
    <div className="bg-gray-400 p-4">Card 11</div>,
    <div className="bg-gray-400 p-4">Card 12</div>,
    <button className="bg-gray-400">ver mas</button>,
    // Agrega más tarjetas si es necesario
  ];

  return (
    <div className='bg-[#333]'>

     <FilterSearch FiltersObject={FiltersObject}/>
     <div className='flex justify-center'>
        {Loading ? <Spinner animation="grow" variant="light" /> : <ProductDetails product={Data[8]} />}

  </div>

      <div className='w-full flex justify-center'>
        {Loading ? <Spinner animation="grow" variant="light" /> : <ProductCardSlider Title={'Offers'} Data={Data}/>}
      </div>
      <div className='flex flex-wrap gap-2 justify-center p-4'>
        {Data.filter(product => product.title.length > 10).map(product => (
            
          <ProductCard
            key={product.id}
            title={product.title}
            price={product.price}
            description={product.description}
            images={product.images}
            />
        ))}
      </div>
    </div>
  )

}

export default App
