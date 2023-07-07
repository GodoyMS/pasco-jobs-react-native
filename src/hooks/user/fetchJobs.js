import { useState, useEffect } from "react";
import axios from "axios";
import { backendURL } from "@config/config";
import { useSelector } from "react-redux";

const useFetchJobs = ({searchWord,query,category,page}) => {
  const userLocation=useSelector((state)=>state.user.userLocation);
  const userFavCategory=useSelector((state)=>state.user.userFavCategory);
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dataApi, setDataApi] = useState({docs:[],totalDocs:0,limit:0,totalPages:0,page:0,pagingCounter:0,hasPrevPage:false,hasNextPage:false,prevPage:null,nextPage:null});


  const fetchData =  () => {
    setIsLoading(true);
    axios.get(`${backendURL}api/jobs?${userLocation? `where[provincia][equals]=${userLocation}&`:"&"}${userFavCategory? `where[category.name][equals]=${userFavCategory}&`:"&"}limit=5&page=${page}&${query}`)
    .then(({data})=>{setDataApi(data)})
    .then(()=>setIsLoading(false))
    .catch((error)=>{setError(error);console.log(error)})
    .finally(()=>setIsLoading(false))

   
      
  };

  useEffect(() => {
    const delayDebouncedFn=setTimeout(()=>{
      fetchData();  

    },500)
    return () => clearTimeout(delayDebouncedFn);

  }, [category,query,page,userLocation,userFavCategory]);


  return {isLoading,error,dataApi};

 
};

export default useFetchJobs;

