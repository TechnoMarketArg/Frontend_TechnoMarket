import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';


const useGET = ( url ) => {

    // Estado para almacenar los datos obtenidos de la API
    const [Data, setData] = useState([]);

    // Estado para indicar si la solicitud está en curso
    const [Loading, setLoading] = useState(true);

    // Estado para almacenar cualquier error que ocurra durante la solicitud
    const [Error, setError] = useState(null);

    // useEffect se utiliza para realizar la solicitud a la API cuando el componente se monta
    useEffect(() => {

        // Verificar si la URL es válida
        if (!url) return;

        // Función asincrónica para realizar la solicitud a la API
        const fetchData = async () => {

            setLoading(true)
            try {
                // Realizar la solicitud a la url especificada
                const response = await axios.get(url);

                // Verificar si la respuesta es exitosa (código de estado 200-299)
                if (response.status < 200 || response.status >= 300) {
                    throw new Error('Error en la red: ' + response.statusText);
                }

                // Actualizar el estado con los datos obtenidos de la API
                setData(response.data);
                setError(null);
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

    }, [url]);

    return  [Data, Loading, Error ];
};


useGET.propTypes = {
    url: PropTypes.string
};

const usePOST = () => {

    return {}
};


usePOST.propTypes = {

};


const usePUT = () => {

    return {}
};


usePUT.propTypes = {

};


const useDELETE = () => {

    return {}
};


useDELETE.propTypes = {

};




export { useGET, usePOST, usePUT, useDELETE };
