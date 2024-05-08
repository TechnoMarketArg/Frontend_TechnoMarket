import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Homepage from './components/homepage/Homepage';
import Spinner from 'react-bootstrap/Spinner';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';import { Toaster, toast } from 'sonner'
import Cart from './components/cart/Cart';

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

  const [modalShow, setModalShow] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [optSmModal, setOptSmModal] = useState(false);

  const toggleOpen = () => setOptSmModal(!optSmModal);

  const openModal = (product) => {
   

    setSelectedProduct(product); // Establece el juego seleccionado
    setModalShow(true);
  };

  //cerrar el modal de mas informacion
  const hideModal = () => {
    setSelectedProduct(null); // Resetea el juego seleccionado al cerrar
    setModalShow(false);
  };

  const [ShoppingCart, setShoppingCart] = useState([]);

  //agregar productos al carrito
  const addCart = (product) => {
    toast.success(`${product.title} added to shopping cart successfully`)
    setShoppingCart([...ShoppingCart, product])
  }

  //FALTA LOGICA
  //eliminar priductos del carrito
  const removeCart = (gameTitle) => {
    setShoppingCart(ShoppingCart.filter(game => game.title !== gameTitle))
  }



  return (
    <>
      <div className='bg-[rgb(234,247,253)]'>
        {Loading ? <Spinner animation="grow" variant="dark" />   : <Homepage Data={Data}/>}
      </div>
    </>
  )
}

export default App
