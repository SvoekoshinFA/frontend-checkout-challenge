import { Suspense, useState, useTransition, useEffect  } from 'react'
import API from './helpers/API.ts'
import CatalogPage from './pages/CatalogPage.tsx'
import CartPage from './pages/CartPage.tsx'
import FormPage from './pages/FormPage.tsx'
import PaymentPage from './pages/PaymentPage.tsx'
import Layout from './components/Layout.tsx'
import BigSpinner from './components/BigSpinner.tsx'
import { useSelector, useDispatch } from 'react-redux'
import { setSession } from './store.ts'
import type { RootState, AppDispatch } from './store.ts'
import { useMutation } from '@tanstack/react-query'
import type { Session } from './types/Session.ts'

function App() {
  const session = useSelector((state: RootState) => state.session);
  const dispatch = useDispatch<AppDispatch>();
  const createSessionMutation = useMutation<Session, Error>({
    mutationFn: API.postSessions,
    onSuccess: (session) => {
      dispatch(setSession(session));
    },
  });

  useEffect(() => {
    if (session || createSessionMutation.isPending) {
      return;
    }

    createSessionMutation.mutate();
  }, [session, createSessionMutation]);

  if (!session) {
    return <BigSpinner />;
  }

  return (
    <Suspense fallback={<BigSpinner />}>
      <Router />
    </Suspense>
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
