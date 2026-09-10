import { useState, useEffect } from 'react';
import type { Product } from '../types/Product.ts';
import type { Response, Error } from '../types/Response.ts';
import BigSpinner from '../components/BigSpinner.tsx';
import ProductCard from '../components/ProductCard.tsx';

export default function CatalogPage() {
  const [data, setData] = useState(null as Product[] | null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null as Error | null);

  useEffect(() => {
    fetch('http://localhost:4000/api/products')
      .then(async (response) => {
        const json = await response.json() as Response<Product[]>;
        if (json.error) {
          setError(json.error);
        } 
        if (json.data) {
          setData(json.data);
        }
      }).finally(() => {
        setLoading(false);
      }) 
  }, []);

  return (
    <div>
      <h1>Каталог</h1>
      {loading && <BigSpinner />}
      {error && <p>{error.message}</p>}
      {data && data.map((product: Product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}