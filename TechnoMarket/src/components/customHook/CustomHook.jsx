import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';


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
  
    return {}
};


usePOST.propTypes = {

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


const useDELETE = () => {

    return {}
};


useDELETE.propTypes = {

};




export { useGET, usePOST, useUpdateUser, useDELETE };
