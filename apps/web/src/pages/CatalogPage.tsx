import type { Product } from '../types/Product.ts';
import BigSpinner from '../components/BigSpinner.tsx';
import ProductCard from '../components/ProductCard.tsx';
import API from '../helpers/API.ts';
import { useQuery } from '@tanstack/react-query';

export default function CatalogPage() {
  const { data, isPending, error } = useQuery<Product[], Error>({
    queryKey: ['products'],
    queryFn: API.getProducts,
  });

  return (
    <div>
      <h1>Каталог</h1>
      {isPending && <BigSpinner />}
      {error && <p>{error.message} {JSON.stringify(error.stack)}</p>}
      {data && data.map((product: Product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}