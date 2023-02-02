import { Layout } from 'components/Layout';
import { useParams } from 'react-router-dom';

export const EditOfferPage = () => {
  const { shopId, offerId } = useParams<{ shopId: string; offerId: string }>();

  return (
    <Layout>
      <p>
        Edit offer {shopId}/{offerId}
      </p>
    </Layout>
  );
};
