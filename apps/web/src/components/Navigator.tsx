import { useContext } from 'react';
import '../assets/css/navigator.css'
import { Global } from '../App';
import GetSession from './GetSession'

export default function Navigator({
  navigate,
}: {
  navigate: (url: string) => void;
}) {
  const { Session } = useContext(Global)
  return (
    <nav>
      <ul>
        <li><button onClick={() => navigate('/')}>Каталог</button></li>
        <li><button onClick={() => navigate('/cart')}>Корзина</button></li>
        <li>{Session ? <h2 data-id={Session.id}>Гость</h2> : <GetSession />}</li>
      </ul>
    </nav>
  );
}
