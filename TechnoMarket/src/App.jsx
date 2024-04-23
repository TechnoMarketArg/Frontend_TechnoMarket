import { useState, useEffect } from 'react'
import axios from 'axios';
import './App.css'


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

  return (
    <>
      
    </>
  )
}

export default App
