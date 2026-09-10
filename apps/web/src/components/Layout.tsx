import BigSpinner from './BigSpinner.tsx';
import Navigator from './Navigator.tsx';
import type { ReactNode } from 'react';

export default function Layout({
  isPending,
  children,
  navigate,
}: {
  isPending: boolean;
  children: ReactNode;
  navigate: (url: string) => void;
}) {
  return (
    <div>
        <Navigator navigate={navigate} />
        {isPending && <BigSpinner />}
        {children}
    </div>
  );
}
