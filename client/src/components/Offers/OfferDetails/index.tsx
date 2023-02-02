import { Button, Col, InputNumber, Row, Typography } from 'antd';
import { Routes } from 'components/Router/routes';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import web3Store from 'store/Web3Store';
import { useMarketContract } from '../../../hooks/useMarketContract';
import { useOfferUpdate } from '../../../hooks/useOfferUpdate';
import { useShopContract } from '../../../hooks/useShopContract';
import { Offer } from '../../../types';
import { OfferGallery } from '../../OfferGallery';
import {
  OfferInfo,
  OfferTopInfo,
  OfferTopInfoLeftSide,
  OfferTopInfoRightSide,
  BuyWrapper,
  ShopLinkWrapper,
} from './OfferDetails.styled';

interface Props {
  offer: Offer;
}
export const OfferDetails = ({ offer }: Props) => {
  const { account } = web3Store;
  const [selectedQuantity, setSelectedQuantity] = useState<
    string | number | null
  >(1);
  const [buyPrice, setBuyPrice] = useState<string>('0');
  const [shopAddress, setShopAddress] = useState('');
  const { getShopAddress } = useMarketContract();
  const { loading, shopInfo, buyProduct } = useShopContract({
    shopContractAddress: shopAddress,
  });
  const { updatedOffer } = useOfferUpdate({
    shopContractAddress: shopAddress,
    offer,
  });
  const isUserShopOwner = account.address === shopInfo.owner.toLowerCase();

  const handleBuy = () => {
    buyProduct(updatedOffer.id, Number(selectedQuantity), buyPrice);
  };

  useEffect(() => {
    const loadShopAddress = async () => {
      const address = await getShopAddress(updatedOffer.shop_id);
      if (address) {
        setShopAddress(address);
      }
    };

    loadShopAddress();
  }, [getShopAddress, updatedOffer.shop_id]);

  useEffect(() => {
    setBuyPrice(
      (
        Number(selectedQuantity) *
        Number(ethers.utils.formatEther(updatedOffer.price))
      ).toFixed(5)
    );
  }, [updatedOffer.price, selectedQuantity]);

  return (
    <Row gutter={48}>
      <Col span={16}>
        <OfferInfo>
          <OfferTopInfo>
            <OfferTopInfoLeftSide>
              <Typography.Title level={2}>
                {updatedOffer.title}
              </Typography.Title>
              {/* TODO: here should be link to all offers from this shop */}
              {shopInfo.id && shopInfo.name && (
                <ShopLinkWrapper>
                  <span>Shop: </span>
                  <Link to={Routes.Shop.replace(':shopId', shopInfo.id)}>
                    {shopInfo.name}
                  </Link>
                </ShopLinkWrapper>
              )}
            </OfferTopInfoLeftSide>
            <OfferTopInfoRightSide>
              <Typography.Title level={2}>
                {ethers.utils.formatEther(updatedOffer.price)} ETH
              </Typography.Title>
              <Typography>Pieces left: {updatedOffer.quantity}</Typography>
            </OfferTopInfoRightSide>
          </OfferTopInfo>
          <div>{updatedOffer.description}</div>
        </OfferInfo>
      </Col>
      <Col span={8}>
        {isUserShopOwner ? (
          <Link
            to={Routes.EditOffer.replace(':shopId', shopInfo.id).replace(
              ':offerId',
              offer.id.toString()
            )}
          >
            <Button type='primary'>Edit Offer</Button>
          </Link>
        ) : (
          <BuyWrapper>
            <InputNumber
              min={1}
              max={updatedOffer.quantity}
              value={selectedQuantity}
              onChange={setSelectedQuantity}
            />
            <Button
              type='primary'
              onClick={handleBuy}
              loading={loading}
              disabled={!selectedQuantity}
            >
              Buy {selectedQuantity}{' '}
              {selectedQuantity === 1 ? 'piece' : 'pieces'} for ~{buyPrice} ETH
            </Button>
          </BuyWrapper>
        )}

        {updatedOffer.images ? (
          <OfferGallery images={updatedOffer.images} />
        ) : (
          // TODO: make this placeholder pretty
          <Typography>No images</Typography>
        )}
      </Col>
    </Row>
  );
};
