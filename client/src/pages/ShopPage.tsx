import { Alert, Card, Divider, Grid, Row, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { ShopDetails } from '../components/Shop/ShopDetails';
import { ShopOffers } from '../components/Shop/ShopOffers';
import { useMarketContract } from '../hooks/useMarketContract';
import { useShopContract } from '../hooks/useShopContract';

export const ShopPage = () => {
  const { shopId } = useParams<{ shopId: string }>();
  const [shopAddress, setShopAddress] = useState('');
  const { getShopAddress } = useMarketContract();
  const { shopInfo, loading, success } = useShopContract({
    shopContractAddress: shopAddress,
  });

  useEffect(() => {
    const loadShopAddress = async () => {
      if (!shopId) return;
      const address = await getShopAddress(Number(shopId));
      if (address) {
        setShopAddress(address);
      }
    };

    loadShopAddress();
  }, [getShopAddress, shopId]);

  return (
    <Layout>
      {loading ? (
        <Spin />
      ) : (
        <Card>
          <Row>{success && <ShopDetails shop={shopInfo} />}</Row>
          <Divider orientation='left'>Shop Offers</Divider>
          <Row>
            <ShopOffers />
          </Row>
        </Card>
      )}
    </Layout>
  );
};
