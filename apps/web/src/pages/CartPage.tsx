import type { Cart, CartItem } from "../types/Cart";
import { useQuery } from "@tanstack/react-query";
import Formatter from '../helpers/formatter';
import API from "../helpers/API";
import BigSpinner from '../components/BigSpinner.tsx';
import CartItemCard from '../components/CartItemCard.tsx';

export default function CartPage() {
  const { data, isPending, error } = useQuery<Cart, Error>({
    queryKey: ['cart'],
    queryFn: API.getCart,
  });

  return (
    <div>
      <h1>Корзина</h1>
      {isPending && <BigSpinner />}
      {error && <p>{error.message}</p>}
      {data && (data.items.length > 0 ? data.items.map((item: CartItem) => (
        <CartItemCard key={item.productId} item={item} currency={data.currency} />
      )) : <p>Корзина пуста</p>)}
      {data && data.items.length > 0 && (
        <div>
          <p>Итого: {Formatter.currency(data.subtotal, data.currency)}</p>
          <button>Оформить заказ</button>
        </div>
      )}
    </div>
  );
}