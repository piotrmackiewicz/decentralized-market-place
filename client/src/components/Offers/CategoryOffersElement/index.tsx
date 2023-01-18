import { Typography } from 'antd';
import { ethers } from 'ethers';
import { Offer } from '../../../types';
import {
  Avatar,
  LeftSideWrapper,
  RightSideWrapper,
  Wrapper,
} from './CategoryOffersElement.styled';

interface Props {
  offer: Offer;
}

export const CategoryOffersElement = ({ offer }: Props) => {
  return (
    <Wrapper to={`/offer/${offer.shop_id}/${offer.id}`} state={{ offer }}>
      <LeftSideWrapper>
        <Avatar shape='square' src={offer.images[0]} size={80} />
        <Typography.Title level={2}>{offer.title}</Typography.Title>
      </LeftSideWrapper>
      <RightSideWrapper>
        <Typography.Title level={2}>
          {ethers.utils.formatEther(offer.price)} ETH
        </Typography.Title>
      </RightSideWrapper>
    </Wrapper>
  );
};
