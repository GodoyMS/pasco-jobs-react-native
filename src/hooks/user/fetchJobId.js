import { useState, useEffect } from "react";
import axios from "axios";

import { backendURL } from "../config/config";

const useFetchJobById = (idJob) => {
  
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData =  () => {
    setIsLoading(true);
    axios.get(`${backendURL}api/jobs/${idJob}`)
    .then(({data})=>setData(data))
    .then(()=>setIsLoading(false))
    .catch((error)=>setError(error))
    .finally(()=>setIsLoading(false))
  };

  useEffect(() => {
   fetchData();  
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };

  return {isLoading,refetch, data,error};
};
export default useFetchJobById;
