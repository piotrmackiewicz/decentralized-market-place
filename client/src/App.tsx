import { useEffect } from 'react';
import { observer } from 'mobx-react';
import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import web3Store from './store/Web3Store';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { CategoryPage } from './pages/CategoryPage';
import { OfferPage } from './pages/OfferPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/category/:categoryId',
    element: <CategoryPage />,
  },
  {
    path: '/offer/:shopId/:offerId',
    element: <OfferPage />,
  },
]);

const queryClient = new QueryClient();

function App() {
  useEffect(() => {
    if (!web3Store.provider) {
      web3Store.loadProvider();
    }
    if (!web3Store.network) {
      web3Store.loadNetwork();
    }
    if (!web3Store.account) {
      web3Store.loadAccount();
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default observer(App);
