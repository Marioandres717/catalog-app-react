import { useState, useEffect } from 'react';
import { home } from '../components/utils/urlBuilder';

function useProduct() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchAllContent().then(data => setData(data));
  }, []);

  async function fetchAllContent() {
    try {
      const response = await fetch(home());
      const { categories } = await response.json();
      return categories;
    } catch (err) {
      console.error(err);
    }
  }
  return { data, setData, fetchAllContent };
}

export default useProduct;
