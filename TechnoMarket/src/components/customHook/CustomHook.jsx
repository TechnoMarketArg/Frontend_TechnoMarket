import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { toast } from 'sonner';


const useGET = (url, updateData) => {
    const [Data, setData] = useState([]);
    const [Loading, setLoading] = useState(true);
    const [Error, setError] = useState(null);
  
    useEffect(() => {
      if (!url) return;
  
      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await axios.get(url);
  
          if (response.status < 200 || response.status >= 300) {
            throw new Error('Error en la red: ' + response.statusText);
          }
  
          setData(response.data);
          if (updateData) {
            updateData(response.data);
          }
          setError(null);
          setLoading(false);
        } catch (error) {
          setError(error);
          setLoading(false);
        }
      };
  
      fetchData();
    }, [url, updateData]);
  
    return [Data, Loading, Error];
  };


useGET.propTypes = {
    url: PropTypes.string
};



const usePOST = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const publishProduct = async (productData) => {
      setLoading(true);
      setError(null);

    try{
        const response = await axios.post('https://cvrdqj9p-3000.brs.devtunnels.ms/products', productData);
        toast.success("Producto publicado con exito");
        return response.data
    }catch (error){
      setError(error);
      toast.error("Error al publicar el producto");
      throw error;
    }finally{
      setLoading(false);
    }
    
  };

  return {publishProduct, loading, error}

}




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
