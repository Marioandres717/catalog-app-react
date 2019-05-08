import { useState, useEffect } from 'react';
import { home } from '../components/utils/urlBuilder';

function useProduct() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchHomeContent().then(data => setData(data));
  }, []);

  async function fetchHomeContent() {
    try {
      const response = await fetch(home());
      const { categories } = await response.json();
      return categories;
    } catch (err) {
      console.error(err);
    }
  }
  return { data, setData, fetchHomeContent };
}

export default useProduct;
