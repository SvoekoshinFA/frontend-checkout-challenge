import API from '../helpers/API';
import type { CartItem } from '../types/Cart';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';

export default function ControlCart({id} : {id: string}) {  
  const queryClient = useQueryClient();
  const { data, isPending, error } = useQuery<CartItem, Error>({
    queryKey: ['cartItem', id],
    queryFn: () => API.getCartItem(id),
  });

  const mutation = useMutation({
    mutationFn: (quantity: number) => API.putCartItem(id, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cartItem', id] });
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  const increment = () => mutation.mutate((data?.quantity ?? 0) + 1);
  const decrement = () => mutation.mutate(Math.max((data?.quantity ?? 0) - 1, 0));
  const remove = () => mutation.mutate(0);

  if (isPending) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (data?.quantity > 0) {
    return (
      <div>
        <button onClick={() => decrement()}>-</button>
        <span>{data?.quantity}</span>
        <button onClick={() => increment()}>+</button>
        <button onClick={() => remove()}>Удалить</button>
      </div>
    );
  }
  return (
    <button onClick={() => increment()}>Добавить в корзину</button>
  )
}