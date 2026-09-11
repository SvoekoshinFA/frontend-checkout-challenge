import '../assets/css/navigator.css'
import UserPanel from './UserPanel';

export default function Navigator({
  navigate,
}: {
  navigate: (url: string) => void;
}) {
  return (
    <nav>
      <ul>
        <li><button onClick={() => navigate('/')}>Каталог</button></li>
        <li><button onClick={() => navigate('/cart')}>Корзина</button></li>
        <li><UserPanel /></li>
      </ul>
    </nav>
  );
}