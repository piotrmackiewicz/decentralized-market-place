import { Layout } from 'components/Layout';
import { Routes } from 'components/Router/routes';
import { observer } from 'mobx-react';
import { Navigate } from 'react-router-dom';
import web3Store from 'store/Web3Store';

export const MyShopsPage = observer(() => {
  const { account } = web3Store;

  if (!account.isSeller) {
    return <Navigate to={Routes.Home} replace />;
  }

  return (
    <Layout>
      <p>my shops</p>
    </Layout>
  );
});
