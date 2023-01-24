import { Descriptions, Tag } from 'antd';
import { Shop } from '../../../types';
import { EtherscanLink } from '../../EtherscanLink';

interface Props {
  shop: Shop;
}

export const ShopDetails = ({ shop }: Props) => (
  <Descriptions title={shop.name} bordered>
    <Descriptions.Item label='Owner'>
      <EtherscanLink type='address' value={shop.owner} />
    </Descriptions.Item>
    <Descriptions.Item label='Payment Address'>
      <EtherscanLink type='address' value={shop.paymentAddress} />
    </Descriptions.Item>
    <Descriptions.Item label='Offers count'>
      {shop.offersCount}
    </Descriptions.Item>
    <Descriptions.Item label='Sales count'>{shop.salesCount}</Descriptions.Item>
    <Descriptions.Item label='Suspended'>
      <Tag color={shop.offersSuspended ? 'red' : 'green'}>
        {shop.offersSuspended ? 'Yes' : 'No'}
      </Tag>
    </Descriptions.Item>
  </Descriptions>
);
