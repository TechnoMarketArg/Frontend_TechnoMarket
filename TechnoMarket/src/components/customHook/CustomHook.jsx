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

const usePOST = (url) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const PostData = async (DATA) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(url, DATA, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      toast.success("Action completed successfully");
      return response.data;
    } catch (error) {
      setError(error);
      toast.error("The action failed");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return [PostData, loading, error];
};


usePOST.propTypes = {
  url: PropTypes.string
};

const useUpdateUser = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const updateUser = async (userId, updatedData) => {
    setLoading(true);
    try {
      
      const response = await axios.put(`https://cvrdqj9p-3000.brs.devtunnels.ms/users/${userId}`, updatedData);
      setUser(response.data);
      setLoading(false);
      setError(null);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  return { loading, user, error, updateUser };
};


useUpdateUser.propTypes = {

};


const usePUT = (url) => {
  const [loading, setLoading] = useState(false);
  const [UpdatedData, setUpdatedData] = useState(null);
  const [error, setError] = useState(null);

  const PutData = async (ID, DATA) => {
    setLoading(true);
    try {
      const response = await axios.put(`${url}/${ID}`, DATA);
      setUpdatedData(response.data);
      setLoading(false);
      setError(null);
      return response.data; // Retorna los datos de la respuesta
    } catch (error) {
      setError(error);
      setLoading(false);
      throw error; // Lanza el error para que pueda ser capturado en la llamada
    }
  };

  return [UpdatedData, PutData, loading, error];
};


usePUT.propTypes = {
  url: PropTypes.string
};


const useDELETE = () => {

    return {}
};


useDELETE.propTypes = {

};




export { useGET, usePOST, usePUT, useDELETE };
