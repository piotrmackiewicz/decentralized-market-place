import { Layout } from 'components/Layout';
import { Routes } from 'components/Router/routes';
import { ShopOffers } from 'components/Shop/ShopOffers';
import { Navigate, useParams } from 'react-router-dom';
import web3Store from 'store/Web3Store';

export const MyShopOffers = () => {
  const { shopId } = useParams<{ shopId: string }>();
  const { account } = web3Store;

  if (!account.isSeller) {
    return <Navigate to={Routes.Home} replace />;
  }

  return (
    <Layout>
      <p>shop {shopId} offers</p>
      {shopId && <ShopOffers shopId={shopId} />}
    </Layout>
  );
};
