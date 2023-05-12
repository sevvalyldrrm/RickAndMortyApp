import { useEffect, useState } from "react";
import axios from 'axios';

function useFetch(url){
    const [loading, setLoading] = useState(true);
    const [characters, setCharacters] = useState([]);
  
    async function fetchData() {
      try {
        const result = await axios.get(url);
        const {info, results} = result.data;
        let pages = [results];
        
        setLoading(false);
  
        for (let i=2; i<=info.pages; i++){
          const res = await axios.get(`${url}?page=${i}`);
          pages.push(res.data.results);
        }
  
        const flattenedPages = pages.flat();
        const filteredCharacters = flattenedPages.filter((char => char.id >= 0 && char.id <= 100));
  
        setCharacters(filteredCharacters)
      } catch (error) {
        console.error(error);
      }
    }
  
    useEffect(() => {
      fetchData();
    } , [])
  return {loading , characters}
}

export default useFetch;