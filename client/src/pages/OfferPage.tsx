import { Alert, Card, Spin } from 'antd';
import { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { fetchOfferByShopIdAndOfferId } from '../api/offers';
import { Layout } from '../components/Layout';
import { OfferDetails } from '../components/Offers/OfferDetails';
import { Offer } from '../types';

export const OfferPage = () => {
  const { shopId, offerId } = useParams<{ shopId: string; offerId: string }>();
  const navigate = useNavigate();
  const location = useLocation() as { state?: { offer?: Offer } };
  const locationStateOffer = location?.state?.offer;

  const { isLoading, error, data } = useQuery<Offer, AxiosError>(
    ['offer', shopId, offerId],
    // TODO: passing empty string if offerId is undefined is hacky
    () => fetchOfferByShopIdAndOfferId(Number(shopId), offerId || ''),
    {
      enabled: !locationStateOffer,
    }
  );

  if (!shopId || !offerId) {
    navigate('/');
  }

  if (isLoading) {
    return <Spin />;
  }

  if (error) {
    return <Alert type='error' message={error.message} />;
  }

  const offer = locationStateOffer || data;

  if (!offer) {
    return null;
  }

  return (
    <Layout>
      {offer ? (
        <Card>
          <OfferDetails offer={offer} />
        </Card>
      ) : (
        <Alert type='warning' message="We couldn't find the offer" />
      )}
    </Layout>
  );
};
