import { Button, Typography } from 'antd';
import { ethers } from 'ethers';
import { Link } from 'react-router-dom';
import { Sale } from '../../../types';
import {
  Avatar,
  LeftSideWrapper,
  RightSideWrapper,
  SalesInfoWrapper,
  Wrapper,
} from './SalesListElement.styled';

interface Props {
  sale: Sale;
}

export const SalesListElement = ({ sale }: Props) => {
  return (
    <Wrapper>
      <LeftSideWrapper>
        <Avatar shape='square' src={sale.offer.images[0]} size={80} />
        <Typography.Title level={2}>{sale.offer.title}</Typography.Title>
      </LeftSideWrapper>
      <RightSideWrapper>
        <SalesInfoWrapper>
          <Typography>
            Buy price: {ethers.utils.formatEther(sale.price)} ETH
          </Typography>
          <Typography>Pieces: {sale.quantity}</Typography>
        </SalesInfoWrapper>
        <Link
          to={`/offer/${sale.offer.shop_id}/${sale.offer.id}`}
          state={{ offer: sale.offer }}
        >
          <Button>View offer</Button>
        </Link>
      </RightSideWrapper>
    </Wrapper>
  );
};
