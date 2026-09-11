import type { Product } from "../types/Product";
import '../assets/css/productCard.css'
import ControlCart from './ControlCart.tsx';

export default function ProductCard({product} : {product: Product}) {
  const formatter = new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: product.currency,
  });
  return (
    <div className="productCard">
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <p className="price">{formatter.format(product.price)}</p>
      <ControlCart id={product.id} />
    </div>
  )
}