import { useEffect } from 'react';
import { observer } from 'mobx-react';
import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import web3Store from 'store/Web3Store';
import { Router } from 'components/Router';

const queryClient = new QueryClient();

function App() {
  useEffect(() => {
    if (!web3Store.provider) {
      web3Store.loadProvider();
    }
    if (!web3Store.network) {
      web3Store.loadNetwork();
    }
    if (!web3Store.account.address) {
      web3Store.loadAccount();
    }
    if (!web3Store.signer) {
      web3Store.loadSigner();
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  );
}

export default observer(App);
