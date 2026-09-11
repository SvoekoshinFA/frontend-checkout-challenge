import { useDispatch, useSelector } from 'react-redux';
import { setSession, type RootState } from '../store.ts';

export default function UserPanel() {
  const dispatch = useDispatch();
  const session = useSelector((state: RootState) => state.session);
  const userName = null;
  const leave = () => {
    dispatch(setSession(null));
  }

  if (!session) {
    return null;
  }

  return (
      <p data-id={session.id}>
        { userName ? ( <> {userName} | <button onClick={leave}>Выйти</button></> ) : ( 'Гость' )}
      </p>
  );
}
