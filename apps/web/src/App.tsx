import { Suspense, useState, useTransition, createContext } from 'react'
import CatalogPage from './pages/CatalogPage.tsx'
import CartPage from './pages/CartPage.tsx'
import FormPage from './pages/FormPage.tsx'
import PaymentPage from './pages/PaymentPage.tsx'
import Layout from './components/Layout.tsx'
import BigSpinner from './components/BigSpinner.tsx'
import type { Session } from './types/Session.ts'

type GlobalContext = {
  Session: Session | null;
  setSession: (session: Session | null) => void;
};

export const Global = createContext<GlobalContext>({
  Session: null,
  setSession: () => {},
});

function App() {
  const [session, setSession] = useState<Session | null>(null);

  return (
    <Global.Provider value={{ Session: session, setSession }}>
      <Suspense fallback={<BigSpinner />}>
        <Router />
      </Suspense>
    </Global.Provider>
  );

}

function Router() {
  const [page, setPage] = useState('/');
  const [isPending, startTransition] = useTransition();

  function navigate(url: string) {
    startTransition(() => {
      setPage(url);
    });
  }

  let content;
  if (page === '/') {
    content = (
      <CatalogPage />
    );
  } else if (page === '/cart') {
    content = (
      <CartPage />
    );
  } else if (page === '/form') {
    content = (
      <FormPage />
    );
  } else if (page === '/payment') {
    content = (
      <PaymentPage />
    );
  }
  return (
    <Layout isPending={isPending} navigate={navigate}>
      {content}
    </Layout>
  );
}


export default App
