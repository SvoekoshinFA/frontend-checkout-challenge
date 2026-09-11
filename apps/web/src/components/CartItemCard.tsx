import type { CartItem } from '../types/Cart';
import Formatter from '../helpers/formatter.ts';
import ControlCart from './ControlCart.tsx';

export default function CartItemCard({ item, currency }: { item: CartItem, currency: string }) {
  return (
    <div className="CartItemCard">
      <h2>{item.title}</h2>
      <p>{Formatter.piece(item.quantity, "шт.")}</p>
      <p className="price">{Formatter.currency(item.quantity * item.unitPrice, currency)}</p>
      <ControlCart id={item.productId} />
    </div>
  )
}