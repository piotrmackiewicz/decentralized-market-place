import { Button, Col, InputNumber, Row, Typography } from 'antd';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { Offer } from '../../../types';
import { OfferGallery } from '../../OfferGallery';
import {
  OfferInfo,
  OfferTopInfo,
  OfferTopInfoLeftSide,
  OfferTopInfoRightSide,
  BuyWrapper,
} from './OfferDetails.styled';

interface Props {
  offer: Offer;
}
export const OfferDetails = ({ offer }: Props) => {
  const [selectedQuantity, setSelectedQuantity] = useState<
    string | number | null
  >(1);
  const [buyPrice, setBuyPrice] = useState<string>('0');

  const handleBuy = () => {
    console.log(`Buy ${selectedQuantity} pieces for ~${buyPrice}`);
    // TODO: call Shop contract method buyProduct
  };

  useEffect(() => {
    setBuyPrice(
      (
        Number(selectedQuantity) * Number(ethers.utils.formatEther(offer.price))
      ).toFixed(5)
    );
  }, [offer.price, selectedQuantity]);

  return (
    <Row gutter={48}>
      <Col span={16}>
        <OfferInfo>
          <OfferTopInfo>
            <OfferTopInfoLeftSide>
              <Typography.Title level={2}>{offer.title}</Typography.Title>
              {/* TODO: here should be link to all offers from this shop */}
              <Typography>Shop: {offer.shop_id}</Typography>
            </OfferTopInfoLeftSide>
            <OfferTopInfoRightSide>
              <Typography.Title level={2}>
                {ethers.utils.formatEther(offer.price)} ETH
              </Typography.Title>
              <Typography>Pieces left: {offer.quantity}</Typography>
            </OfferTopInfoRightSide>
          </OfferTopInfo>
          <div>{offer.description}</div>
        </OfferInfo>
      </Col>
      <Col span={8}>
        <BuyWrapper>
          <InputNumber
            min={1}
            max={offer.quantity}
            value={selectedQuantity}
            onChange={setSelectedQuantity}
          />
          <Button type='primary' onClick={handleBuy}>
            Buy {selectedQuantity} pieces for ~{buyPrice} ETH
          </Button>
        </BuyWrapper>
        {offer.images ? (
          <OfferGallery images={offer.images} />
        ) : (
          // TODO: make this placeholder pretty
          <Typography>No images</Typography>
        )}
      </Col>
    </Row>
  );
};
